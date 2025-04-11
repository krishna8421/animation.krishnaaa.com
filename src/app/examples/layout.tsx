import MainLayout from "@/components/layout/MainLayout";
import { ReactNode } from "react";

export default function ExamplesLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
