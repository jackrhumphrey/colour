import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./modern-normalize.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Colour Mixer",
  description: "Tool for mixing colours.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto.variable}`}>
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
