/* eslint-disable @next/next/no-async-client-component */
"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

type Props = {
  children?: React.ReactNode;
  locale: any;
};



const Providers = async ({ children, locale }: Props) => {
  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Budapest">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

export default Providers;
