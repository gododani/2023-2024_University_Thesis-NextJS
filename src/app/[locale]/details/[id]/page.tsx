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

const VehicleDetails = async ({ params: { id, locale } }: any) => {
  const vehicle: Vehicle = await getVehicle(id);
  const images = await getVehicleImages(id);
  const imageObjects = images.map(
    (base64String: string) => `data:image/jpeg;base64,${base64String}`
  );
  const t = await getTranslations("Vehicle");

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
      <section className="my-10 sm:my-32 px-6 sm:px-52">
        <Card className="bg-secondary text-secondary-foreground shadow-lg shadow-primary">
          <CardHeader className="w-full lg:w-1/2">
            <CardTitle className="text-center text-4xl">
              {vehicle.brand} - {vehicle.model}
            </CardTitle>
            <CardDescription className="text-center text-lg">
              Információk a járműről
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
                  <p>{vehicle.fuel}</p>
                </div>
                <Separator className="bg-foreground" />

                {/* Transmission */}
                <div className="flex justify-between px-1 sm:px-2 sm:text-sm md:text:md lg:text-lg font-bold sm:tracking-wide">
                  <p>{t("transmissionTitle")}</p>
                  <p>{vehicle.transmission}</p>
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
    </main>
  );
};

export default VehicleDetails;
