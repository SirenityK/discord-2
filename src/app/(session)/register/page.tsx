"use client";

import { register } from "@/app/actions";
import { registerFormSchema, toFormData } from "@/app/helpers";
import RotatingCircle from "@/components/rotatingCircle";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import Errors from "../components/errors";

export default function Page() {
  const t = useTranslations("session");
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [errors, setErrors] = useState<
    Awaited<ReturnType<typeof register>>["errors"] | null
  >(null);
  const { isSubmitting } = useFormState({
    control: form.control,
  });

  async function onSubmit(data: z.infer<typeof registerFormSchema>) {
    const resp = await register(toFormData(data));
    if (Object.keys(resp.errors).length > 0) {
      setErrors(resp.errors);
    }
  }

  const keys = registerFormSchema.keyof().Enum;

  return (
    <>
      <Form {...form}>
        <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={keys.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("username")}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    required
                    placeholder={t("username_description")}
                    autoComplete="username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={keys.email}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    required
                    placeholder={t("email_description")}
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={keys.password}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("password")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    required
                    placeholder={t("password_description")}
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="my-2 mr-2" type="submit">
            {t("register.title")}
          </Button>
          <Button asChild>
            <Link href="/login">{t("register.alternative")}</Link>
          </Button>
        </form>
      </Form>
      {isSubmitting ? <RotatingCircle /> : errors && <Errors errors={errors} />}
    </>
  );
}
