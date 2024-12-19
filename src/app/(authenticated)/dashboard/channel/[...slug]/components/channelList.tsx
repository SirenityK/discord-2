"use client";

import { openChannel } from "@/app/actions";
import { openChannelFormSchema, toFormData } from "@/app/helpers";
import { Button } from "@/components/ui/button";
import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { ChannelsProps } from "../page";

export default function ChannelList({
  channels,
  serverId,
}: {
  channels: ChannelsProps;
  serverId: string;
}) {
  const router = useRouter();
  return (
    <>
      {channels?.channels.map((channel) => {
        return (
          <Form
            key={channel.id}
            action={async () => {
              const route = await openChannel(
                toFormData<z.infer<typeof openChannelFormSchema>>({
                  serverId: serverId,
                  channelId: channel.id,
                }),
              );

              router.push(
                `/dashboard/channel/${route.serverId}/${route.channelId}`,
              );
            }}
          >
            <Button
              variant={"outline"}
              asChild
              className="dark:hover:bg-zinc-60 m-2 w-40 bg-gray-300 hover:bg-gray-400 dark:bg-zinc-700"
            >
              <Link href={`/dashboard/channel/${serverId}/${channel.id}`}>
                #{channel.name}
              </Link>
            </Button>
          </Form>
        );
      })}
    </>
  );
}
