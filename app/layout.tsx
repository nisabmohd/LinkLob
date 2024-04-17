import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const font = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-regular",
});

export const metadata: Metadata = {
  title: "LinkLob",
  description: "Paste and share content throught URLs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${GeistMono.variable} ${font.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="font-regular dark:bg-zinc-950 bg-white dark:text-stone-100 text-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
