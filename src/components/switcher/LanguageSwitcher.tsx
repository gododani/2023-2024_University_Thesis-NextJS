import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const LanguageSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Language");

  const handleChange = (langCode: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: langCode });
      router.refresh();
    });
  };

  return (
    <Select
      name="Language selector"
      defaultValue={locale}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Language selector" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="cursor-pointer font-medium" value="hu">
          {t("hungarian")}
        </SelectItem>
        <SelectItem className="cursor-pointer font-medium" value="en">
          {t("english")}
        </SelectItem>
        <SelectItem className="cursor-pointer font-medium" value="de">
          {t("deutsch")}
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
