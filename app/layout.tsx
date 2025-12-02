import type { Metadata } from "next";
import { Geist, Geist_Mono, Sansita, Open_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const sansita = Sansita({
  weight: ["400", "700", "800", "900"],
  variable: "--font-sansita",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  weight: ["400", "700", "800"],
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech X",
  description: "Start amazing tech journey with Tech X.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sansita.variable} ${openSans.className} antialiased dark`}
        // style={{ fontFamily: "'Sansita', sans-serif" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
