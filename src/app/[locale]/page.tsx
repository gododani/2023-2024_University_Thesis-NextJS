"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";
// import { CldImage } from "next-cloudinary";
//import { useSession } from "next-auth/react";

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Hero */}
      <section className="w-full text-center h-[calc(100vh-74px)] bg-secondary">
        <div className="flex items-center justify-center h-full">
          <div>
            <p className="text-secondary-foreground text-4xl font-bold">
              Welcome at Bek Autó-Motor
            </p>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="mt-12">
        <div className="w-[80vw] p-6 mx-auto flex flex-wrap border rounded-xl shadow overflow-hidden bg-primary-foreground">
          <div className="w-full text-center my-auto md:w-1/2">
            <p className="text-2xl font-bold">About Us</p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="w-full">
              <p className="mt-6 md:mt-0">
                At our company, we pride ourselves on bringing together a
                diverse group of experts in the automotive industry. Our team is
                composed of seasoned professionals who are passionate about cars
                and dedicated to providing the highest quality of service.
              </p>
              <p className="mt-4">
                Whether you&apos;re looking to buy a new vehicle, need repair
                services for your current one, or want to rent a trailer, we
                have the knowledge and experience to meet your needs.
              </p>
              <p className="mt-4">
                We strive to exceed our customers&apos; expectations and ensure their
                complete satisfaction. Join us on this journey and experience
                the difference we can make in your automotive journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mt-12">
        <div className="w-[80vw] p-6 mx-auto flex flex-wrap border rounded-xl shadow overflow-hidden bg-primary-foreground">
          <div className="w-full text-center my-auto md:w-1/2 order-1 md:order-2">
            <p className="text-2xl font-bold">Our Services</p>
          </div>
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="flex flex-col gap-8 sm:gap-14 mt-8">
              <div className="flex flex-col gap-4">
                <p className="text-xl font-bold underline underline-offset-8">
                  Selling Vehicles
                </p>
                <p>We offer a wide range of cars and motorbikes for sale...</p>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-xl font-bold underline underline-offset-8">
                  Repair
                </p>
                <p>We provide high-quality repair services...</p>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-xl font-bold underline underline-offset-8">
                  Renting Trailer
                </p>
                <p>Rent a trailer from us at affordable prices...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="my-12">
        <div className="w-[80vw] p-6 mx-auto flex flex-wrap border rounded-xl shadow overflow-hidden bg-primary-foreground">
          <div className="w-full text-center my-auto md:w-1/2">
            <p className="text-2xl font-bold">Our Members</p>
          </div>
          <Carousel
            plugins={[plugin.current]}
            className="max-w-[70%] mx-auto md:max-w-[40%] mt-8 md:mt-0"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              <CarouselItem>
                <Image
                  alt="First member image"
                  width={500}
                  height={500}
                  src="/members/roland.jpg"
                  priority
                  layout="responsive"
                />
                <div className="flex h-5 items-center justify-center gap-4 mt-8 text-lg">
                  <p className="text-sm sm:text-xl">Roland Bek</p>
                  <Separator className="bg-primary" orientation="vertical" />
                  <p className="text-sm sm:text-xl">CEO</p>
                </div>
              </CarouselItem>
              <CarouselItem>2</CarouselItem>
              <CarouselItem>3</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  );
}
