"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import ExampleLayout from "@/components/layout/example-layout";
import CodeBlock from "@/components/ui/code-block";

export default function BasicAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <ExampleLayout
      title="Basic Animation"
      description="Learn the fundamentals of Motion animations with simple examples"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Simple Motion Component
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            The most basic way to animate an element is to use the
            <code className="mx-1 px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
              motion
            </code>
            component with
            <code className="mx-1 px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
              initial
            </code>
            and
            <code className="mx-1 px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
              animate
            </code>
            props.
          </p>

          <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-lg flex justify-center items-center">
            <motion.div
              className="bg-blue-500 w-24 h-24 rounded-lg"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 180 }}
              transition={{ duration: 1 }}
            />
          </div>

          <CodeBlock
            title="Simple Motion Component"
            code={`<motion.div
  className="bg-blue-500 w-24 h-24 rounded-lg"
  initial={{ scale: 0, rotate: 0 }}
  animate={{ scale: 1, rotate: 180 }}
  transition={{ duration: 1 }}
/>`}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Animation Controls</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            You can control animations by toggling state variables and changing
            the
            <code className="mx-1 px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
              animate
            </code>
            property.
          </p>

          <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-lg flex flex-col justify-center items-center">
            <motion.div
              className="bg-green-500 w-24 h-24 rounded-lg mb-6"
              animate={
                isAnimating
                  ? { x: 100, backgroundColor: "#ec4899" }
                  : { x: 0, backgroundColor: "#22c55e" }
              }
              transition={{ duration: 0.5 }}
            />

            <Button
              onClick={() => setIsAnimating(!isAnimating)}
              variant="outline"
            >
              {isAnimating ? "Reset Animation" : "Start Animation"}
            </Button>
          </div>

          <CodeBlock
            title="Animation Controls"
            code={`const [isAnimating, setIsAnimating] = useState(false);

<motion.div
  className="bg-green-500 w-24 h-24 rounded-lg"
  animate={
    isAnimating 
      ? { x: 100, backgroundColor: '#ec4899' } 
      : { x: 0, backgroundColor: '#22c55e' }
  }
  transition={{ duration: 0.5 }}
/>

<Button onClick={() => setIsAnimating(!isAnimating)}>
  {isAnimating ? 'Reset Animation' : 'Start Animation'}
</Button>`}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Hover Animations</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Use
            <code className="mx-1 px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
              whileHover
            </code>
            to create animations that trigger on hover.
          </p>

          <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-lg flex justify-center items-center">
            <motion.div
              className="bg-purple-500 w-24 h-24 rounded-lg cursor-pointer flex items-center justify-center text-white font-medium"
              whileHover={{
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Hover me
            </motion.div>
          </div>

          <CodeBlock
            title="Hover Animations"
            code={`<motion.div
  className="bg-purple-500 w-24 h-24 rounded-lg"
  whileHover={{ 
    scale: 1.1,
    rotate: 5,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
  }}
  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
>
  Hover me
</motion.div>`}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Tap Animations</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Use
            <code className="mx-1 px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
              whileTap
            </code>
            to create animations that trigger when the element is pressed.
          </p>

          <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-lg flex justify-center items-center">
            <motion.button
              className="bg-amber-500 text-white font-medium px-6 py-3 rounded-full"
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Press me
            </motion.button>
          </div>

          <CodeBlock
            title="Tap Animations"
            code={`<motion.button
  className="bg-amber-500 text-white font-medium px-6 py-3 rounded-full"
  whileTap={{ scale: 0.9 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  Press me
</motion.button>`}
          />
        </div>
      </div>
    </ExampleLayout>
  );
}
