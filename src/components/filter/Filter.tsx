"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Fuel } from "../../../types/Vehicle";
import { useTranslations } from "next-intl";
import { Separator } from "../ui/separator";

const Filter = ({ initialFilters }: any) => {
  const [brand, setBrand] = useState(initialFilters.brand || "");
  const [model, setModel] = useState(initialFilters.model || "");
  const [vintage, setVintage] = useState(initialFilters.vintage || "");
  const [fuel, setFuel] = useState<Fuel | "">(initialFilters.fuel || "");

  const t = useTranslations("Vehicle");

  const applyFilters = () => {
    let newUrl = "/products?";
    if (brand && brand.trim() !== "") newUrl += `brand=${brand}&`;
    if (model && model.trim() !== "") newUrl += `model=${model}&`;
    if (vintage && vintage.trim() !== "") newUrl += `vintage=${vintage}&`;
    if (fuel && fuel.trim() !== "" && fuel !== "all") newUrl += `fuel=${fuel}&`;

    newUrl = newUrl.endsWith("&") ? newUrl.slice(0, -1) : newUrl;
    newUrl = newUrl.endsWith("?") ? newUrl.slice(0, -1) : newUrl;

    window.location.href = newUrl;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-1 rounded-lg">
      <Input
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder={t("brandTitle")}
      />
      <Input
        value={model}
        onChange={(e) => setModel(e.target.value)}
        placeholder={t("modelTitle")}
      />
      <Input
        value={vintage}
        maxLength={4}
        onChange={(e) => {
          const value = e.target.value;
          if (!value || /^\d+$/.test(value)) {
            setVintage(value);
          }
        }}
        placeholder={t("vintageTitle")}
      />
      <Select value={fuel} onValueChange={(value) => setFuel(value as Fuel)}>
        {fuel === "" ? (
          <SelectTrigger className="text-muted-foreground">
            <SelectValue placeholder={t("fuelTitle")} />
          </SelectTrigger>
        ) : (
          <SelectTrigger>
            <SelectValue>{t(fuel)}</SelectValue>
          </SelectTrigger>
        )}
        <SelectContent>
          <SelectItem className="cursor-pointer" value="all">
            {t("all")}
          </SelectItem>
          <Separator className="my-2" />
          <SelectItem className="cursor-pointer" value="benzin">
            {t("benzin")}
          </SelectItem>
          <SelectItem className="cursor-pointer" value="diesel">
            {t("diesel")}
          </SelectItem>
          <SelectItem className="cursor-pointer" value="electric">
            {t("electric")}
          </SelectItem>
          <SelectItem className="cursor-pointer" value="hybrid">
            {t("hybrid")}
          </SelectItem>
        </SelectContent>
      </Select>
      <Button
        className="col-span-full sm:col-span-2 lg:col-span-1 bg-foreground hover:bg-foreground/70 rounded-lg"
        onClick={applyFilters}
      >
        {t("filter")}
      </Button>
    </div>
  );
};

export default Filter;
