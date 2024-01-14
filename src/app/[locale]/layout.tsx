import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "../../lib/utils";
import "./globals.css";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer/Footer";
import { useMessages, useNow, useTimeZone } from "next-intl";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Bek Autó-Motor Kft",
  description:
    "The website of a company mainly dealing with vehicle sales, repairs and trailer rental in Hungary, but people can also sell their vehicles here.",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Translations are loaded here and passed down to the providers
  const messages = useMessages();

  // Timezone is loaded here and passed down to the providers
  const timezone = useTimeZone();

  // Time is loaded here and passed down to the providers
  const now = useNow();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers
          locale={locale}
          messages={messages}
          timezone={timezone}
          now={now}
        >
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
