"use client";

import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/legacy/image";
import { Separator } from "../ui/separator";
import { useTranslations } from "next-intl";

const MembersCarousel = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const t = useTranslations("Home");
  return (
    <Carousel
      plugins={[plugin.current]}
      className="max-w-[70%] mx-auto md:max-w-[40%] mt-8 md:mt-0"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {/* Member 1 */}
        <CarouselItem>
          <Image
            alt="First member image"
            width={500}
            height={500}
            src="/members/roland.jpg"
            priority
            layout="responsive"
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 text-lg">
            <p className="text-xl font-medium text-center">
              {t("Members.member-1-name")}
            </p>
            <Separator
              className="bg-primary h-5 hidden sm:block"
              orientation="vertical"
            />
            <Separator className="bg-primary sm:hidden" />
            <p className="text-xl font-medium text-center">
              {t("Members.member-1-position")}
            </p>
          </div>
          <p className="mt-8">{t("Members.member-1-description")}</p>
        </CarouselItem>

        {/* Member 2 */}
        <CarouselItem>
          <Image
            alt="Second member image"
            width={500}
            height={500}
            src="/members/roland.jpg"
            priority
            layout="responsive"
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 text-lg">
            <p className="text-xl font-medium text-center">
              {t("Members.member-2-name")}
            </p>
            <Separator
              className="bg-primary h-5 hidden sm:block"
              orientation="vertical"
            />
            <Separator className="bg-primary sm:hidden" />
            <p className="text-xl sm:text-lg lg:text-xl font-medium text-center">
              {t("Members.member-2-position")}
            </p>
          </div>
          <p className="my-8">{t("Members.member-2-description")}</p>
        </CarouselItem>

        {/* Member 3 */}
        <CarouselItem>
          <Image
            alt="Third member image"
            width={500}
            height={500}
            src="/members/roland.jpg"
            priority
            layout="responsive"
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 text-lg">
            <p className="text-xl font-medium text-center">
              {t("Members.member-3-name")}
            </p>
            <Separator
              className="bg-primary h-5 hidden sm:block"
              orientation="vertical"
            />
            <Separator className="bg-primary sm:hidden" />
            <p className="text-xl font-medium text-center">
              {t("Members.member-3-position")}
            </p>
          </div>
          <p className="mt-8">{t("Members.member-3-description")}</p>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default MembersCarousel;
