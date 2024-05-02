"use client";
import { useTranslations } from "next-intl";
import { Button } from "./button";
import { deleteVehicle } from "@/lib/fetches";
import { toast } from "./use-toast";

interface DeleteVehicleButtonProps {
  id: number;
}

const DeleteVehicleButton = ({ id }: DeleteVehicleButtonProps) => {
  const t = useTranslations("Vehicle");
  const toastTranslation = useTranslations("Toast");
  return (
    <Button
      className="w-full text-sm sm:text-base hover:bg-destructive/70 cursor-pointer"
      variant={"destructive"}
      onClick={async () => {
        try {
          const result = await deleteVehicle(id);
          if (result.ok) {
            toast({
              description: toastTranslation("DeleteVehicle.success"),
              duration: 2000,
            });
            // Refresh page
            window.location.reload();
          } else {
            toast({
              description: toastTranslation("DeleteVehicle.fail"),
              variant: "destructive",
              duration: 2000,
            });
          }
        } catch (error) {
          toast({
            description: toastTranslation("DeleteVehicle.error"),
            variant: "destructive",
            duration: 2000,
          });
        }
      }}
    >
      {t("delete")}
    </Button>
  );
};

export default DeleteVehicleButton;
