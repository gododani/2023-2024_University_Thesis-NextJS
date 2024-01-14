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
import { signinSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Signin = () => {
  // useForm hook for the signin form with zodResolver for validation using formSchema
  const form = useForm({
    resolver: zodResolver(signinSchema),
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
      <Card className="w-full bg-primary-foreground/60 sm:max-w-sm md:max-w-md mx-auto px-6 lg:px-8 py-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-36 sm:h-52 rounded-full w-auto"
            width={500}
            height={500}
            src="/logo.jpg"
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
                      className="bg-secondary text-secondary-foreground"
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
                        className="text-primary hover:text-primary/70"
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
                        className="bg-secondary text-secondary-foreground"
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
              <Button
                type="submit"
                className="w-full text-sm sm:text-base bg-foreground hover:bg-foreground/70"
              >
                <p className="text-secondary">{t("signinButtonText")}</p>
              </Button>
            )}
          </form>
        </Form>

        {/* Don't have an account & Regsiter */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-8">
          <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {t("dontHaveAnAccountText")}
          </p>
          <Link href="/signup" className="text-primary hover:text-primary/70">
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
