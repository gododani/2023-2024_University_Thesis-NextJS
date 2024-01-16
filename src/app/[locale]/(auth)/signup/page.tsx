"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import PhoneNumber from "@/components/phoneNumber/PhoneNumber";
import { signupSchema } from "@/lib/schemas";

const Signup = () => {
  // useForm hook for the signup form with zodResolver for validation using formSchema
  const form = useForm({
    resolver: zodResolver(signupSchema),
    mode: "all",
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const t = useTranslations("Signup");
  const toastTranslation = useTranslations("Toast");

  // Submit the form data to the backend to sign up the user
  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const result = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          phoneNumber: values.phoneNumber,
        }),
      });
      // If the result is ok, display a success toast, otherwise display an error toast
      if (result?.ok) {
        toast({
          description: toastTranslation("Register.success"),
          duration: 2000,
        });
        router.push("/signin");
      } else {
        toast({
          description: toastTranslation("Register.fail"),
          variant: "destructive",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        description: toastTranslation("Register.error"),
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center items-center px-6 py-8 lg:px-8">
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
            <div className="mt-9 text-center">
              <p className="text-2xl font-bold leading-9 tracking-tight">
                {t("title")}
              </p>
            </div>
          </div>

          {/* Signup form */}
          <Form {...form}>
            <form
              className="mt-9 sm:mx-auto sm:w-full sm:max-w-sm space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="accountFirstName">
                      {t("firstname")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-secondary text-secondary-foreground"
                        id="accountFirstName"
                        placeholder={t("firstnamePlaceholder").toString()}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.isDirty &&
                        form.formState.errors.firstName &&
                        form.formState.errors.firstName.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="accountLastName">
                      {t("lastname")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-secondary text-secondary-foreground"
                        id="accountLastName"
                        placeholder={t("lastnamePlaceholder").toString()}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.isDirty &&
                        form.formState.errors.lastName &&
                        form.formState.errors.lastName.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="accountUsername">
                      {t("username")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-secondary text-secondary-foreground"
                        placeholder={t("usernamePlaceholder").toString()}
                        id="accountUsername"
                        autoComplete="username"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.isDirty &&
                        form.formState.errors.username &&
                        form.formState.errors.username.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="signupEmail">{t("email")}</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-secondary text-secondary-foreground"
                        id="signupEmail"
                        type="email"
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

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="signupPassword">
                      {t("password")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-secondary text-secondary-foreground"
                        id="signupPassword"
                        type="password"
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

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="signupConfirmPassword">
                      {t("confirmPassword")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-secondary text-secondary-foreground"
                        id="signupConfirmPassword"
                        type="password"
                        placeholder={t("confirmPasswordPlaceholder").toString()}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.isDirty &&
                        form.formState.errors.confirmPassword &&
                        form.formState.errors.confirmPassword.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Phone number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PhoneNumber
                        value={field.value}
                        onChange={field.onChange}
                        setValue={form.setValue}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.isDirty &&
                        form.formState.errors.phoneNumber &&
                        form.formState.errors.phoneNumber.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Signup button */}
              {isLoading ? (
                <Button className="w-full text-sm sm:text-base bg-foreground hover:bg-foreground/70" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="w-full text-sm sm:text-base bg-foreground hover:bg-foreground/70" type="submit">
                  {t("buttonText")}
                </Button>
              )}
            </form>
          </Form>

          {/* Already have an account */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-8">
            <p className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t("alreadyHaveAnAccount")}
            </p>
            <Link
              href="/signin"
              className="text-primary hover:text-primary/70"
            >
              <p className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                {t("loginHere")}
              </p>
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Signup;
