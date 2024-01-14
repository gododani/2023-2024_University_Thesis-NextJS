"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";

type Props = {
  children?: React.ReactNode;
  locale: any;
  messages: any;
  timezone: any;
  now: any;
};

const Providers = ({ children, locale, messages, timezone, now }: Props) => {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timezone}
      now={now}
    >
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
