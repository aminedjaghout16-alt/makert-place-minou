// ─────────────────────────────────────────────
// Root Layout — App Shell
// ─────────────────────────────────────────────
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "MarketHub — Premium Multi-Category Marketplace",
  description:
    "Buy, sell, and offer services across niche categories. The modern marketplace platform.",
  keywords: ["marketplace", "buy", "sell", "services", "freelance"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Playfair+Display:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface-1 dark:bg-ink-0 text-ink-0 dark:text-surface-2 font-body theme-transition antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
