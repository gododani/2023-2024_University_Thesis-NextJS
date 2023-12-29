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
import * as z from "zod";
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

// Form schema for the signup form
const formSchema = z
  .object({
    username: z
      .string()
      .nonempty({ message: "Username is required" })
      .min(4, { message: "Username must be at least 4 characters" }),
    firstName: z.string().nonempty({ message: "Firstname is required" }),
    lastName: z.string().nonempty({ message: "Lastname is required" }),
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z
      .string()
      .nonempty({ message: "Password required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm Password required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    country: z.string().nonempty({ message: "Country is required" }),
    phoneNumber: z.string().nonempty({ message: "Phonenumber is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  // useForm hook for the signup form with zodResolver for validation using formSchema
  const form = useForm({
    resolver: zodResolver(formSchema),
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
                        className="dark:bg-dark-input-background"
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
                        className="dark:bg-dark-input-background"
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
                        className="dark:bg-dark-input-background"
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
                        className="dark:bg-dark-input-background"
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
                        className="dark:bg-dark-input-background"
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
                        className="dark:bg-dark-input-background"
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
                <Button className="w-full text-sm sm:text-base" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="w-full text-sm sm:text-base" type="submit">
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
              className="text-primary hover:text-indigo-800 dark:text-dark-blue-text dark:hover:text-blue-500"
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
