import { getVehicles } from "@/lib/fetches";
import { Vehicle } from "../../../../types/Vehicle";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { authOptions } from "@/lib/authOptions";
import DeleteVehicleButton from "@/components/ui/deleteVehicleButton_client";
import { Label } from "@/components/ui/label";
import Filter from "@/components/filter/Filter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Products = async ({
  params: { locale },
  searchParams: { brand, model, vintage, fuel },
}: any) => {
  const session = await getServerSession(authOptions);
  const vehicles = await getVehicles({ brand, model, vintage, fuel });
  const filtersApplied = brand || model || vintage || fuel;
  const t = await getTranslations("Vehicle");
  return (
    <main className="my-6 mb-12 sm:mb-20">
      <Accordion
        type="single"
        collapsible
        className="mx-6 mb-2 px-4 bg-muted-foreground/35 rounded-3xl"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>{t("filterTitle")}</AccordionTrigger>
          <AccordionContent>
            <Filter initialFilters={{ brand, model, vintage, fuel }} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* If there are no vehicles -> show text */}
      {vehicles.length === 0 ? (
        <div className="w-full flex flex-col gap-3 sm:gap-6 justify-center items-center my-8 px-4">
          <Label className="text-sm sm:text-xl">
            {filtersApplied
              ? t("noVehicleWithFiltersTitle")
              : t("noVehicleTitle")}
          </Label>
          <Label className="text-sm sm:text-xl">
            {filtersApplied
              ? t("noVehicleWithFiltersSubtitle")
              : t("noVehicleSubtitle")}
          </Label>
        </div>
      ) : (
        // If there are vehicles -> show them
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 p-6 sm:auto-rows-fr">
          {vehicles.map((vehicle: Vehicle) => (
            <Card
              key={vehicle.id}
              className="flex flex-col gap-4 p-4 bg-muted-foreground/35 shadow-md shadow-secondary-foreground hover:shadow-lg hover:shadow-secondary-foreground"
            >
              <Image
                alt="vehicle image"
                width={700}
                height={500}
                priority
                src={`data:image/jpeg;base64,${vehicle.images?.[0]}`}
              />

              {/* Informations */}
              <div className="mt-auto space-y-4">
                {/* Brand */}
                <div className="flex justify-between font-medium tracking-wide">
                  <p>{t("brandTitle")}</p>
                  <p>{vehicle.brand}</p>
                </div>

                {/* Model */}
                <div className="flex justify-between font-medium tracking-wide">
                  <p>{t("modelTitle")}</p>
                  <p>{vehicle.model}</p>
                </div>

                {/* Vintage */}
                <div className="flex justify-between font-medium tracking-wide">
                  <p>{t("vintageTitle")}</p>
                  <p>{vehicle.vintage}</p>
                </div>

                {/* Fuel */}
                <div className="flex justify-between font-medium tracking-wide">
                  <p>{t("fuelTitle")}</p>
                  <p>{t(vehicle.fuel)}</p>
                </div>

                {/* Price */}
                <div className="flex justify-between font-medium tracking-wide">
                  <p>{t("priceTitle")}</p>
                  <p>
                    {vehicle.price.toLocaleString(locale, {
                      style: "currency",
                      maximumFractionDigits: 0,
                      currency: "HUF",
                    })}
                  </p>
                </div>

                <Button
                  className="w-full text-sm sm:text-base bg-foreground hover:bg-foreground/70"
                  asChild
                >
                  <Link href={`details/${vehicle.id}`}>{t("moreInfo")}</Link>
                </Button>
                {session?.user.role === "ADMIN" && (
                  <>
                    {/* Modify Button */}
                    <Button
                      className="w-full text-sm sm:text-base text-foreground bg-primary hover:bg-primary/70"
                      asChild
                    >
                      <Link href={`/modify-vehicle/${vehicle.id}`}>
                        {t("modify")}
                      </Link>
                    </Button>

                    {/* Delete Button */}
                    <DeleteVehicleButton id={vehicle.id as number} />
                  </>
                )}
              </div>
            </Card>
          ))}
        </section>
      )}
    </main>
  );
};

export default Products;
