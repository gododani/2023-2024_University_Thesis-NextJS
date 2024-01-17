"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { resetPasswordSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { User } from "../../../../../types/User";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const ResetPassword = ({ params }: any) => {
  // useForm hook for the signin form with zodResolver for validation using formSchema
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "all",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const t = useTranslations("Reset-password");
  const toastVerifyTranslation = useTranslations("Verify-Token");
  const toastResetPasswordTranslation = useTranslations("Toast");

  // Verify the token and get the user data from the backend
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const result = await fetch(`/api/verify-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: params.token }),
        });

        if (result?.ok) {
          const userData: User = await result.json();
          setUser(userData);
          setVerified(true);
        } else {
          setVerified(false);
          toast({
            description: toastVerifyTranslation("fail"),
            variant: "destructive",
            duration: 2000,
          });
        }
      } catch (error) {
        setVerified(false);
        toast({
          description: toastVerifyTranslation("error"),
          variant: "destructive",
          duration: 2000,
        });
      }
    };
    verifyToken();
  }, [params.token]);

  // Submit the email, password and confirmPassword to the backend to reset the password
  const onSubmit = async ({ password, confirmPassword }: any) => {
    setIsLoading(true);
    try {
      const result = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user!.email, password, confirmPassword }),
      });

      // If the result is ok, display a success toast, otherwise display an error toast
      if (result?.ok) {
        toast({
          description: toastResetPasswordTranslation("Reset-Password.success"),
          duration: 2000,
        });
        router.push("/signin");
      } else if (result?.status === 400) {
        toast({
          description: toastResetPasswordTranslation(
            "Reset-Password.passwords-not-match"
          ),
          variant: "destructive",
          duration: 2000,
        });
      } else {
        toast({
          description: toastResetPasswordTranslation("Reset-Password.fail"),
          variant: "destructive",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        description: toastResetPasswordTranslation("Reset-Password.error"),
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
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="resetPassword">{t("password")}</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-secondary text-secondary-foreground"
                      id="resetPassword"
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
                  <FormLabel htmlFor="resetConfirmPassword">
                    {t("confirmPassword")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-secondary text-secondary-foreground"
                      id="resetConfirmPassword"
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
                disabled={!verified}
              >
                <p className="text-secondary">{t("buttonText")}</p>
              </Button>
            )}
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;
