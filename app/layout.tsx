import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "./Providers";
import { AOSInit } from "./AOSinit";
import Analytics from "./Analytics";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "SimpleRSS - Your Minimalist RSS Reader",
  description:
    "Stay updated with your favorite RSS feeds effortlessly using SimpleRSS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <AOSInit />

      <body className="bg-background text-foreground">
        <Providers>
          <main className="">{children}</main>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
