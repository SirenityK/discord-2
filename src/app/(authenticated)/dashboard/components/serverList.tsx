"use client";

import { openServer } from "@/app/actions";
import { openServerFormSchema, toFormData } from "@/app/helpers";
import { roundClassNames } from "@/components/rounded";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Form from "next/form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { ServerProps } from "../layout";

const testImageUrl = "https://github.com/shadcn.png";

export default function ServerList({ servers }: { servers: ServerProps }) {
  const router = useRouter();
  return (
    <>
      {servers.map((server) => (
        <TooltipProvider key={server.id} delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Form
                action={async () => {
                  const route = await openServer(
                    toFormData<z.infer<typeof openServerFormSchema>>({
                      serverId: server.id,
                      channelId: server.defaultChannelId,
                    }),
                  );

                  router.push(
                    `/dashboard/channel/${route.serverId}/${route.channelId}`,
                  );
                }}
              >
                <Button
                  type="submit"
                  className={cn(
                    roundClassNames,
                    "hover:scale-110 hover:rounded-2xl",
                  )}
                >
                  <Image src={testImageUrl} alt="server" fill />
                </Button>
              </Form>
            </TooltipTrigger>
            <TooltipContent>
              <p>{server.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </>
  );
}
