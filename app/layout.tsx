import type { Metadata } from "next";
import { Ubuntu, Lato, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"],
  variable: "--font-ubuntu",
  subsets: ["latin"],
});

const lato = Lato({
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
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
        className={`${ubuntu.variable} ${lato.variable} ${poppins.variable} ${ubuntu.className} antialiased dark`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
