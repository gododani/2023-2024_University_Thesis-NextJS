import React from "react";
import { useTranslations } from "next-intl";
import MembersCarousel from "@/components/carousel/MembersCarousel";

export default function Home() {
  const t = useTranslations("Home");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Hero */}
      <section className="w-full text-center h-[calc(100vh-74px)] bg-secondary">
        <div className="flex items-center justify-center h-full">
          <div>
            <p className="text-secondary-foreground text-4xl font-bold">
              {t("Hero")}
            </p>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="mt-12">
        <div className="w-[80vw] p-6 mx-auto flex flex-wrap border rounded-xl shadow overflow-hidden bg-primary-foreground">
          <div className="w-full text-center my-auto md:w-1/2">
            <p className="text-2xl font-bold">{t("About-us.title")}</p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="w-full">
              <p className="mt-6 md:mt-0">{t("About-us.paragraph-1")}</p>
              <p className="mt-4">{t("About-us.paragraph-2")}</p>
              <p className="mt-4">{t("About-us.paragraph-3")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mt-12">
        <div className="w-[80vw] p-6 mx-auto flex flex-wrap border rounded-xl shadow overflow-hidden bg-primary-foreground">
          <div className="w-full text-center my-auto md:w-1/2 order-1 md:order-2">
            <p className="text-2xl font-bold">{t("Services.title")}</p>
          </div>
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="flex flex-col gap-8 sm:gap-14 mt-8">
              <div className="flex flex-col gap-4">
                <p className="text-xl font-bold underline underline-offset-8">
                  {t("Services.item-1-title")}
                </p>
                <p>{t("Services.item-1-text")}</p>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-xl font-bold underline underline-offset-8">
                  {t("Services.item-2-title")}
                </p>
                <p>{t("Services.item-2-text")}</p>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-xl font-bold underline underline-offset-8">
                  {t("Services.item-3-title")}
                </p>
                <p>{t("Services.item-3-text")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="my-12">
        <div className="w-[80vw] p-6 mx-auto flex flex-wrap border rounded-xl shadow overflow-hidden bg-primary-foreground">
          <div className="w-full text-center my-auto md:w-1/2">
            <p className="text-2xl font-bold">{t("Members.title")}</p>
          </div>
          <MembersCarousel />
        </div>
      </section>
    </div>
  );
}
