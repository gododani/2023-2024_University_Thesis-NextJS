"use client";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Profile");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {t("title")}
    </main>
  );
}
