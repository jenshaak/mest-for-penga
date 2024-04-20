"use server"

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import * as cheerio from 'cheerio';
import { NextResponse } from "next/server";
import { createDagligvare } from "@/lib/actions.ts/dagligvareActions";
import { Næringsinnhold, Pris } from "@/typings";
import { addUnderKategori, createKategori } from "@/lib/actions.ts/kategoriActions";

console.log("ROUTE.TS")

const timeout = 15000;

export async function scrapeTights(url: string) {
  console.log("Scrape Tights")
  let browser
  try {
    browser = await puppeteer.launch({
      headless: false,
      args: ['--start-maximized']
    });

    console.log("Try");
    const page = await browser.newPage();

    await page.setViewport({
      width: 1300,
      height: 800,
      deviceScaleFactor: 1,
    });
    
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: timeout,
    });

    console.log("WENT TO URL: ", url)
    const buttonSelector = '[aria-label="Godta alle"]'; // The selector for the consent button
    try {
        // Then, wait for the selector to be available in the DOM
        await page.waitForSelector(buttonSelector, { visible: true, timeout: timeout });

        // Click the consent button
        await page.click(buttonSelector);
        console.log("Clicked consent button");
    } catch (e) {
        // If the selector is not found, log the error
        console.error("The consent button was not found.", e);
    }

    const cat = 'div>ul>li[class^="cat-item cat-item-"]';
    await page.waitForSelector(cat, { visible: true, timeout: timeout });
    const buttonCount = await page.$$eval(cat, items => items.length);
    console.log(buttonCount);
    // LOOPING THROUGH CATEGORIES
    for (let index = 0; index < buttonCount; index++) {
      if(index < 1) continue;
      const buttonList = await page.$$(cat);
      const button = buttonList[index];
      const foundKategori = await page.evaluate(el => el.textContent, button);
      const kategori = foundKategori?.trim();
      kategori && await createKategori(kategori, "tights");
      console.log("OUTER ", index, kategori);
      await Promise.all([
        button?.click(),
        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: timeout }),
      ]);

      const itemSelector = 'div[class="wrap"]>ul>li'
      const itemCount = await page.$$eval(itemSelector, items => items.length);
      let popularitet = 0;
      // Looping through every result
      for (let index = 0; index < itemCount; index++) {
        popularitet += 1;
        const itemList = await page.$$(itemSelector);
        const item = itemList[index];
        await item?.click();
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: timeout });
        const html = await page.content();
        const $ = cheerio.load(html);

        // Title
        const title = $("h1").text().trim();
        const vekt = parseFloat(title.replace(/[^0-9.,]+/g, '').replace(',', '.'));
        console.log("title", title);
        console.log("vekt", vekt);

        // Pris
        const prisTekst = $('ins>span>bdi').text().trim();
        const pris = parseFloat(prisTekst.replace(/[^0-9.,]+/g, '').replace(',', '.'));
        console.log("pris", pris);

        // Næringsinnhold
        let næringsinnhold: Næringsinnhold = {};

        const tableRows = $('tr');
        if(tableRows.length > 0) {
          console.log("IF")
          tableRows.each((i, element) => {
            const el = $(element);
            let first = el.find('td').eq(0).text().replace(/-?hvorav/g, '').split(' ')[0].trim().toLowerCase();
            // first = first.replace(/-?hvorav/g, '').toLowerCase();
            const second = el.find('td').eq(1).text().trim();
            const mengde = parseFloat(second);
            næringsinnhold[first] = mengde;
          });
        } else {
          console.log("ELSE")
          const nutritionDivs = $('.long-description div')
          .filter((_, element) => {
            return $(element).text().toLowerCase().includes('næringsinnhold');
          })
          .nextUntil('div:has(strong)');
          nutritionDivs.each((_, element) => {
            const el = $(element);
            let text = el.text().replace(/\s+/g, ' ').trim();
            text = text.replace(/^-hvorav/, '');
            const parts = text.split(/(\d[\d,]*\.?\d*)/);

            if (parts.length >= 2) {
              // Nøkkelen er det første elementet i arrayen, konverter til små bokstaver
              const key = parts[0].toLowerCase().trim();

              // Hent det første tallverdien (andre elementet i arrayen), erstatte komma med punktum
              const rawValue = parts[1].replace(',', '.');
              const value = parseFloat(rawValue);
              
              // Hvis nøkkelen er gyldig og verdien er et tall, lagre det i objektet
              if (key && !isNaN(value)) {
                const cleanedKey = key.replace(/[^a-zæøå]/gi, ''); // Fjern alt unntatt bokstaver (inkludert norsk æ, ø, å)
                næringsinnhold[cleanedKey] = value;
              }
            }
          });
        }
        console.log("næringsinnhold", næringsinnhold);

        await page.goBack({ waitUntil: 'domcontentloaded' });
      }
    }

    console.log("FINITO")
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      console.log("CATCH", error)
      return NextResponse.json({ error: `Error: ${error.message}` });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' });
    }
  } finally {
    if(browser) {
      await browser.close();
      console.log("BROWSER CLOSED")  
    }
  }
}

