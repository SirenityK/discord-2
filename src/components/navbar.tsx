"use client";

import { getSession } from "@/app/actions";
import { useMediaQuery } from "usehooks-ts";
import MobileDrawer from "./drawer";
import ActionMenu from "./optionlist";
import ThemeToggler from "./theme-toggler";

export interface IDProps {
  id: Awaited<ReturnType<typeof getSession>>["id"];
}

export default function NavBar({ id }: IDProps) {
  const isMobile = useMediaQuery("(max-width: 640px)", {
    initializeWithValue: false,
  });

  return (
    <nav className="sticky top-0 mb-6 flex flex-wrap place-items-center gap-4 p-4">
      {isMobile ? <MobileDrawer id={id} /> : <ActionMenu id={id} />}
      <div className="ml-auto">
        <ThemeToggler />
      </div>
    </nav>
  );
}
