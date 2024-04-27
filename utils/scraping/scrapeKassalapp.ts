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

export async function scrapeData(url: string) {
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
      height: 2000,
      deviceScaleFactor: 1,
    });
    
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: timeout,
    });

    console.log("WENT TO URL: ", url)
    
    const buttonCount = await page.$$eval('fieldset>div>div>div>button', items => items.length);
    
    // LOOPING THROUGH CATEGORIES
    // for (let index = 0; index < buttonCount; index++) {
    //   if((index < 22) || (index > 1 && index < 5) || (index === 8) || (index > 10 && index < 13) || (index === 20)) continue;
    //   const buttonList = await page.$$('fieldset>div>div>div>button');
    //   const button = buttonList[index];
    //   const foundKategori = await page.evaluate(el => el.textContent, button);
    //   const kategori = foundKategori?.trim();
    //   kategori && await createKategori(kategori);
    //   console.log("OUTER ", index, kategori);
    //   await Promise.all([
    //     button?.click(),
    //     page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: timeout }),
    //   ]);

    //   const html = await page.content();
    //   const $ = cheerio.load(html);
      // LOOPING THROUGH SUBCATEGORIES
      // const subCatCount = await page.$$eval('fieldset>div>div>div>div>div>button', items => items.length);
      // for (let index = 0; index < subCatCount; index++) {
      //   let prevButton = await page.$('[dusk="previousPage"]');
      //   while(prevButton){
      //     await Promise.all([
      //       page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      //       prevButton.click(),
      //     ]);
      //     prevButton = await page.$('[dusk="previousPage"]')
      //   };
      //   await page.waitForSelector('fieldset>div>div>div>div>div', { timeout: timeout });
      //   const subCatList = await page.$$('fieldset>div>div>div>div>div');
      //   const subCat = subCatList[index];
      //   const foundUnderKategori = await page.evaluate(el => el.textContent, subCat);
      //   const underKategori = foundUnderKategori?.trim();
      //   kategori && underKategori && await addUnderKategori(kategori, underKategori);
      //   const link = await subCat.$('button');
      //   await Promise.all([
      //     link?.click(),
      //     page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: timeout }),
      //   ]);
      //   console.log(index, underKategori);

      //   // Looping through every page of results
        let hasNextPage = true;
        let pageNum = 0;
        let popularitet = 0;
        while(hasNextPage) {
          const hasP = await page.$("section>ul>li>p") !== null;
          if(hasP) break;
          const itemCount = await page.$$eval('section>ul>li', items => items.length);
          pageNum += 1;
          console.log("page ", pageNum);
          // Looping through every result
          for (let index = 0; index < itemCount; index++) {
            popularitet += 1;
            const itemList = await page.$$('section>ul>li');
            const item = itemList[index];
            await item?.click();
            await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: timeout });
            const html = await page.content();
            const $ = cheerio.load(html);
    
            // Title
            const title = $("h1").text().trim();
            
            // Næringsinnhold
            let næringsinnhold: Næringsinnhold = {};
            $("aside>div>div>dl>div").each((index, element) => {
              const el = $(element);
              const næringsType = el.find('dt').text().replace(/\s+/g, '').trim().toLowerCase();
              const mengde = el.find('span').first().text().replace(/,/g, '').trim();
              const gram = Number(mengde);
              næringsinnhold[næringsType] = gram;
            });
    
            // Priser
            const priser: Pris[] = [];
            $('aside>div>div>div[role="list"]>a').each((index, element) => {
              const el = $(element);
              const imageAlt = el.find('img').attr('alt')?.trim().toLowerCase();
              const mengde = el.find('span').first().text().replace(/[^0-9.]/g, '').trim();
              const pris = Number(mengde);
              let prisPerKg;
              let prisPerStk;
              const prisTekst = el.find('span').eq(1).text();
              const rensketPris = prisTekst.replace(/[^0-9.,/kgstk]/g, '').trim(); // Inkluderer /kg eller /stk i teksten for betingelsen
              if (prisTekst.includes('/kg')) {
                  const perKg = el.find('span').eq(1).text().replace(/[^0-9.]/g, '').trim();
                  prisPerKg = Number(perKg);
              } else if (prisTekst.includes('/stk')) {
                  const perStk = el.find('span').eq(1).text().replace(/[^0-9.]/g, '').trim();
                  prisPerStk = Number(perStk);
              }
              const link = el.attr('href');
              const nyPris = {butikk: imageAlt, pris: pris, prisPerKg: prisPerKg, prisPerStk: prisPerStk, link: link};
              priser.push(nyPris);
            });
    
            // ImageUrl
            const imageUrl = $("main>div>div>div>div>a>img").attr("src")?.trim();

            // Allergener
            const allergener: string[] = [];
            $("aside>div>div>div>ul>li").each((index, element) => {
              const text = $(element).text().replace(/,/g, '').trim();
              allergener.push(text);
            });
            
            let nettovekt: number = 0;
            let proteinerPerKr: number = 0;
            let kalorierPerKr: number = 0;
            let prosentProteinPerKalori: number = 0;
            if(priser.length > 0 && priser[0] && priser[0].prisPerKg !== undefined && næringsinnhold.protein && næringsinnhold.kalorier){
              const pro = næringsinnhold.protein;
              const kal = næringsinnhold.kalorier;
              const krPerKg = priser[0].prisPerKg;
              const protein = (pro * 10) / krPerKg;
              proteinerPerKr = parseFloat(protein.toFixed(2));
              const kalorier = (kal * 10) / krPerKg;
              kalorierPerKr = parseFloat(kalorier.toFixed(2));
              const vekt = priser[0].pris / krPerKg;
              nettovekt = parseFloat(vekt.toFixed(3));
              prosentProteinPerKalori = parseFloat(((pro / kal) * 100).toFixed(2));
            }
            // const body = kategori && underKategori ? 
            const body = { title, næringsinnhold, allergener, nettovekt, priser, imageUrl, popularitet, proteinerPerKr, kalorierPerKr, prosentProteinPerKalori, kategori: "Ukategorisert"} //, underKategori }
              // : { title, næringsinnhold, allergener, nettovekt, priser, imageUrl, popularitet, proteinerPerKr, kalorierPerKr, prosentProteinPerKalori };
            const nyVare = await createDagligvare(body);
            await page.goBack({ waitUntil: 'domcontentloaded' });
            await page.waitForSelector('section>ul>li', { timeout: timeout });
          }

          const nextButton = await page.$('[dusk="nextPage"]');
          hasNextPage = !!nextButton;
          if (hasNextPage) {
            await Promise.all([
              page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: timeout }),
              nextButton?.click(),
            ]);
          }
        }
    //   }
    // }
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




// Bakeri 93/104
// Bakevarer 48/53
// Dessert 8/12 produkter
// Drikke 123/196
// Fisk og skalldyr 40/41
// Frukt og grønt 27/38
// Bakevarer 48/53
// Bakevarer 48/53
// Bakevarer 48/53
// Bakevarer 48/53
// Bakevarer 48/53