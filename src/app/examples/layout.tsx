import MainLayout from "@/components/layout/main-layout";
import { ReactNode } from "react";

export default function ExamplesLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
