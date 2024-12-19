"use client";

import { postMessage } from "@/app/actions";
import { postMessageFormSchema, toFormData } from "@/app/helpers";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function PostMessage({
  channelId,
}: {
  channelId: z.infer<typeof postMessageFormSchema>["channelId"];
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof postMessageFormSchema>>({
    resolver: zodResolver(postMessageFormSchema),
    defaultValues: {
      content: "",
      channelId,
    },
  });

  const keys = postMessageFormSchema.keyof().Enum;

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit(async (data) => {
          const resp = await postMessage(toFormData(data));
          if ("errors" in resp) {
            // TODO: Handle error messages
            window.alert("An error occurred while posting the message");
            return;
          }

          form.reset();
          router.refresh();
        })}
      >
        <FormField
          control={form.control}
          name={keys.content}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Write a message"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
      </form>
    </Form>
  );
}
