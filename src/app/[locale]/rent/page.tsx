import ContactEmail from "@/components/contact/contactEmail";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const trailerImageObjects = Array.from(
  { length: 4 },
  (_, i) => `/rent/trailer_${i + 1}.jpg`
);
const truckImageObjects = Array.from(
  { length: 6 },
  (_, i) => `/rent/truck_${i + 1}.jpg`
);

const Rent = async ({ params: { locale } }: any) => {
  const emailTranslation = await getTranslations("ContactEmail");
  const t = await getTranslations("Rent");
  return (
    <>
      <main className="flex w-full flex-wrap flex-col lg:flex-nowrap gap-12 sm:gap-24 mb-12 sm:mb-20">
        {/* Trailer */}
        <section className="flex flex-col lg:flex-row w-full py-8 sm:px-14 gap-14 xl:gap-20">
          {/* Left side - Details */}
          <div className="w-3/4 lg:w-1/2 flex justify-center mx-auto">
            <div className="flex flex-col justify-center gap-14 sm:gap-20">
              {/* Title */}
              <div className="text-3xl lg:text-4xl xl:text-5xl font-bold underline underline-offset-8 leading-normal text-center lg:text-left">
                <h1>{t("trailerTitle")}</h1>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-4 text-xl lg:text-2xl xl:text-3xl font-semibold leading-relaxed text-secondary-foreground/85">
                <div>
                  {/* Size */}
                  <p className="flex justify-between lg:justify-start gap-2">
                    <span>{t("trailerSize")}:</span>
                    <span className="ml-4 text-primary/90">205x122x84</span>
                  </p>

                  {/* Weight */}
                  <p className="flex justify-between lg:justify-start gap-2">
                    <span>{t("trailerWeight")}:</span>
                    <span className="ml-4 text-primary/90">750 kg</span>
                  </p>

                  {/* Capacity */}
                  <p className="flex justify-between lg:justify-start gap-2 mb-4">
                    <span>{t("trailerCapacity")}:</span>
                    <span className="ml-4 text-primary/90">595 kg</span>
                  </p>
                </div>

                {/* Cauction */}
                <p className="underline underline-offset-8">{t("cauction")}</p>
              </div>

              {/* Price */}
              <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-center lg:text-left">
                <p>
                  <span className="mr-4">{t("price")}:</span>
                  <span>
                    {Number(5000).toLocaleString(locale, {
                      style: "currency",
                      maximumFractionDigits: 0,
                      currency: "HUF",
                    })}
                    /{t("day")}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Left side - Image carousel */}
          <Carousel
            className="w-[70vw] max-w-7xl h-fit mx-auto lg:mx-7"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {trailerImageObjects.map((image: any, index: any) => (
                <CarouselItem key={index}>
                  <Image
                    className="w-full h-auto object-cover max-h-[800vh] lg:max-h-[90vh]"
                    alt={`Truck image ${index + 1}`}
                    src={image}
                    width={500}
                    height={0}
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

        {/* --------------- Truck --------------- */}
        <section className="flex flex-col-reverse lg:flex-row w-full py-8 sm:px-14 gap-14 xl:gap-20 bg-secondary">
          {/* Left side - Image carousel */}
          <Carousel
            className="w-[70vw] max-w-7xl h-fit mx-auto lg:mx-7"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {truckImageObjects.map((image: any, index: any) => (
                <CarouselItem key={index}>
                  <Image
                    className="w-full h-auto object-cover max-h-[800vh] lg:max-h-[90vh]"
                    alt={`Truck image ${index + 1}`}
                    src={image}
                    width={500}
                    height={0}
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

          {/* Right side - Details */}
          <div className="w-3/4 lg:w-1/2 flex justify-center mx-auto">
            <div className="max-w-prose flex flex-col justify-center gap-14 sm:gap-20">
              {/* Title */}
              <div className="text-3xl lg:text-4xl xl:text-5xl font-bold underline underline-offset-8 text-center lg:text-left">
                <h1 className="leading-snug">Citroen Jumper 2.2 HDI 110LE</h1>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-4 text-xl lg:text-2xl xl:text-3xl font-semibold leading-relaxed text-secondary-foreground/85">
                <div>
                  {/* Vintage */}
                  <p className="flex justify-between lg:justify-start gap-2">
                    <span>{t("truckVintage")}:</span>
                    <span className="ml-4 text-primary/90">
                      {new Date("2016-07").toLocaleDateString(locale, {
                        year: "numeric",
                        month: "numeric",
                      })}
                    </span>
                  </p>

                  {/* Fuel */}
                  <p className="flex justify-between lg:justify-start gap-2">
                    <span>{t("truckFuel")}:</span>
                    <span className="ml-4 text-primary/90">
                      {t("truckFuelValue")}
                    </span>
                  </p>

                  {/* Km */}
                  <p className="flex justify-between lg:justify-start gap-2">
                    <span>{t("truckKm")}:</span>
                    <span className="ml-4 text-primary/90">
                      {Number(158000).toLocaleString(locale)}
                    </span>
                  </p>

                  {/* Technical */}
                  <p className="flex justify-between lg:justify-start gap-2 mb-4">
                    <span>{t("truckTechnical")}:</span>
                    <span className="ml-4 text-primary/90">
                      {new Date("2022-10").toLocaleDateString(locale, {
                        year: "numeric",
                        month: "numeric",
                      })}
                    </span>
                  </p>
                </div>

                {/* Description */}
                <p>{t("truckDescription")}</p>

                {/* Cauction */}
                <p className="underline underline-offset-8 my-4">
                  {t("cauction")}
                </p>
              </div>

              {/* Price */}
              <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-center lg:text-left">
                <p>
                  <span className="mr-4">{t("price")}:</span>
                  <span>
                    {Number(30000).toLocaleString(locale, {
                      style: "currency",
                      maximumFractionDigits: 0,
                      currency: "HUF",
                    })}
                    /{t("day")}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Contact */}
      <section className="my-12 sm:my-20 mx-auto px-8 sm:px-28 lg:w-1/2">
        <Card className="bg-muted-foreground/35 text-secondary-foreground shadow-md shadow-secondary-foreground">
          <CardHeader>
            <CardTitle className="text-center text-2xl sm:text-3xl">
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
    </>
  );
};

export default Rent;
