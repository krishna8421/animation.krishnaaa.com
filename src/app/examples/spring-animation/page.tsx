"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import ExampleLayout from "@/components/layout/example-layout";
import CodeBlock from "@/components/ui/code-block";

export default function SpringAnimation() {
  const [stiffness, setStiffness] = useState(100);
  const [damping, setDamping] = useState(10);
  const [mass, setMass] = useState(1);
  const [bounce, setBounce] = useState(false);

  return (
    <ExampleLayout
      title="Spring Animation"
      description="Create natural, physics-based animations with springs"
    >
      <div className="space-y-10">
        <div>
          <h2 className="text-xl font-semibold mb-4">Spring Physics</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Spring animations provide natural, physics-based motion. They&apos;re
            defined by stiffness (spring strength), damping (resistance), and
            mass.
          </p>

          <CodeBlock
            title="Spring Animation"
            code={`<motion.div
  animate={{ x: 100 }}
  transition={{
    type: "spring",
    stiffness: 100,  // Controls spring strength (higher = faster/stronger)
    damping: 10,     // Controls spring resistance (higher = less bounce)
    mass: 1,         // Controls weight/inertia (higher = more lethargic)
  }}
/>`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Spring Controls</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Adjust these parameters to see how they affect the spring physics.
            </p>

            <div className="space-y-6 p-6 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">
                    Stiffness: {stiffness}
                  </label>
                </div>
                <Slider
                  defaultValue={[stiffness]}
                  min={10}
                  max={1000}
                  step={10}
                  onValueChange={(value) => setStiffness(value[0])}
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Controls spring strength (higher = faster/stronger)
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">
                    Damping: {damping}
                  </label>
                </div>
                <Slider
                  defaultValue={[damping]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setDamping(value[0])}
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Controls spring resistance (higher = less bounce)
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Mass: {mass}</label>
                </div>
                <Slider
                  defaultValue={[mass]}
                  min={0.1}
                  max={5}
                  step={0.1}
                  onValueChange={(value) => setMass(value[0])}
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Controls weight/inertia (higher = more lethargic)
                </p>
              </div>

              <Button onClick={() => setBounce(!bounce)} className="w-full">
                Trigger Animation
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Animation Preview</h2>
            <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg h-[300px] flex items-center justify-center relative">
              <div className="w-full border-b border-dashed border-zinc-400 absolute left-0 right-0"></div>

              <motion.div
                className="bg-blue-500 w-20 h-20 rounded-full flex items-center justify-center text-white font-medium"
                animate={{ y: bounce ? 100 : -100 }}
                transition={{
                  type: "spring",
                  stiffness,
                  damping,
                  mass,
                  duration: undefined,
                }}
              >
                Ball
              </motion.div>
            </div>

            <div className="mt-6">
              <CodeBlock
                code={`<motion.div
  animate={{ y: ${bounce ? 100 : -100} }}
  transition={{
    type: "spring",
    stiffness: ${stiffness},
    damping: ${damping},
    mass: ${mass}
  }}
/>`}
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Preset Springs</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Motion provides preset springs for common use cases.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "Gentle",
                config: { type: "spring", bounce: 0.25 },
                color: "bg-teal-500",
              },
              {
                name: "Wobbly",
                config: { type: "spring", bounce: 0.8 },
                color: "bg-violet-500",
              },
              {
                name: "Stiff",
                config: { type: "spring", stiffness: 300, damping: 30 },
                color: "bg-orange-500",
              },
            ].map((preset, i) => (
              <div
                key={preset.name}
                className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg flex flex-col items-center"
              >
                <p className="text-sm font-medium mb-4">{preset.name}</p>
                <motion.div
                  className={`${preset.color} w-16 h-16 rounded-lg`}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 45 }}
                  transition={{
                    ...preset.config,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 0.5,
                    delay: i * 0.2,
                  }}
                />
                <div className="mt-4 w-full">
                  <CodeBlock
                    code={`transition={{
  type: "spring",
  ${Object.entries(preset.config)
    .filter(([key]) => key !== "type")
    .map(([key, value]) => `${key}: ${value}`)
    .join(",\n  ")}
}}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ExampleLayout>
  );
}
