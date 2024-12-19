import { getSession, logout } from "@/app/actions";
import { openServerFormSchema } from "@/app/helpers";
import ThemeToggler from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";
import db from "@/db";
import { LogOut } from "lucide-react";
import { ReactNode } from "react";
import CreateServerButton from "./components/createServerButton";
import ServerList from "./components/serverList";

export type ServerProps = Awaited<ReturnType<typeof getServers>>;

async function getServers(id: string) {
  const userServers = (await db.user.findUnique({
    where: { id },
    select: {
      servers: {
        select: {
          id: true,
          name: true,
          channels: {
            take: 1,
            select: {
              id: true,
              name: true,
            },
            where: {
              default: true,
            },
          },
        },
      },
    },
  })) ?? { servers: [] };

  const servers = userServers?.servers.map((server) => {
    return {
      id: server.id,
      name: server.name,
      defaultChannelId: server.channels[0].id,
    };
  });

  return servers;
}

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession();
  const servers = await getServers(session.id);

  const keys = openServerFormSchema.keyof().Enum;

  return (
    <div className="flex">
      <div className="flex min-h-screen flex-col place-content-start gap-4 border-r p-2 pb-8 text-center dark:bg-zinc-900">
        <ServerList servers={servers} />
        <CreateServerButton />
        <div className="mt-auto grid justify-items-center gap-4">
          <ThemeToggler className="rounded-full" />
          <form action={logout}>
            <Button className="rounded-full" variant="outline" size="icon">
              <LogOut />
            </Button>
          </form>
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
