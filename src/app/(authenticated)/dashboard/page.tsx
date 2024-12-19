import { getSession } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if (session.currentChannelId && session.currentServerId) {
    redirect(
      `/dashboard/channel/${session.currentServerId}/${session.currentChannelId}`,
    );
  }

  return (
    <div className="flex h-full flex-col place-items-center justify-center text-center text-2xl font-bold">
      <p>Welcome, {session.name}!</p>
      <p>You are not in any server. Create a server or join one!</p>
    </div>
  );
}
