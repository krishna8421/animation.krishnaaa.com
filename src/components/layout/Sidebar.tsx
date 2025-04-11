"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Zap,
  Feather,
  ScrollText,
  Hand,
  TimerIcon,
  Layout,
  Infinity,
  Move,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Basic Animation",
    href: "/examples/basic-animation",
    icon: <Zap size={18} />,
  },
  {
    title: "Spring Animation",
    href: "/examples/spring-animation",
    icon: <Feather size={18} />,
  },
  {
    title: "Keyframes",
    href: "/examples/keyframes",
    icon: <BookOpen size={18} />,
  },
  {
    title: "Scroll Animations",
    href: "/examples/scroll-animations",
    icon: <ScrollText size={18} />,
  },
  {
    title: "Gesture Animations",
    href: "/examples/gesture-animations",
    icon: <Hand size={18} />,
  },
  {
    title: "Timeline",
    href: "/examples/timeline",
    icon: <TimerIcon size={18} />,
  },
  {
    title: "Layout Animations",
    href: "/examples/layout-animations",
    icon: <Layout size={18} />,
  },
  {
    title: "Drag Animation",
    href: "/examples/drag-animation",
    icon: <Move size={18} />,
  },
  {
    title: "Advanced Techniques",
    href: "/examples/advanced-techniques",
    icon: <Infinity size={18} />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.aside
      className="w-64 h-screen bg-zinc-900 text-white fixed left-0 top-0 p-4 overflow-y-auto"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="mb-8 px-2"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold">Motion Learn</h1>
        <p className="text-zinc-400 text-sm mt-1">Animation Examples</p>
      </motion.div>

      <nav>
        <ul className="space-y-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <motion.li
                key={item.href}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center p-3 rounded-lg relative overflow-hidden",
                    isActive
                      ? "text-white font-medium"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  {(isActive || hoveredItem === item.href) && (
                    <motion.div
                      className="absolute inset-0 bg-zinc-800 rounded-lg -z-10"
                      layoutId="activeNav"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </motion.aside>
  );
}
