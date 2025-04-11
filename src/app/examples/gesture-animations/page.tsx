"use client";

import React, { useState } from "react";
import {
  motion,
  useDragControls,
  useMotionValue,
  useTransform,
} from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import ExampleLayout from "@/components/layout/example-layout";
import CodeBlock from "@/components/ui/code-block";

export default function GestureAnimations() {
  return (
    <ExampleLayout
      title="Gesture Animations"
      description="Create interactive animations with gesture controls"
    >
      <div className="space-y-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Introduction to Gestures
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Motion provides built-in gesture support for creating rich,
            interactive animations. Gestures like drag, hover, and tap can
            trigger animations and create interactive UIs.
          </p>

          <CodeBlock
            title="Gesture Props"
            code={`// Hover animations
<motion.div
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
/>

// Drag animations
<motion.div
  drag
  dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50 }}
  whileDrag={{ scale: 1.2 }}
/>`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Basic Drag Gesture</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Make elements draggable with the{" "}
              <code className="px-1 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded">
                drag
              </code>{" "}
              prop and constrain their movement with{" "}
              <code className="px-1 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded">
                dragConstraints
              </code>
              .
            </p>

            <DragExample />

            <div className="mt-6">
              <CodeBlock
                code={`<motion.div
  drag
  dragConstraints={{ top: -100, left: -100, right: 100, bottom: 100 }}
  dragElastic={0.2}
  whileDrag={{ scale: 1.1 }}
  className="w-32 h-32 bg-blue-500 rounded-lg cursor-grab active:cursor-grabbing"
>
  Drag Me
</motion.div>`}
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Directional Dragging</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              You can restrict dragging to specific axes with the{" "}
              <code className="px-1 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded">
                dragDirectionLock
              </code>{" "}
              prop.
            </p>

            <DirectionalDragExample />

            <div className="mt-6">
              <CodeBlock
                code={`<div className="flex space-x-6 items-center">
  <motion.div
    drag="x"
    dragConstraints={{ left: 0, right: 0 }}
    dragElastic={0.2}
    className="w-24 h-24 bg-green-500 rounded-lg"
  >
    X Only
  </motion.div>

  <motion.div
    drag="y"
    dragConstraints={{ top: 0, bottom: 0 }}
    dragElastic={0.2}
    className="w-24 h-24 bg-purple-500 rounded-lg"
  >
    Y Only
  </motion.div>
</div>`}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Drag Controls</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Use{" "}
              <code className="px-1 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded">
                useDragControls
              </code>{" "}
              to enable programmatic control over drag gestures.
            </p>

            <DragControlsExample />

            <div className="mt-6">
              <CodeBlock
                code={`const dragControls = useDragControls();

function startDrag(event) {
  dragControls.start(event);
}

return (
  <>
    <div 
      onPointerDown={startDrag} 
      className="cursor-grab active:cursor-grabbing"
    >
      Drag from here
    </div>
    
    <motion.div
      drag
      dragControls={dragControls}
      className="w-32 h-32 bg-amber-500 rounded-lg"
    >
      I can be dragged from the element above
    </motion.div>
  </>
);`}
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Gesture-Triggered Animations
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Use gesture props like{" "}
              <code className="px-1 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded">
                whileHover
              </code>{" "}
              and{" "}
              <code className="px-1 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded">
                whileTap
              </code>{" "}
              to trigger animations.
            </p>

            <GestureTriggerExample />

            <div className="mt-6">
              <CodeBlock
                code={`<motion.button
  className="px-4 py-2 bg-indigo-500 text-white rounded-md"
  whileHover={{ 
    scale: 1.05,
    backgroundColor: "#4338ca" 
  }}
  whileTap={{ 
    scale: 0.95,
    backgroundColor: "#6366f1" 
  }}
  transition={{ duration: 0.2 }}
>
  Hover & Tap Me
</motion.button>`}
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Advanced Gesture Applications
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Combine gestures with motion values to create complex, interactive
            animations.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Interactive Card Stack
                </h3>
                <CardStackExample />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Rotation on Drag</h3>
                <RotationOnDragExample />
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <CodeBlock
              code={`// For rotation on drag
const x = useMotionValue(0);
const y = useMotionValue(0);
const rotateX = useTransform(y, [-100, 100], [30, -30]);
const rotateY = useTransform(x, [-100, 100], [-30, 30]);

return (
  <motion.div
    drag
    dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
    style={{ x, y, rotateX, rotateY, z: 100 }}
    className="perspective-1000"
  >
    Content here
  </motion.div>
);`}
            />
          </div>
        </div>
      </div>
    </ExampleLayout>
  );
}

// Basic Drag Example Component
const DragExample = () => {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-lg h-[250px] flex items-center justify-center">
      <motion.div
        drag
        dragConstraints={{ top: -100, left: -100, right: 100, bottom: 100 }}
        dragElastic={0.2}
        whileDrag={{ scale: 1.1 }}
        className="w-32 h-32 bg-blue-500 rounded-lg flex items-center justify-center text-white font-medium cursor-grab active:cursor-grabbing"
      >
        Drag Me
      </motion.div>
    </div>
  );
};

