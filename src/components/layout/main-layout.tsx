"use client";

import { ReactNode } from "react";
import Sidebar from "./sidebar";
import { motion } from "motion/react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <Sidebar />

      <motion.main
        className="flex-1 ml-64 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
    </div>
  );
}
