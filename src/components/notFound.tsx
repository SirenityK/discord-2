"use client";

import { usePathname } from "next/navigation";

export default function NotFound() {
  const path = usePathname();
  const errorMessage = new RegExp("/channel/[a-zA-Z0-9]").test(path)
    ? "We couldn't find the channel you were looking for."
    : new RegExp("/channel").test(path)
      ? "You need to specify the server credentials"
      : "The page you are looking for does not exist.";

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div>
        <h1 className="text-center text-4xl font-bold">404</h1>
        <p className="text-sm text-destructive">{errorMessage}</p>
      </div>
    </div>
  );
}
