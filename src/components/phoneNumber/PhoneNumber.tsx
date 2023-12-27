"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import { Label } from "../ui/label";

const PhoneNumber = ({
  value,
  onChange,
  setValue,
  setCountry = () => {},
}: any) => {
  const [phoneNumber, setPhoneNumber] = useState(value);
  const t = useTranslations("PhoneNumber");

  // Set the phone number value when the value changes
  useEffect(() => {
    setPhoneNumber(value);
  }, [value]);

  // Handle phone number change and set the country name
  const handlePhoneChange = (value: string, country: any) => {
    onChange(value);
    setValue("country", country.name);
    setCountry(country.name);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="signupPhoneNumber">{t("title")}</Label>
      <PhoneInput
        inputProps={{
          id: "signupPhoneNumber",
        }}
        inputStyle={{
          display: "flex",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          paddingLeft: "4rem",
          paddingRight: "0.75rem",
          borderRadius: "0.375rem",
          borderWidth: "1px",
          borderColor: "hsl(var(--input))",
          width: "100%",
          height: "2.5rem",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
        }}
        containerClass="text-light-text "
        placeholder={t("placeholder").toString()}
        value={phoneNumber}
        onChange={handlePhoneChange}
      />
    </div>
  );
};

export default PhoneNumber;
