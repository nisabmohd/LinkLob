import type { Metadata } from "next";
import { Space_Grotesk, Source_Code_Pro } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import "./globals.css";

const fontSans = Space_Grotesk({
  display: "swap",
  variable: "--font-sans",
  weight: "400",
  subsets: ["latin"],
});

const fontMono = Source_Code_Pro({
  display: "swap",
  variable: "--font-mono",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkLob",
  description: "Paste and share content throught URLs",
  metadataBase: new URL("https://linklob.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} antialiased font-sans tracking-tight`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="container mx-auto sm:px-0 px-5">
            <Navbar />
            <Toaster />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
