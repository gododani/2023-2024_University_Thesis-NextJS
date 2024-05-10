import ContactEmail from "@/components/contact/contactEmail";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

const Repair = async () => {
  const navbarTranslation = await getTranslations("Navbar");
  const emailTranslation = await getTranslations("ContactEmail");
  const t = await getTranslations("Repair");
  return (
    <div className="flex w-full flex-wrap flex-col lg:flex-row lg:flex-nowrap lg:gap-4 gap-8 px-8 mt-6 mb-12 sm:mb-20">
      {/* ----------------Left side - Image-------------------- */}
      <div
        className="lg:w-1/2 bg-cover h-screen bg-center bg-no-repeat relative mb-4 sm:mb-8"
        style={{
          backgroundImage: `url('/repair/image1.jpg')`,
        }}
      ></div>

      {/* ------------Right side - Text + Images --------------- */}
      <div className="lg:w-1/2">
        <div className="lg:w-11/12 h-full lg:mx-auto flex flex-col justify-evenly gap-10">
          {/* Title */}
          <div className="text-3xl font-bold underline">
            <h1>{t("title")}</h1>
          </div>

          {/* Welcome text */}
          <div className="text-xl font-semibold text-secondary-foreground/85">
            <p>
              {t("welcomeText1")}
              <span className="text-primary">{navbarTranslation("Title")}</span>
              {t("welcomeText2")}
            </p>
          </div>

          {/* Project counts */}
          <div className="text-xl font-bold underline">{t("projectCount")}</div>

          {/* Project showcase */}
          <div className="flex flex-col sm:gap-1 text-secondary-foreground/85">
            {/* Description text */}
            <div className="mb-4">
              <p className="text-xl font-semibold">
                {t("projectTitle1")}{" "}
                <span className="text-primary">MZ TS 250</span>{" "}
                {t("projectTitle2")}
              </p>
            </div>

            {/* Images */}
            <div className="flex justify-around flex-wrap lg:flex-nowrap gap-4">
              <div
                className="h-[300px] w-10/12 bg-cover bg-no-repeat bg-center"
                style={{
                  backgroundImage: "url('/repair/motor1_elotte.jpg')",
                }}
              ></div>
              <div
                className="h-[300px] w-10/12 bg-cover bg-no-repeat bg-center"
                style={{
                  backgroundImage: "url('/repair/motor1_utana.jpg')",
                }}
              ></div>
            </div>

            {/* Feedback */}
            <div className="mt-4">
              <p className="text-xl">
                {t("feedback1")} {navbarTranslation("Title")} {t("feedback2")}
              </p>
            </div>
            <div className="my-3">{t("feedbackName")}</div>
          </div>

          {/* Contact */}
          <Card className="bg-muted-foreground/35 text-secondary-foreground shadow-md shadow-secondary-foreground">
            <CardHeader>
              <CardTitle className="text-center text-2xl sm:text-4xl">
                {emailTranslation("title")}
              </CardTitle>
              <CardDescription className="text-center text-base sm:text-xl">
                {emailTranslation("subtitle")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Email */}
              <Card>
                <CardContent className="bg-muted-foreground/10">
                  <div className="flex flex-col gap-4">
                    <ContactEmail />
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Repair;
