import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

export default function CodeBlock({
  code,
  language = "tsx",
  title,
  className,
}: CodeBlockProps) {
  return (
    <motion.div
      className={cn(
        "bg-zinc-950 text-zinc-50 rounded-lg overflow-hidden font-mono text-sm my-4",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {title && (
        <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800">
          <p className="text-xs text-zinc-400">{title}</p>
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </motion.div>
  );
}
