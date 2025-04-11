"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  BookOpen,
  Zap,
  Feather,
  ScrollText,
  Hand,
  TimerIcon,
  Layout,
  Infinity,
  ArrowRight,
  Move,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

interface ExampleCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const examples: ExampleCard[] = [
  {
    title: "Basic Animation",
    description:
      "Learn the fundamentals of Motion animations with simple examples",
    icon: <Zap size={24} />,
    href: "/examples/basic-animation",
    color: "bg-blue-500",
  },
  {
    title: "Spring Animation",
    description: "Create natural, physics-based animations with springs",
    icon: <Feather size={24} />,
    href: "/examples/spring-animation",
    color: "bg-green-500",
  },
  {
    title: "Keyframes",
    description: "Learn how to create complex animations with keyframes",
    icon: <BookOpen size={24} />,
    href: "/examples/keyframes",
    color: "bg-amber-500",
  },
  {
    title: "Scroll Animations",
    description: "Trigger animations based on scroll position",
    icon: <ScrollText size={24} />,
    href: "/examples/scroll-animations",
    color: "bg-purple-500",
  },
  {
    title: "Gesture Animations",
    description: "Create interactive animations with gesture controls",
    icon: <Hand size={24} />,
    href: "/examples/gesture-animations",
    color: "bg-pink-500",
  },
  {
    title: "Timeline",
    description: "Orchestrate complex animation sequences with timelines",
    icon: <TimerIcon size={24} />,
    href: "/examples/timeline",
    color: "bg-orange-500",
  },
  {
    title: "Layout Animations",
    description: "Animate layout changes with smooth transitions",
    icon: <Layout size={24} />,
    href: "/examples/layout-animations",
    color: "bg-teal-500",
  },
  {
    title: "Drag Animation",
    description: "Create interactive draggable elements with precise control",
    icon: <Move size={24} />,
    href: "/examples/drag-animation",
    color: "bg-cyan-500",
  },
  {
    title: "Advanced Techniques",
    description: "Explore advanced animation techniques and concepts",
    icon: <Infinity size={24} />,
    href: "/examples/advanced-techniques",
    color: "bg-red-500",
  },
];

export default function Home() {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-12 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Motion Animation Library
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            A modern animation library for React and JavaScript
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {examples.map((example, index) => (
            <motion.div
              key={example.href}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.1 * (index + 1),
                duration: 0.5,
                ease: [0.25, 1, 0.5, 1],
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="relative group"
            >
              <Link href={example.href} className="block">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 h-full flex flex-col">
                  <div
                    className={`${example.color} text-white p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4`}
                  >
                    {example.icon}
                  </div>
                  <h2 className="text-xl font-semibold mb-2">
                    {example.title}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4 flex-grow">
                    {example.description}
                  </p>

                  <div className="flex items-center text-zinc-500 dark:text-zinc-400 text-sm font-medium group-hover:text-blue-500 transition-colors duration-200">
                    <span>Explore examples</span>
                    <motion.span
                      initial={{ x: 0 }}
                      animate={{ x: 0 }}
                      className="inline-flex ml-2"
                      whileHover={{ x: 3 }}
                    >
                      <ArrowRight size={16} />
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MainLayout>
  );
}
