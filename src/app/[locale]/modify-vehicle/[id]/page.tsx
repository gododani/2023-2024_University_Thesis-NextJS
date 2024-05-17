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
import { getVehicle, getVehicleImages } from "@/lib/fetches";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

const ModifyVehicle = ({ params }: any) => {
  const t = useTranslations("Vehicle");
  const toastTranslation = useTranslations("Toast");
  const buttonTranslation = useTranslations("Button");
  const { id } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [images, setImages] = useState<string[]>(
    Array.isArray(vehicle?.images) ? vehicle.images : []
  );

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
      drive: "",
      technicalValidity: new Date(),
      km: 0,
      price: 0,
      description: "",
      images: [],
    } as unknown as Vehicle & { images: FileList },
  });

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the vehicle with the given ID
      const fetchedVehicle = await getVehicle(id);
      if (!fetchedVehicle) {
        setIsLoading(false);
        return;
      }

      // Fetch the images for the vehicle with the given ID
      const fetchedImages = await getVehicleImages(id);

      // Convert the base64 strings to image URLs
      const imageUrls = fetchedImages.map(
        (base64String: string) => `data:image/jpeg;base64,${base64String}`
      );

      // Set the images on the vehicle object
      fetchedVehicle.images = imageUrls;

      setImages(fetchedVehicle.images);

      // Set the vehicle state
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
        drive: vehicle.drive,
        technicalValidity: new Date(formattedDate),
        km: vehicle.km,
        price: vehicle.price,
      };

      form.reset(vehicleForForm as unknown as Vehicle & { images: FileList });
    }
  }, [vehicle, form]);

  // file input reference for image uploading
  const fileRef = form.register("images");

  // Function for handling file selection
  const handleFileSelect = async (event: any) => {
    const files = Array.from(event.target.files);
    const newImages = await Promise.all(files.map(fileToBase64));
    setImages([...images, ...(newImages as string[])]);
  };

  // Function for converting a file to a base64 string
  function fileToBase64(file: any) {
    return new Promise((resolve, reject) => {
      if (!(file instanceof File)) {
        reject(new Error(`Expected a File, but got ${typeof file}`));
        return;
      }

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
          images.forEach((image, index) => {
            formData.append(`${key}[${index}]`, image);
          });
        } else {
          formData.append(key, value as any);
        }
      }

      // Create a new XMLHttpRequest
      const xhr = new XMLHttpRequest();

      // Listen for the 'progress' event
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          // Calculate the upload progress as a percentage
          const progress = Math.round((event.loaded / event.total) * 100);
          setProgress(progress);
        }
      });

      // Open the request
      xhr.open("POST", `/api/vehicles/modifyVehicle/${vehicle?.id}`, true);

      // Send the request
      xhr.send(formData);

      // Wait for the request to complete
      await new Promise((resolve, reject) => {
        xhr.onload = resolve;
        xhr.onerror = reject;
      });

      // If the result is ok, display a success toast, otherwise display an error toast
      if (xhr.status === 200) {
        toast({
          description: toastTranslation("ModifyVehicle.success"),
          duration: 2000,
        });
        form.reset();
        setImages([]);
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
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.horsepower &&
                    form.formState.errors.horsepower.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Drive */}
          <FormField
            control={form.control}
            name="drive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("driveTitle")}</FormLabel>
                <FormControl>
                  <Select
                    name="Vehicle drive"
                    onValueChange={field.onChange}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-fit">
                        <SelectValue placeholder={t("drivePlaceholder")} />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          className="cursor-pointer font-medium"
                          value="All Wheels"
                        >
                          {t("allWheels")}
                        </SelectItem>
                        <SelectItem
                          className="cursor-pointer font-medium"
                          value="Front Wheel"
                        >
                          {t("frontWheel")}
                        </SelectItem>
                        <SelectItem
                          className="cursor-pointer font-medium"
                          value="Rear Wheel"
                        >
                          {t("rearWheel")}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>
                  {form.formState.errors.drive &&
                    form.formState.errors.drive.message}
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
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
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
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
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
                  <Textarea
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
                <FormLabel>{t("newImage")}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary text-secondary-foreground"
                    type="file"
                    multiple
                    {...fileRef}
                    onChange={handleFileSelect}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.images &&
                    form.formState.errors.images.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {vehicle?.images && <p>{t("imagesTitle")}</p>}

          {/* Images preview */}
          <div className="flex flex-wrap gap-4">
            {Array.isArray(vehicle?.images) &&
              images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    alt={`Vehicle image ${index}`}
                    width={700}
                    height={700}
                    src={image}
                    priority
                  />
                  <Button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 w-8 h-8 text-white rounded-full flex items-center justify-center"
                    onClick={() => {
                      setImages(images.filter((_, i) => i !== index));
                    }}
                  >
                    X
                  </Button>
                </div>
              ))}
          </div>

          {/* Submit button */}
          {isLoading ? (
            <>
              <Button
                className="w-full text-sm sm:text-base bg-foreground hover:bg-foreground/70"
                disabled
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {buttonTranslation("loading")}
              </Button>
              <Progress value={progress} />
            </>
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
