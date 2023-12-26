"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <nav className="w-full flex justify-between px-8 py-4 bg-transparent">
      {/* Left Side */}
      <div className="flex">
        <Link className="font-semibold p-2" href="/">
          {t("Title")}
        </Link>
      </div>

      {/* Center */}
      <div className="flex gap-8">
        <Link
          className={`font-semibold p-2 rounded-md transition duration-150 hover:bg-secondary ${
            pathname === "/" ? "active" : ""
          }`}
          href="/"
        >
          {t("Home")}
        </Link>
        <Link
          className={`font-semibold p-2 rounded-md transition duration-150 hover:bg-secondary ${
            pathname === "/products" ? "active" : ""
          }`}
          href="/products"
        >
          {t("Products")}
        </Link>
        <Link
          className={`font-semibold p-2 rounded-md transition duration-150 hover:bg-secondary ${
            pathname === "/contact" ? "active" : ""
          }`}
          href="/contact"
        >
          {t("Contact")}
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex">
        {/* User logged in */}
        {session && status === "authenticated" && (
          <Button variant={"outline"} onClick={() => signOut()}>
            {t("LogoutButtonText")}
          </Button>
        )}
        {/* If the user is logged out show login button */}
        {!session && status === "unauthenticated" && (
          <Button variant={"outline"} onClick={() => signIn()}>{t("LoginButtonText")}</Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
