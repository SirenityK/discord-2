import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PanelLeftOpen } from "lucide-react";
import { type IDProps } from "./navbar";
import ActionMenu from "./optionlist";

export default function MobileDrawer({ id }: IDProps) {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <PanelLeftOpen />
      </DrawerTrigger>
      <DrawerContent className="h-screen w-2/3 gap-4 rounded-none border-0 p-4">
        <DrawerHeader>
          <DrawerTitle>Quick links</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
        <ActionMenu id={id} mobile />
      </DrawerContent>
    </Drawer>
  );
}
