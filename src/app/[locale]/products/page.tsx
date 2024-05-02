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

interface VehicleWithImageData extends Vehicle {
  imageData: string | null;
}
const Products = async ({ params: { locale } }: any) => {
  const session = await getServerSession(authOptions);
  const vehicles = await getVehicles();
  const t = await getTranslations("Vehicle");

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {vehicles.length === 0 ? (
        <>
          <Label>{t("noVehicleTitle")}</Label>
          <Label>{t("noVehicleSubtitle")}</Label>
        </>
      ) : (
        vehicles.map((vehicle: VehicleWithImageData) => (
          <Card
            key={vehicle.id}
            className="w-full bg-primary-foreground/60 p-4 shadow dark:shadow-white space-y-3"
          >
            <Image
              alt="vehicle image"
              width={700}
              height={500}
              priority
              src={`data:image/jpeg;base64,${vehicle.images?.[0]}`}
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
          </Card>
        ))
      )}
    </main>
  );
};

export default Products;
