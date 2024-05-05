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
import Link from "next/link";

const VehicleDetails = async ({ params: { id, locale } }: any) => {
  const vehicle: Vehicle = await getVehicle(id);
  const images = await getVehicleImages(id);
  const imageObjects = images.map(
    (base64String: string) => `data:image/jpeg;base64,${base64String}`
  );
  const t = await getTranslations("Vehicle");
  const contactTransaltion = await getTranslations("Footer");

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
                  alt={`Vehicle image ${index + 1}`}
                  src={image}
                  width={500}
                  height={500}
                  layout="responsive"
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
        <Card className="bg-secondary text-secondary-foreground shadow-md shadow-secondary-foreground">
          <CardHeader className="w-full xl:w-1/2">
            <CardTitle className="text-center text-2xl sm:text-4xl">
              {vehicle.brand} - {vehicle.model}
            </CardTitle>
            <CardDescription className="text-center text-base sm:text-xl">
              {t("infoSub")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col xl:flex-row justify-between gap-8">
              <div className="flex text-sm flex-col gap-6 w-full xl:w-1/2">
                {/* Brand */}
                <div className="flex justify-between px-1 sm:px-2 sm:text-sm md:text:md lg:text-lg font-bold sm:tracking-wide">
                  <p>{t("brandTitle")}</p>
                  <p>{vehicle.brand}</p>
                </div>
                <Separator className="bg-foreground" />

                {/* Model */}
                <div className="flex justify-between px-1 sm:px-2 sm:text-sm md:text:md lg:text-lg font-bold sm:tracking-wide">
                  <p>{t("modelTitle")}</p>
                  <p>{vehicle.model}</p>
                </div>
                <Separator className="bg-foreground" />

                {/* Vintage */}
                <div className="flex justify-between px-1 sm:px-2 sm:text-sm md:text:md lg:text-lg font-bold sm:tracking-wide">
                  <p>{t("vintageTitle")}</p>
                  <p>{vehicle.vintage}</p>
                </div>
                <Separator className="bg-foreground" />

                {/* Fuel */}
                <div className="flex justify-between px-1 sm:px-2 sm:text-sm md:text:md lg:text-lg font-bold sm:tracking-wide">
                  <p>{t("fuelTitle")}</p>
                  <p>{t(vehicle.fuel)}</p>
                </div>
                <Separator className="bg-foreground" />

                {/* Transmission */}
                <div className="flex justify-between px-1 sm:px-2 sm:text-sm md:text:md lg:text-lg font-bold sm:tracking-wide">
                  <p>{t("transmissionTitle")}</p>
                  <p>{t(vehicle.transmission)}</p>
                </div>
                <Separator className="bg-foreground" />

                {/* Horsepower */}
                <div className="flex justify-between px-1 sm:px-2 sm:text-sm md:text:md lg:text-lg font-bold sm:tracking-wide">
                  <p>{t("horsepowerTitle")}</p>
                  <p>{vehicle.horsepower.toLocaleString(locale)}</p>
                </div>
                <Separator className="bg-foreground" />

                {/* CylinderCapacity */}
                <div className="flex justify-between px-1 sm:px-2 sm:text-sm md:text:md lg:text-lg font-bold sm:tracking-wide">
                  <p>{t("cylinderCapacityTitle")}</p>
                  <p>{vehicle.cylinderCapacity.toLocaleString(locale)}</p>
                </div>
                <Separator className="bg-foreground" />

                {/* TechnicalValidity */}
                <div className="flex justify-between px-1 sm:px-2 sm:text-sm md:text:md lg:text-lg font-bold sm:tracking-wide">
                  <p>{t("technicalValidityTitle")}</p>
                  <p>
                    {new Date(vehicle.technicalValidity).toLocaleDateString(
                      locale
                    )}
                  </p>
                </div>
                <Separator className="bg-foreground" />

                {/* Km */}
                <div className="flex justify-between px-1 sm:px-2 sm:text-sm md:text:md lg:text-lg font-bold sm:tracking-wide">
                  <p>{t("kmTitle")}</p>
                  <p>{vehicle.km.toLocaleString(locale)}</p>
                </div>
                <Separator className="bg-foreground" />

                {/* Price */}
                <div className="flex justify-between px-1 sm:px-2 sm:text-sm md:text:md lg:text-lg font-bold sm:tracking-wide">
                  <p>{t("priceTitle")}</p>
                  <p>
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
                <p className="">{vehicle.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Google Maps */}
      <section className="my-12 sm:my-20 px-6 sm:px-36">
        <Card className="bg-secondary text-secondary-foreground shadow-md shadow-secondary-foreground">
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

      {/* Contact */}
      <section className="my-12 sm:my-20 px-6 sm:px-36">
        <Card className="bg-secondary text-secondary-foreground shadow-md shadow-secondary-foreground">
          <CardHeader>
            <CardTitle className="text-center text-2xl sm:text-4xl">
              {contactTransaltion("contactUs")}
            </CardTitle>
            <CardDescription className="text-center text-base sm:text-xl">
              {contactTransaltion("contactUsSub")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Email */}
            
            {/* Contact details */}
            <div className="flex flex-col gap-4 w-full xl:w-1/2 text-lg tracking-wide">
              <p className="text-center text-2xl font-bold">
                {contactTransaltion("contactDetails")}
              </p>
              <div className="flex flex-col gap-5 sm:gap-4 items-start justify-center">
                {/* Email */}
                <div className="flex gap-3 items-center justify-center sm:justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                    fill="brown"
                  >
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                  </svg>
                  <Link
                    className="hover:text-secondary-foreground font-semibold hover:underline hover:underline-offset-4"
                    href={`mailto:${contactTransaltion("email")}`}
                  >
                    {contactTransaltion("email")}
                  </Link>
                </div>

                {/* Phone */}
                <div className="flex gap-3 items-center justify-center sm:justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                    fill="green"
                  >
                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                  </svg>
                  <Link
                    className="hover:text-secondary-foreground font-semibold hover:underline hover:underline-offset-4"
                    href={`tel:${contactTransaltion("phone")}`}
                  >
                    {contactTransaltion("phone")}
                  </Link>
                </div>

                {/* Address */}
                <div className="flex gap-3 items-left justify-center sm:justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 384 512"
                    className="self-center"
                    fill="red"
                  >
                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                  </svg>
                  <Link
                    className="hover:text-secondary-foreground font-semibold hover:underline hover:underline-offset-4"
                    href={`https://www.google.com/maps/search/?api=1&query=${contactTransaltion(
                      "address"
                    )
                      .split(" ")
                      .join("+")}`}
                    target="_blank"
                  >
                    {contactTransaltion("address")}
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default VehicleDetails;
