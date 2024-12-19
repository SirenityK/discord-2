import { queryMessages } from "@/app/actions";
import Messages from "../../../components/messages";
import PostMessage from "../../../components/postMessage";
import { MessageProps } from "../page";

export default async function SidePanel({
  channelId,
}: {
  channelId: MessageProps[0]["channelId"];
}) {
  const messages = await queryMessages(channelId);
  return (
    <div className="flex w-full flex-grow flex-col-reverse justify-start gap-4 overflow-y-auto p-4 pb-8">
      <PostMessage channelId={channelId} />
      <Messages messages={messages} />
    </div>
  );
}
