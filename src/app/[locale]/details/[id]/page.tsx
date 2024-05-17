import { getVehicle, getVehicleImages } from "@/lib/fetches";
import { Vehicle } from "../../../../../types/Vehicle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { Separator } from "@/components/ui/separator";
import ContactEmail from "@/components/contact/contactEmail";

const VehicleDetails = async ({ params: { id, locale } }: any) => {
  const vehicle: Vehicle = await getVehicle(id);
  const images = await getVehicleImages(id);
  const imageObjects = images.map(
    (base64String: string) => `data:image/jpeg;base64,${base64String}`
  );
  const t = await getTranslations("Vehicle");
  const emailTranslation = await getTranslations("ContactEmail");

  return (
    <main>
      {/* Images */}
      <section className="my-3 sm:my-6">
        <Carousel
          className="w-[70vw] max-w-7xl h-fit mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {imageObjects.map((image: any, index: any) => (
              <CarouselItem key={index}>
                <Image
                  className="w-full h-auto"
                  alt={`Vehicle image ${index + 1}`}
                  src={image}
                  width={500}
                  height={500}
                  priority
                  placeholder="blur"
                  blurDataURL={image}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Details */}
      <section className="my-12 sm:my-20 px-6 sm:px-36">
        <Card className="bg-muted-foreground/35 text-secondary-foreground shadow-md shadow-secondary-foreground">
          <CardHeader className="w-full xl:w-1/2">
            <CardTitle className="text-center text-2xl sm:text-4xl">
              {vehicle.brand}
            </CardTitle>
            <CardDescription className="text-center text-base sm:text-xl">
            {vehicle.model}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col xl:flex-row justify-between gap-8">
              <div className="flex flex-col gap-6 w-full xl:w-1/2 text-lg font-semibold sm:font-bold sm:tracking-wide">
                {/* Brand */}
                <div className="flex flex-col md:flex-row md:justify-between px-1 sm:px-2">
                  <p>{t("brandTitle")}</p>
                  <p className="pl-2 text-secondary-foreground/75">{vehicle.brand}</p>
                </div>
                <Separator className="bg-foreground" />

                {/* Model */}
                <div className="flex flex-col md:flex-row md:justify-between px-1 sm:px-2">
                  <p>{t("modelTitle")}</p>
                  <p className="pl-2 text-secondary-foreground/75">{vehicle.model}</p>
                </div>
                <Separator className="bg-foreground" />

                {/* Vintage */}
                <div className="flex flex-col md:flex-row md:justify-between px-1 sm:px-2">
                  <p>{t("vintageTitle")}</p>
                  <p className="pl-2 text-secondary-foreground/75">{vehicle.vintage}</p>
                </div>
                <Separator className="bg-foreground" />

                {/* Fuel */}
                <div className="flex flex-col md:flex-row md:justify-between px-1 sm:px-2">
                  <p>{t("fuelTitle")}</p>
                  <p className="pl-2 text-secondary-foreground/75">{t(vehicle.fuel)}</p>
                </div>
                <Separator className="bg-foreground" />

                {/* Transmission */}
                <div className="flex flex-col md:flex-row md:justify-between px-1 sm:px-2">
                  <p>{t("transmissionTitle")}</p>
                  <p className="pl-2 text-secondary-foreground/75">{t(vehicle.transmission)}</p>
                </div>
                <Separator className="bg-foreground" />

                {/* Horsepower */}
                <div className="flex flex-col md:flex-row md:justify-between px-1 sm:px-2">
                  <p>{t("horsepowerTitle")}</p>
                  <p className="pl-2 text-secondary-foreground/75">{vehicle.horsepower.toLocaleString(locale)}</p>
                </div>
                <Separator className="bg-foreground" />

                {/* Drive */}
                <div className="flex flex-col md:flex-row md:justify-between px-1 sm:px-2">
                  <p>{t("driveTitle")}</p>
                  <p className="pl-2 text-secondary-foreground/75">{vehicle.drive}</p>
                </div>
                <Separator className="bg-foreground" />

                {/* TechnicalValidity */}
                <div className="flex flex-col md:flex-row md:justify-between px-1 sm:px-2">
                  <p>{t("technicalValidityTitle")}</p>
                  <p className="pl-2 text-secondary-foreground/75">
                    {new Date(vehicle.technicalValidity).toLocaleDateString(
                      locale
                    )}
                  </p>
                </div>
                <Separator className="bg-foreground" />

                {/* Km */}
                <div className="flex flex-col md:flex-row md:justify-between px-1 sm:px-2">
                  <p>{t("kmTitle")}</p>
                  <p className="pl-2 text-secondary-foreground/75">{vehicle.km.toLocaleString(locale)}</p>
                </div>
                <Separator className="bg-foreground" />

                {/* Price */}
                <div className="flex flex-col md:flex-row md:justify-between px-1 sm:px-2">
                  <p>{t("priceTitle")}</p>
                  <p className="pl-2 text-secondary-foreground/75">
                    {vehicle.price.toLocaleString(locale, {
                      style: "currency",
                      maximumFractionDigits: 0,
                      currency: "HUF",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full xl:w-1/2 text-lg tracking-wide">
                <p className="text-center text-2xl font-bold">
                  {t("descriptionTitle")}
                </p>
                <p className="text-sm sm:text-lg font-semibold sm:tracking-wide">{vehicle.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Google Maps */}
      <section className="my-12 sm:my-20 mx-auto px-8 sm:px-28 lg:px-0 lg:max-w-[60vw]">
        <Card className="bg-muted-foreground/35 text-secondary-foreground shadow-md shadow-secondary-foreground">
          <CardHeader>
            <CardTitle className="text-center text-2xl sm:text-4xl">
              {t("locationTitle")}
            </CardTitle>
            <CardDescription className="text-center text-base sm:text-xl">
              {t("locationTitleSub")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <iframe
              className="w-full h-[50vh] sm:h-[70vh]"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.3591613069784!2d19.27778075501708!3d47.50239622448299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741c697a398335b%3A0xb85f6b697224b00f!2sBudapest%2C%20Szilasliget%20u.%2027%2C%201172!5e0!3m2!1shu!2shu!4v1714894456780!5m2!1shu!2shu"
              loading="lazy"
              allowFullScreen
            />
          </CardContent>
        </Card>
      </section>

      {/* Email */}
      <section className="my-12 sm:my-20 mx-auto px-8 sm:px-28 lg:w-1/2">
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
      </section>
    </main>
  );
};

export default VehicleDetails;
