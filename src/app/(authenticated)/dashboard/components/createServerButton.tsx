"use client";

import Errors from "@/app/(session)/components/errors";
import { createServerAction } from "@/app/actions";
import { createServerFormSchema, toFormData } from "@/app/helpers";
import RotatingCircle from "@/components/rotatingCircle";
import { roundClassNames } from "@/components/rounded";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { ComponentProps, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";

export default function CreateServerButton({
  ...props
}: ComponentProps<typeof Dialog>) {
  const t = useTranslations("servers.create");

  const form = useForm<z.infer<typeof createServerFormSchema>>({
    resolver: zodResolver(createServerFormSchema),
    defaultValues: {
      name: "",
    },
  });
  const [errors, setErrors] = useState<
    Awaited<ReturnType<typeof createServerAction>>["errors"] | null
  >(null);
  const [open, setOpen] = useState(false);
  const { isSubmitting } = useFormState({ control: form.control });

  const keys = createServerFormSchema.keyof().Enum;

  return (
    <Dialog open={open} {...props}>
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        <Button
          className={cn(
            roundClassNames,
            "bg-gray-300 hover:bg-gray-400 dark:bg-zinc-800 dark:hover:bg-zinc-700",
          )}
        >
          <Plus className="invert" />
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>{t("get_started")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (data) => {
              const resp = await createServerAction(toFormData(data));
              setErrors(resp.errors);
              console.log(resp);
              if (!resp.errors.name) setOpen(false);
            })}
          >
            <FormField
              control={form.control}
              name={keys.name}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t("name_description")}
                      autoComplete="off"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="my-2" type="submit">
              {t("submit")}
            </Button>
          </form>
        </Form>
        {isSubmitting ? (
          <RotatingCircle />
        ) : (
          errors && <Errors errors={errors} />
        )}
      </DialogContent>
    </Dialog>
  );
}
