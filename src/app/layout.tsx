import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import FooterComponent from "@/components/footer/FooterComponent";
import { Suspense } from "react";
import { LoadableContext } from "next/dist/shared/lib/loadable-context.shared-runtime";
import LoadingComponent from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce Website",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarComponent />
        <Suspense fallback={
          <LoadingComponent />}>

          {children}
        </Suspense>
      </body>
      <FooterComponent />
    </html>
  );
}