// Directional Drag Example Component
const DirectionalDragExample = () => {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-lg h-[250px] flex items-center justify-center">
      <div className="flex space-x-6 items-center">
        <motion.div
          drag="x"
          dragConstraints={{ left: -50, right: 50 }}
          dragElastic={0.2}
          className="w-24 h-24 bg-green-500 rounded-lg flex items-center justify-center text-white font-medium cursor-grab active:cursor-grabbing"
        >
          X Only
        </motion.div>

        <motion.div
          drag="y"
          dragConstraints={{ top: -50, bottom: 50 }}
          dragElastic={0.2}
          className="w-24 h-24 bg-purple-500 rounded-lg flex items-center justify-center text-white font-medium cursor-grab active:cursor-grabbing"
        >
          Y Only
        </motion.div>
      </div>
    </div>
  );
};

// Drag Controls Example Component
const DragControlsExample = () => {
  const dragControls = useDragControls();

  function startDrag(event: React.PointerEvent<HTMLDivElement>) {
    dragControls.start(event);
  }

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-lg h-[250px] flex flex-col items-center justify-center">
      <div
        onPointerDown={startDrag}
        className="mb-4 px-4 py-2 bg-pink-500 text-white rounded-lg cursor-grab active:cursor-grabbing"
      >
        Drag from here
      </div>

      <motion.div
        drag
        dragControls={dragControls}
        dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50 }}
        className="w-32 h-32 bg-amber-500 rounded-lg flex items-center justify-center text-white font-medium"
      >
        I follow
      </motion.div>
    </div>
  );
};

// Gesture Trigger Example Component
const GestureTriggerExample = () => {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-lg h-[250px] flex items-center justify-center">
      <div className="flex flex-col space-y-6 items-center">
        <motion.button
          className="px-6 py-3 bg-indigo-500 text-white rounded-md"
          whileHover={{
            scale: 1.05,
            backgroundColor: "#4338ca",
          }}
          whileTap={{
            scale: 0.95,
            backgroundColor: "#6366f1",
          }}
          transition={{ duration: 0.2 }}
        >
          Hover & Tap Me
        </motion.button>

        <motion.div
          className="p-4 bg-teal-500 text-white rounded-lg"
          whileHover={{
            scale: 1.1,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
            rotate: 5,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Hover for Spring Effect
        </motion.div>
      </div>
    </div>
  );
};

// Card Stack Example Component
const CardStackExample = () => {
  const [cards, setCards] = useState([
    { id: 1, color: "bg-red-500" },
    { id: 2, color: "bg-blue-500" },
    { id: 3, color: "bg-green-500" },
    { id: 4, color: "bg-amber-500" },
  ]);

  const removeCard = (id: number) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const addCards = () => {
    if (cards.length === 0) {
      setCards([
        { id: 1, color: "bg-red-500" },
        { id: 2, color: "bg-blue-500" },
        { id: 3, color: "bg-green-500" },
        { id: 4, color: "bg-amber-500" },
      ]);
    }
  };

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg h-[300px] flex items-center justify-center relative">
      <div className="relative w-64 h-40">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`absolute top-0 left-0 w-full h-full ${card.color} rounded-lg flex items-center justify-center text-white font-medium cursor-grab active:cursor-grabbing`}
            style={{ zIndex: cards.length - index }}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{
              scale: 1 - index * 0.05,
              opacity: 1,
              y: index * -10,
              x: index * 5,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              if (Math.abs(info.offset.x) > 100) {
                removeCard(card.id);
              }
            }}
            whileDrag={{ scale: 1.05 }}
          >
            Swipe to Remove
          </motion.div>
        ))}

        {cards.length === 0 && (
          <div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            onClick={addCards}
          >
            <button className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 rounded-md text-sm">
              Reset Cards
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Rotation on Drag Example Component
const RotationOnDragExample = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg h-[300px] flex items-center justify-center">
      <div style={{ perspective: 1000 }}>
        <motion.div
          drag
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          dragElastic={0.6}
          style={{
            x,
            y,
            rotateX,
            rotateY,
            z: 100,
          }}
          className="w-48 h-64 bg-gradient-to-br from-violet-500 to-purple-700 rounded-lg shadow-xl flex items-center justify-center text-white font-medium cursor-grab active:cursor-grabbing"
        >
          <div className="p-4 text-center">
            <div className="text-lg font-bold mb-1">3D Card</div>
            <div className="text-xs opacity-70">Drag me to rotate</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
