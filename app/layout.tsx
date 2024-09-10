import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Providers } from "./Providers";
import { AOSInit } from "./AOSinit";

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
      </body>
    </html>
  );
}
