"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";

// Form schema for the signin form
const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

const Signin = () => {
  // useForm hook for the signin form with zodResolver for validation using formSchema
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("Signin");
  const toastTranslation = useTranslations("Toast");

  // Display a success toast when the user updates their profile successfully and remove the profileUpdated item from localStorage
  useEffect(() => {
    if (localStorage.getItem("profileUpdated") == "true") {
      console.log("Profile updated successfully");
      setTimeout(() => {
        toast({
          description: toastTranslation("Profile.Profile.success"),
          duration: 2000,
        });
      }, 0);
      localStorage.removeItem("profileUpdated");
    }
  }, []);

  // Submit the form data to the backend to sign in the user
  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      // If the result is ok, display a success toast, otherwise display an error toast
      if (result?.ok) {
        toast({
          description: toastTranslation("Login.success"),
          duration: 2000,
        });
        router.push("/");
      } else {
        toast({
          description: toastTranslation("Login.fail"),
          variant: "destructive",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        description: toastTranslation("Login.error"),
        variant: "destructive",
        duration: 2000,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center px-6 py-6 sm:py-16 lg:px-8">
      <Card className="w-full sm:max-w-sm md:max-w-md mx-auto px-6 lg:px-8 py-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-36 sm:h-52 rounded-full w-auto"
            width={500}
            height={500}
            src="https://scontent.fbud5-1.fna.fbcdn.net/v/t39.30808-6/343576513_1551407625390047_8347504228527958171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=EbY8Mj-0FtYAX-H_pMT&_nc_ht=scontent.fbud5-1.fna&oh=00_AfD7hkchn_-RQt0Jc33oTjhGCTXLj-ikLB51EgLeyKHIlA&oe=65912B94"
            alt="Bek Autó-Motor"
            priority
          />
          <p className="mt-9 text-center text-2xl font-bold leading-9 tracking-tight">
            {t("title")}
          </p>
        </div>

        {/* Login Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-9 sm:mx-auto sm:w-full sm:max-w-sm space-y-6"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel htmlFor="signinEmail">{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="signinEmail"
                      className="dark:bg-dark-input-background"
                      placeholder={t("emailPlaceholder").toString()}
                      autoComplete="email"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.isDirty &&
                      form.formState.errors.email &&
                      form.formState.errors.email.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Password and Forgot Password*/}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }: any) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      {/* Password Label*/}
                      <FormLabel htmlFor="singinPassword">
                        {t("password")}
                      </FormLabel>
                      {/* Forgot Password */}
                      <Link
                        href="#"
                        className="text-primary hover:text-indigo-800 dark:text-dark-blue-text dark:hover:text-blue-500"
                      >
                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                          {t("forgotPassword")}
                        </p>
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        id="singinPassword"
                        className="dark:bg-dark-input-background"
                        placeholder={t("passwordPlaceholder").toString()}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.isDirty &&
                        form.formState.errors.password &&
                        form.formState.errors.password.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            {/* Sing in Button */}
            {isLoading ? (
              <Button
                type="submit"
                className="w-full text-sm sm:text-base"
                disabled
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full text-sm sm:text-base">
                {t("signinButtonText")}
              </Button>
            )}
          </form>
        </Form>

        {/* Don't have an account & Regsiter */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-8">
          <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {t("dontHaveAnAccountText")}
          </p>
          <Link
            href="/signup"
            className="text-primary hover:text-indigo-800 dark:text-dark-blue-text dark:hover:text-blue-500"
          >
            <p className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
              {t("registerHereText")}
            </p>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Signin;
