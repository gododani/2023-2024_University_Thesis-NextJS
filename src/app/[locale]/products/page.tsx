import { getVehicles } from "@/lib/fetches";
import { Vehicle } from "../../../../types/Vehicle";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const Products = async ({ params: { locale } }: any) => {
  const vehicles = await getVehicles();
  const t = await getTranslations("Vehicle");

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {vehicles.map((vehicle: Vehicle) => (
        <Card
          key={vehicle.id}
          className="w-full bg-primary-foreground/60 p-4 shadow-md space-y-3"
        >
          <Image
            alt="vehicle image"
            width={700}
            height={500}
            priority
            src={
              "https://scontent.fbud5-1.fna.fbcdn.net/v/t39.30808-6/426168055_721191103330448_2241691450882524205_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=3635dc&_nc_ohc=amU2TCUu8kUAX-auRBk&_nc_ht=scontent.fbud5-1.fna&oh=00_AfBuo6XYV0815xsC0P-jETr-WJ3FgGWD_VHYPVFAEOW15w&oe=65CD3094"
            }
          />
          <div className="flex justify-between font-medium tracking-wide">
            <p>{t("brandTitle")}</p>
            <p>{vehicle.brand}</p>
          </div>
          <div className="flex justify-between font-medium tracking-wide">
            <p>{t("modelTitle")}</p>
            <p>{vehicle.model}</p>
          </div>
          <div className="flex justify-between font-medium tracking-wide">
            <p>{t("vintageTitle")}</p>
            <p>{vehicle.vintage}</p>
          </div>
          <div className="flex justify-between font-medium tracking-wide">
            <p>{t("fuelTitle")}</p>
            <p>{vehicle.fuel}</p>
          </div>
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
            type="button"
          >
            {t("moreInfo")}
          </Button>
        </Card>
      ))}
    </main>
  );
};

export default Products;
