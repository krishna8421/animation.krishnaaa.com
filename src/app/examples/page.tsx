"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import ExampleLayout from "@/components/layout/ExampleLayout";

const examples = [
  {
    title: "Basic Animations",
    description: "Learn the fundamentals of animations with Motion",
    path: "/examples/basic",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Spring Animations",
    description: "Create natural-feeling animations with spring physics",
    path: "/examples/spring",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Keyframes",
    description: "Define multi-step animations with precise control",
    path: "/examples/keyframes",
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Scroll Animations",
    description: "Create scroll-triggered animations and effects",
    path: "/examples/scroll",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Gesture Animations",
    description: "Build interactive animations that respond to user input",
    path: "/examples/gestures",
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Timeline Animations",
    description: "Orchestrate complex animation sequences with precise timing",
    path: "/examples/timeline",
    color: "from-red-500 to-pink-500",
  },
  {
    title: "Layout Animations",
    description: "Create smooth transitions between layout changes",
    path: "/examples/layout-animations",
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Drag Animation",
    description: "Create interactive draggable elements with precise control",
    path: "/examples/drag-animation",
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Advanced Techniques",
    description: "Explore advanced animation concepts and optimizations",
    path: "/examples/advanced-techniques",
    color: "from-amber-500 to-yellow-500",
  },
];

export default function ExamplesPage() {
  return (
    <ExampleLayout
      title="Motion Examples"
      description="A collection of examples demonstrating the capabilities of the Motion animation library."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example, index) => (
          <Link href={example.path} key={example.path}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${example.color} mb-4 flex items-center justify-center text-white text-xl font-bold`}
                  >
                    {example.title.charAt(0)}
                  </div>
                  <CardTitle>{example.title}</CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
                <CardFooter className="text-sm text-muted-foreground flex justify-between items-center">
                  <span>View example</span>
                  <ExternalLink size={14} />
                </CardFooter>
              </Card>
            </motion.div>
          </Link>
        ))}
      </div>
    </ExampleLayout>
  );
}
