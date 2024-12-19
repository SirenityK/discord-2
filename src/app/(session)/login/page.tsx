"use client";

import { login } from "@/app/actions";
import { loginFormSchema, toFormData } from "@/app/helpers";
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

export default function Home() {
  const t = useTranslations("session");
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { isSubmitting } = useFormState({ control: form.control });

  const [errors, setErrors] = useState<
    Awaited<ReturnType<typeof login>>["errors"] | null
  >(null);

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    const resp = await login(toFormData(data));
    if (Object.keys(resp.errors).length > 0) {
      setErrors(resp.errors);
    }
  }

  const keys = loginFormSchema.keyof().Enum;

  return (
    <>
      <Form {...form}>
        <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField  
            control={form.control}
            name={keys.email}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input
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
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="my-2 mr-2" type="submit">
            {t("login.title")}
          </Button>
          <Button asChild>
            <Link href="/register">{t("login.alternative")}</Link>
          </Button>
        </form>
      </Form>
      {isSubmitting ? <RotatingCircle /> : errors && <Errors errors={errors} />}
    </>
  );
}
