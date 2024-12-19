import { logout } from "@/app/actions";
import Link from "next/link";
import type { ComponentProps } from "react";
import type { IDProps } from "./navbar";
import { Button } from "./ui/button";
import { DrawerClose } from "./ui/drawer";

export default function ActionMenu({
  id,
  mobile = false,
}: IDProps & { mobile?: boolean }) {
  function DrawerCloseButton({ ...props }: ComponentProps<typeof Button>) {
    return (
      <DrawerClose asChild>
        <Button {...props} asChild variant="secondary">
          {props.children}
        </Button>
      </DrawerClose>
    );
  }
  const ConditionalButton = mobile ? DrawerCloseButton : Button;
  return (
    <>
      <ConditionalButton asChild>
        <Link href="/">Main page</Link>
      </ConditionalButton>
      {id ? (
        <>
          <ConditionalButton asChild>
            <Link href="/dashboard">Dashboard</Link>
          </ConditionalButton>
          <ConditionalButton onClick={logout} asChild>
            <p>Log out</p>
          </ConditionalButton>
        </>
      ) : (
        <>
          <ConditionalButton asChild>
            <Link href="/register">Register</Link>
          </ConditionalButton>
          <ConditionalButton asChild>
            <Link href="/login">Log in</Link>
          </ConditionalButton>
        </>
      )}
    </>
  );
}
