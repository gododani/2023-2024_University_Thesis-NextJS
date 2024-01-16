"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { forgetPasswordSchema } from "@/lib/schemas";
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

const ForgetPassword = () => {
  // useForm hook for the signin form with zodResolver for validation using formSchema
  const form = useForm({
    resolver: zodResolver(forgetPasswordSchema),
    mode: "all",
    defaultValues: {
      email: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("Forget-password");
  const toastTranslation = useTranslations("Toast");

  // Submit the form data to the backend to sign in the user
  const onSubmit = async (email: any) => {
    setIsLoading(true);
    try {
      const result = await fetch("/api/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });
      // If the result is ok, display a success toast, otherwise display an error toast
      if (result?.ok) {
        toast({
          description: toastTranslation("Forget-Password.success"),
          duration: 2000,
        });
        router.push("/signin");
      } else if (result?.status === 400) {
        toast({
          description: toastTranslation("Forget-Password.not-found"),
          variant: "destructive",
          duration: 2000,
        });
      } else {
        toast({
          description: toastTranslation("Forget-Password.fail"),
          variant: "destructive",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        description: toastTranslation("Forget-Password.error"),
        variant: "destructive",
        duration: 2000,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center px-6 py-6 sm:py-16 lg:px-8">
      <Card className="w-full bg-primary-foreground/60 sm:max-w-sm md:max-w-md mx-auto px-6 lg:px-8 py-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-8">
          <p className="text-center text-2xl font-bold leading-9 tracking-tight">
            {t("title")}
          </p>
        </div>

        {/* Reset Password Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="sm:mx-auto sm:w-full sm:max-w-sm space-y-6"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }: any) => (
                <FormItem className="my-4">
                  <FormLabel htmlFor="forgetPasswordEmail">
                    {t("email")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="forgetPasswordEmail"
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

            {/* Submit Button */}
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
                <p className="text-secondary">{t("buttonText")}</p>
              </Button>
            )}
          </form>
        </Form>

        {/* Login */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-8">
          <Link href="/signin" className="text-primary hover:text-primary/70">
            <p className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
              {t("loginHere")}
            </p>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgetPassword;
