"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { emailSchema } from "@/lib/schemas";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { sendEmail } from "@/lib/fetches";
import { toast } from "../ui/use-toast";

const ContactEmail = () => {
  const emailTranslation = useTranslations("ContactEmail");
  const buttonTranslation = useTranslations("Button");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(emailSchema),
    mode: "all",
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });

  // Submit the form data to the 
  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const res = await sendEmail(values);

      if (res?.ok) {
        toast({
          description: emailTranslation("success"),
          duration: 2000,
        });
      } else {
        toast({
          description: emailTranslation("fail"),
          variant: "destructive",
          duration: 2000,
        });
      }
    } catch {
      toast({
        description: emailTranslation("error"),
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="mt-9 sm:mx-auto sm:w-full space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{emailTranslation("email")}</FormLabel>
              <FormControl>
                <Input
                  className="bg-foreground/10 text-secondary-foreground"
                  placeholder={emailTranslation("emailPlaceholder")}
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.email &&
                  form.formState.errors.email.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Subject */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{emailTranslation("subject")}</FormLabel>
              <FormControl>
                <Input
                  className="bg-foreground/10 text-secondary-foreground"
                  placeholder={emailTranslation("subjectPlaceholder")}
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.subject &&
                  form.formState.errors.subject.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{emailTranslation("message")}</FormLabel>
              <FormControl>
                <Textarea
                  className="bg-foreground/10 text-secondary-foreground"
                  placeholder={emailTranslation("messagePlaceholder")}
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.message &&
                  form.formState.errors.message.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Submit button */}
        <FormItem>
          <FormControl>
            {/* Sing in Button */}
            {isLoading ? (
              <Button
                type="submit"
                className="w-full self-center text-sm sm:text-base bg-foreground/70"
                disabled
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {buttonTranslation("loading")}
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full self-center text-sm sm:text-base bg-foreground hover:bg-foreground/70"
              >
                <p className="text-secondary">{buttonTranslation("send")}</p>
              </Button>
            )}
          </FormControl>
        </FormItem>
      </form>
    </Form>
  );
};

export default ContactEmail;
