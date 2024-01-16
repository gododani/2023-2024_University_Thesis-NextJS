"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import ThemeSwitcher from "../switcher/ThemeSwitcher";
import dynamic from "next/dynamic";

const LanguageSwitcher = dynamic(() => import("../switcher/LanguageSwitcher"), {
  ssr: true,
});

const Navbar = () => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full flex flex-col md:flex-row justify-between px-8 py-4 bg-transparent">
      {/* Left Side */}
      <div className="flex items-center justify-between">
        {/* Title */}
        <Link className="font-semibold p-2" href="/">
          {t("Title")}
        </Link>

        {/* Hamburger and close icons */}
        <button
          className="md:hidden text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block outline-none focus:outline-none"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen ? (
            <>
              {/* Hamburger Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </>
          ) : (
            <>
              {/* Close Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* Center*/}
      <div className={`hidden md:flex gap-3 lg:gap-8`}>
        {/* Home */}
        <Link
          className={`font-semibold p-2 rounded-md transition duration-150 hover:bg-secondary ${
            pathname.endsWith("/") || pathname.endsWith("/en") ? "active" : ""
          }`}
          href="/"
        >
          {t("Home")}
        </Link>

        {/* Products */}
        <Link
          className={`font-semibold p-2 rounded-md transition duration-150 hover:bg-secondary ${
            pathname.includes("/products") ? "active" : ""
          }`}
          href="/products"
        >
          {t("Products")}
        </Link>

        {/* Rent */}
        <Link
          className={`font-semibold p-2 rounded-md transition duration-150 hover:bg-secondary ${
            pathname.includes("/rent") ? "active" : ""
          }`}
          href="/rent"
        >
          {t("Rent")}
        </Link>
      </div>

      {/* Right Side */}
      <div
        className={`hidden md:flex gap-6 lg:gap-12 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <div className="flex gap-3 items-center justify-center">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
        {/* User logged in */}
        {session && status === "authenticated" && (
          <Button
            className="bg-foreground hover:bg-foreground/70"
            onClick={() => signOut()}
          >
            <p className="text-secondary">{t("LogoutButtonText")}</p>
          </Button>
        )}
        {/* If the user is logged out show login button */}
        {!session && status === "unauthenticated" && (
          <Button
            className="bg-foreground hover:bg-foreground/70"
            onClick={() => signIn()}
          >
            <p className="text-secondary">{t("LoginButtonText")}</p>
          </Button>
        )}
      </div>

      {/* Mobile Navbar */}
      {isOpen && (
        <div className="flex flex-col md:hidden py-2 px-2 space-y-3">
          {/* Home */}
          <Link
            className={`text-center font-semibold p-2 rounded-md transition duration-150 hover:bg-secondary ${
              pathname.endsWith("/") || pathname.endsWith("/en") ? "active" : ""
            }`}
            href="/"
          >
            {t("Home")}
          </Link>

          {/* Products */}
          <Link
            className={`text-center font-semibold p-2 rounded-md transition duration-150 hover:bg-secondary ${
              pathname.includes("/products") ? "active" : ""
            }`}
            href="/products"
          >
            {t("Products")}
          </Link>

          {/* Rent */}
          <Link
            className={`text-center font-semibold p-2 rounded-md transition duration-150 hover:bg-secondary ${
              pathname.includes("/rent") ? "active" : ""
            }`}
            href="/rent"
          >
            {t("Rent")}
          </Link>

          {/* Language Switcher */}
          <div className="self-center">
            <LanguageSwitcher />
          </div>

          {/* Theme Switcher */}
          <div className="text-center">
            <ThemeSwitcher />
          </div>

          {/* User logged in */}
          {session && status === "authenticated" && (
            <Button variant={"outline"} onClick={() => signOut()}>
              {t("LogoutButtonText")}
            </Button>
          )}
          {/* If the user is logged out show login button */}
          {!session && status === "unauthenticated" && (
            <Button variant={"outline"} onClick={() => signIn()}>
              {t("LoginButtonText")}
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
