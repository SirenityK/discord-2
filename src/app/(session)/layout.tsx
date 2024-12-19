import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const t = useTranslations("session.login");

  return (
    <div className="flex h-screen place-items-center justify-center">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
