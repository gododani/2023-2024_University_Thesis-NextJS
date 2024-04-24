"use client";

import { vehicleSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Vehicle } from "../../../../../types/Vehicle";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getVehicle } from "@/lib/fetches";

const ModifyVehicle = ({ params }: any) => {
  const t = useTranslations("Vehicle");
  const toastTranslation = useTranslations("Toast");
  const buttonTranslation = useTranslations("Button");
  const { id } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  // Form
  const form = useForm({
    resolver: zodResolver(vehicleSchema),
    mode: "all",
    defaultValues: {
      brand: "",
      model: "",
      vintage: "",
      fuel: "",
      transmission: "",
      horsepower: 0,
      cylinderCapacity: 0,
      technicalValidity: new Date(),
      km: 0,
      price: 0,
      description: "",
      images: [],
    } as unknown as Vehicle & { images: FileList },
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedVehicle = await getVehicle(id);
      setVehicle(fetchedVehicle);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (vehicle) {
      // Convert the date to YYYY-MM-DD format
      const date = new Date(vehicle.technicalValidity);
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  
      const vehicleForForm = {
        ...vehicle,
        horsepower: vehicle.horsepower,
        cylinderCapacity: vehicle.cylinderCapacity,
        technicalValidity: new Date(formattedDate),
        km: vehicle.km,
        price:vehicle.price,
      };
  
      form.reset(vehicleForForm as unknown as Vehicle & { images: FileList });
    }
  }, [vehicle, form]);

  // file input reference for image uploading
  const fileRef = form.register("images");

  // Helper function to convert a File to a base64 string
  function fileToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      // Create a new FormData object
      const formData = new FormData();

      // Append the values from the form to the formData object
      for (const [key, value] of Object.entries(values)) {
        if (key === "images") {
          const files = value as FileList;
          const base64Images = await Promise.all(
            Array.from(files).map(fileToBase64)
          );
          formData.append(key, JSON.stringify(base64Images));
        } else {
          formData.append(key, value as any);
        }
      }

      const result = await fetch(`/api/vehicles/modifyVehicle/${vehicle?.id}`, {
        method: "POST",
        body: formData,
      });

      // If the result is ok, display a success toast, otherwise display an error toast
      if (result.ok) {
        toast({
          description: toastTranslation("ModifyVehicle.success"),
          duration: 2000,
        });
        form.reset();
      } else {
        toast({
          description: toastTranslation("ModifyVehicle.fail"),
          variant: "destructive",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        description: toastTranslation("ModifyVehicle.error"),
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full bg-primary-foreground/60 sm:max-w-sm md:max-w-md mx-auto px-6 lg:px-8 py-8 my-8">
        <div className="mb-8 text-center">
          <p className="text-2xl font-bold leading-9 tracking-tight">
            {t("title-modify")}
          </p>
        </div>
        <div className="flex justify-center">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-primary-foreground/60 sm:max-w-sm md:max-w-md mx-auto px-6 lg:px-8 py-8 my-8">
      <div className="mb-8 text-center">
        <p className="text-2xl font-bold leading-9 tracking-tight">
          {t("title-modify")}
        </p>
      </div>

      <Form {...form}>
        <form
          className="sm:mx-auto sm:w-full sm:max-w-sm space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          {/* Brand */}
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("brandTitle")}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary text-secondary-foreground"
                    placeholder={t("brandPlaceholder")}
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.brand &&
                    form.formState.errors.brand.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Model */}
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("modelTitle")}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary text-secondary-foreground"
                    placeholder={t("modelPlaceholder")}
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.model &&
                    form.formState.errors.model.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Vintage */}
          <FormField
            control={form.control}
            name="vintage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("vintageTitle")}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary text-secondary-foreground"
                    placeholder={t("vintagePlaceholder")}
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.vintage &&
                    form.formState.errors.vintage.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Fuel */}
          <FormField
            control={form.control}
            name="fuel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fuelTitle")}</FormLabel>
                <Select
                  name="Vehicle fuel"
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger className="w-fit">
                      <SelectValue placeholder={t("fuelPlaceholder")} />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        className="cursor-pointer font-medium"
                        value={"benzin"}
                      >
                        {t("benzin")}
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer font-medium"
                        value="diesel"
                      >
                        {t("diesel")}
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer font-medium"
                        value="electric"
                      >
                        {t("electric")}
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer font-medium"
                        value="hybrid"
                      >
                        {t("hybrid")}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage>
                  {form.formState.errors.fuel &&
                    form.formState.errors.fuel.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Transmission */}
          <FormField
            control={form.control}
            name="transmission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("transmissionTitle")}</FormLabel>
                <FormControl>
                  <Select
                    name="Vehicle transmission"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-fit">
                        <SelectValue
                          placeholder={t("transmissionPlaceholder")}
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          className="cursor-pointer font-medium"
                          value="manual"
                        >
                          {t("manual")}
                        </SelectItem>
                        <SelectItem
                          className="cursor-pointer font-medium"
                          value="automatic"
                        >
                          {t("automatic")}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>
                  {form.formState.errors.transmission &&
                    form.formState.errors.transmission.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Power */}
          <FormField
            control={form.control}
            name="horsepower"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("horsepowerTitle")}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary text-secondary-foreground"
                    type="number"
                    placeholder={t("horsepowerPlaceholder")}
                    required
                    {...field}
                    onChange={(e) => { field.onChange(Number(e.target.value))}}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.horsepower &&
                    form.formState.errors.horsepower.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Cylinder capacity */}
          <FormField
            control={form.control}
            name="cylinderCapacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("cylinderCapacityTitle")}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary text-secondary-foreground"
                    type="number"
                    placeholder={t("cylinderCapacityPlaceholder")}
                    required
                    {...field}
                    onChange={(e) => { field.onChange(Number(e.target.value))}}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.cylinderCapacity &&
                    form.formState.errors.cylinderCapacity.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Technical validity */}
          <FormField
            control={form.control}
            name="technicalValidity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("technicalValidityTitle")}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary text-secondary-foreground"
                    type="date"
                    required
                    {...field}
                    value={
                      field.value instanceof Date
                        ? field.value.toISOString().split("T")[0]
                        : field.value
                    }
                    onChange={(e) => {
                      field.onChange(new Date(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.technicalValidity &&
                    form.formState.errors.technicalValidity.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Km */}
          <FormField
            control={form.control}
            name="km"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("kmTitle")}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary text-secondary-foreground"
                    type="number"
                    placeholder={t("kmPlaceholder")}
                    required
                    {...field}
                    onChange={(e) => { field.onChange(Number(e.target.value))}}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.km && form.formState.errors.km.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("priceTitle")}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary text-secondary-foreground"
                    type="number"
                    placeholder={t("pricePlaceholder")}
                    required
                    {...field}
                    onChange={(e) => { field.onChange(Number(e.target.value))}}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.price &&
                    form.formState.errors.price.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("descriptionTitle")}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary text-secondary-foreground"
                    placeholder={t("descriptionPlaceholder")}
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.description &&
                    form.formState.errors.description.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Images */}
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("imagesTitle")}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary text-secondary-foreground"
                    type="file"
                    multiple
                    required
                    {...fileRef}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.images &&
                    form.formState.errors.images.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Submit button */}
          {isLoading ? (
            <Button
              className="w-full text-sm sm:text-base bg-foreground hover:bg-foreground/70"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {buttonTranslation("loading")}
            </Button>
          ) : (
            <Button
              className="w-full text-sm sm:text-base bg-foreground hover:bg-foreground/70"
              type="submit"
            >
              {buttonTranslation("modify")}
            </Button>
          )}
        </form>
      </Form>
    </Card>
  );
};

export default ModifyVehicle;