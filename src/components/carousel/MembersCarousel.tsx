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
import { members } from "@/lib/members";

const MembersCarousel = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const t = useTranslations("Home");
  return (
    <Carousel
      plugins={[plugin.current]}
      className="max-w-[70%] mx-auto md:max-w-[40%] mt-8 md:mt-0"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {members.map((member, index) => (
          <CarouselItem key={index}>
            <Image
              alt={`Member ${index + 1} image`}
              width={500}
              height={500}
              src={member.image}
              priority
              layout="responsive"
            />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 text-lg">
              <p className="text-xl font-medium text-center">
                {t(`Members.${member.name}`)}
              </p>
              <Separator
                className="bg-primary h-5 hidden sm:block"
                orientation="vertical"
              />
              <Separator className="bg-primary sm:hidden" />
              <p className="text-xl font-medium text-center">
                {t(`Members.${member.position}`)}
              </p>
            </div>
            <p className="mt-8 font-semibold">{t(`Members.${member.description}`)}</p>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default MembersCarousel;
