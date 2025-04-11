"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import ExampleLayout from "@/components/layout/example-layout";
import CodeBlock from "@/components/ui/code-block";

export default function DragAnimation() {
  const [dragConstraints, setDragConstraints] = useState(true);

  return (
    <ExampleLayout
      title="Drag Animation"
      description="Learn how to create draggable elements with Motion"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Basic Draggable Element
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Use the
            <code className="mx-1 px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
              drag
            </code>
            prop to make an element draggable.
          </p>

          <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-lg flex justify-center items-center h-64">
            <motion.div
              className="bg-blue-500 w-24 h-24 rounded-lg cursor-grab active:cursor-grabbing flex items-center justify-center text-white font-medium"
              drag
              whileDrag={{ scale: 1.1 }}
            >
              Drag me
            </motion.div>
          </div>

          <CodeBlock
            title="Basic Draggable Element"
            code={`<motion.div
  className="bg-blue-500 w-24 h-24 rounded-lg cursor-grab active:cursor-grabbing"
  drag
  whileDrag={{ scale: 1.1 }}
>
  Drag me
</motion.div>`}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Constrained Dragging</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Restrict dragging to a specific area using
            <code className="mx-1 px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
              dragConstraints
            </code>
            .
          </p>

          <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-lg flex flex-col justify-center items-center h-64 relative">
            <div className="border-2 border-dashed border-zinc-400 dark:border-zinc-600 rounded-lg w-full h-full absolute" />

            <motion.div
              className="bg-green-500 w-24 h-24 rounded-lg cursor-grab active:cursor-grabbing flex items-center justify-center text-white font-medium"
              drag
              dragConstraints={{
                left: -140,
                right: 140,
                top: -100,
                bottom: 100,
              }}
              whileDrag={{ scale: 1.05 }}
            >
              Constrained
            </motion.div>

            <Button
              onClick={() => setDragConstraints(!dragConstraints)}
              variant="outline"
              className="mt-4 absolute bottom-4"
            >
              {dragConstraints ? "Remove" : "Add"} Constraints
            </Button>
          </div>

          <CodeBlock
            title="Constrained Dragging"
            code={`<motion.div
  className="bg-green-500 w-24 h-24 rounded-lg cursor-grab active:cursor-grabbing"
  drag
  dragConstraints={{ left: -140, right: 140, top: -100, bottom: 100 }}
  whileDrag={{ scale: 1.05 }}
>
  Constrained
</motion.div>`}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Axis-Restricted Dragging
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Restrict dragging to a single axis using the
            <code className="mx-1 px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
              drag
            </code>
            prop with &quot;x&quot; or &quot;y&quot;.
          </p>

          <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-lg flex flex-col justify-center items-center h-64 gap-8">
            <motion.div
              className="bg-purple-500 w-36 h-16 rounded-lg cursor-grab active:cursor-grabbing flex items-center justify-center text-white font-medium"
              drag="x"
              dragConstraints={{ left: -120, right: 120 }}
              whileDrag={{ opacity: 0.8 }}
            >
              X-axis only
            </motion.div>

            <motion.div
              className="bg-amber-500 w-16 h-36 rounded-lg cursor-grab active:cursor-grabbing flex items-center justify-center text-white font-medium"
              drag="y"
              dragConstraints={{ top: -80, bottom: 80 }}
              whileDrag={{ opacity: 0.8 }}
            >
              Y-axis only
            </motion.div>
          </div>

          <CodeBlock
            title="Axis-Restricted Dragging"
            code={`// X-axis only
<motion.div
  className="bg-purple-500 w-36 h-16 rounded-lg cursor-grab active:cursor-grabbing"
  drag="x"
  dragConstraints={{ left: -120, right: 120 }}
  whileDrag={{ opacity: 0.8 }}
>
  X-axis only
</motion.div>

// Y-axis only
<motion.div
  className="bg-amber-500 w-16 h-36 rounded-lg cursor-grab active:cursor-grabbing"
  drag="y"
  dragConstraints={{ top: -80, bottom: 80 }}
  whileDrag={{ opacity: 0.8 }}
>
  Y-axis only
</motion.div>`}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Drag with Elasticity</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Add elasticity to dragging with the
            <code className="mx-1 px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
              dragElastic
            </code>
            prop.
          </p>

          <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-lg flex flex-col justify-center items-center h-64 relative">
            <div className="border-2 border-dashed border-zinc-400 dark:border-zinc-600 rounded-lg w-full h-full absolute" />

            <motion.div
              className="bg-pink-500 w-24 h-24 rounded-lg cursor-grab active:cursor-grabbing flex items-center justify-center text-white font-medium"
              drag
              dragConstraints={{
                left: -140,
                right: 140,
                top: -100,
                bottom: 100,
              }}
              dragElastic={0.5}
              whileDrag={{ rotate: 10 }}
            >
              Elastic
            </motion.div>
          </div>

          <CodeBlock
            title="Drag with Elasticity"
            code={`<motion.div
  className="bg-pink-500 w-24 h-24 rounded-lg cursor-grab active:cursor-grabbing"
  drag
  dragConstraints={{ left: -140, right: 140, top: -100, bottom: 100 }}
  dragElastic={0.5}
  whileDrag={{ rotate: 10 }}
>
  Elastic
</motion.div>`}
          />
        </div>
      </div>
    </ExampleLayout>
  );
}
