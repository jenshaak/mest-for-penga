import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mest For Penga",
  description: "Få mest for penga",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Loading />}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <div className="flex w-full bg-base-200">
            <div className="w-1/6">
              <SideBar />
            </div>
            <div className="w-5/6 p-3 pl-5 space-y-4">
              <NavBar />
              {children}
            </div>
          </div>
        </body>
      </html>
    </Suspense>
  );
}
