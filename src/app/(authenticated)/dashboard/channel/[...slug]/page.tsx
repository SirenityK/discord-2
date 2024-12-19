import { queryMessages } from "@/app/actions";
import db from "@/db";
import { notFound } from "next/navigation";
import ChannelList from "./components/channelList";
import SidePanel from "./components/sidePanel";

export type MessageProps = Awaited<ReturnType<typeof queryMessages>>;
export type ChannelsProps = Awaited<ReturnType<typeof getChannels>>;

async function getChannels(id: string) {
  return await db.server.findUnique({
    where: { id },
    select: {
      channels: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: [string, string] }>;
}) {
  const serverId = (await params).slug[0];
  const currentChannelId = (await params).slug[1];

  const server = await db.server.findFirst({
    where: { id: serverId },
  });

  if (!server) {
    notFound();
  }

  const channels = await getChannels(server.id);

  return (
    <div className="flex h-full">
      <div className="flex flex-col items-center bg-slate-100 py-4 text-center dark:bg-zinc-800">
        <h1 className="text-nowrap border-b border-zinc-700 px-4 pb-2 text-center text-xl font-bold">
          {server.name}
        </h1>
        <ChannelList channels={channels} serverId={server.id} />
      </div>
      <SidePanel channelId={currentChannelId} />
    </div>
  );
}
