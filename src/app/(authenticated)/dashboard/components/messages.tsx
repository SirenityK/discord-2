import { MessageProps } from "../channel/[...slug]/page";

export default function Messages({ messages }: { messages: MessageProps }) {
  return (
    <div className="grid gap-4">
      {messages.map((message) => {
        return (
          <div
            className="rounded-3xl p-4 hover:bg-slate-100 hover:dark:bg-zinc-900"
            key={message.id}
          >
            <div className="flex justify-between">
              <p className="font-bold">{message.author.name}</p>
              <div>
                <p className="text-sm">
                  {message.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            <p>{message.content}</p>
          </div>
        );
      })}
    </div>
  );
}
