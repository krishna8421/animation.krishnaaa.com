import React, { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ExampleLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export default function ExampleLayout({
  title,
  description,
  children,
  className,
}: ExampleLayoutProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        className="mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
      </motion.div>

      <div
        className={cn(
          "bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
