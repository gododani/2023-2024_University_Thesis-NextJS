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

const ContactEmail = () => {
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

  return (
    <Form {...form}>
      {/* Email */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                className="bg-secondary text-secondary-foreground"
                placeholder="Enter your email"
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
            <FormLabel>Subject</FormLabel>
            <FormControl>
              <Input
                className="bg-secondary text-secondary-foreground"
                placeholder="Enter the subject"
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
            <FormLabel>Message</FormLabel>
            <FormControl>
              <Input
                className="bg-secondary text-secondary-foreground"
                placeholder="Enter your message"
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
    </Form>
  );
};

export default ContactEmail;
