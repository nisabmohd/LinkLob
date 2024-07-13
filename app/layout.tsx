import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { GeistMono } from "geist/font/mono";
import { DM_Sans } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkLob",
  description: "Paste and share content throught URLs",
  metadataBase: new URL("https://linklob.vercel.app/"),
};

const font = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-regular",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${GeistMono.variable} ${font.variable} dark`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="font-regular tracking-wide">
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
