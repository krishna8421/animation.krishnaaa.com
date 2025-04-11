"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExampleLayout from "@/components/layout/ExampleLayout";
import CodeBlock from "@/components/ui/CodeBlock";

export default function KeyframesAnimation() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0);

  const restartAnimation = () => {
    setIsPlaying(false);
    setTimeout(() => {
      setKey((prev) => prev + 1);
      setIsPlaying(true);
    }, 10);
  };

  return (
    <ExampleLayout
      title="Keyframes"
      description="Learn how to create complex animations with keyframes"
    >
      <div className="space-y-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">What are Keyframes?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Keyframes allow you to define an animation sequence with multiple
            steps. In Motion, you can define keyframes as arrays for any
            animatable value.
          </p>

          <CodeBlock
            title="Keyframes Syntax"
            code={`<motion.div
  animate={{
    x: [0, 100, 0],               // Move right then back
    backgroundColor: ["#ff0088", "#00ff00", "#0000ff", "#ff0088"],
    scale: [1, 2, 2, 1],          // Scale up and down
    rotate: [0, 0, 270, 270, 0],  // Rotate and unrotate
    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
  }}
  transition={{ duration: 2, times: [0, 0.25, 0.5, 0.85, 1] }}
/>`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Basic Keyframes</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              This example shows a simple keyframe animation that changes
              position, color, and size.
            </p>

            <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-lg h-[300px] flex items-center justify-center relative">
              {isPlaying && (
                <motion.div
                  key={`basic-${key}`}
                  className="w-20 h-20 rounded-lg bg-pink-500"
                  animate={{
                    x: [0, 100, 0, -100, 0],
                    backgroundColor: [
                      "#ec4899",
                      "#8b5cf6",
                      "#06b6d4",
                      "#ec4899",
                    ],
                    scale: [1, 1.5, 1, 0.5, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                />
              )}

              <div className="absolute bottom-4 right-4 flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </Button>
                <Button size="sm" variant="outline" onClick={restartAnimation}>
                  <RefreshCw size={16} />
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <CodeBlock
                code={`<motion.div
  className="w-20 h-20 rounded-lg bg-pink-500"
  animate={{
    x: [0, 100, 0, -100, 0],
    backgroundColor: ["#ec4899", "#8b5cf6", "#06b6d4", "#ec4899"],
    scale: [1, 1.5, 1, 0.5, 1]
  }}
  transition={{ 
    duration: 4,
    repeat: Infinity,
    repeatDelay: 0.5
  }}
/>`}
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Controlling Keyframe Timing
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              You can control precisely when each keyframe happens using the{" "}
              <code className="px-1 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded">
                times
              </code>{" "}
              array.
            </p>

            <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-lg h-[300px] flex items-center justify-center relative">
              {isPlaying && (
                <motion.div
                  key={`timing-${key}`}
                  className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white"
                  animate={{
                    y: [0, -100, 100, 0],
                    scale: [1, 0.5, 0.5, 1],
                    opacity: [1, 0.5, 0.5, 1],
                    backgroundColor: [
                      "#3b82f6",
                      "#3b82f6",
                      "#ef4444",
                      "#3b82f6",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    times: [0, 0.3, 0.7, 1], // Custom timing for keyframes
                    repeat: Infinity,
                  }}
                >
                  <span className="text-xs font-medium">
                    times: [0, 0.3, 0.7, 1]
                  </span>
                </motion.div>
              )}

              <div className="absolute bottom-4 right-4 flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </Button>
                <Button size="sm" variant="outline" onClick={restartAnimation}>
                  <RefreshCw size={16} />
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <CodeBlock
                code={`<motion.div
  animate={{
    y: [0, -100, 100, 0],
    scale: [1, 0.5, 0.5, 1],
    opacity: [1, 0.5, 0.5, 1],
    backgroundColor: ["#3b82f6", "#3b82f6", "#ef4444", "#3b82f6"]
  }}
  transition={{ 
    duration: 4,
    times: [0, 0.3, 0.7, 1], // Custom timing for keyframes
    repeat: Infinity
  }}
/>`}
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Advanced Keyframe Animation
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            This example combines multiple properties with custom timing to
            create a complex animation.
          </p>

          <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-lg h-[300px] flex items-center justify-center">
            <div className="relative w-full max-w-md h-full flex items-center justify-center">
              {isPlaying && (
                <>
                  <motion.div
                    key={`advanced-${key}`}
                    className="absolute w-24 h-24 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg"
                    animate={{
                      rotate: [0, 180, 180, 0],
                      scale: [1, 1.5, 1.5, 1, 1],
                      x: [0, 120, -120, 0],
                      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                    }}
                    transition={{
                      duration: 6,
                      times: [0, 0.3, 0.7, 1],
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                  />

                  {/* Multiple objects with staggered animations */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={`particle-${i}-${key}`}
                      className="absolute w-4 h-4 rounded-full bg-amber-400"
                      initial={{ x: 0, y: 0, opacity: 0 }}
                      animate={{
                        x: [0, Math.cos((i * Math.PI) / 2) * 150],
                        y: [0, Math.sin((i * Math.PI) / 2) * 150],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        times: [0, 0.5, 1],
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </>
              )}

              <div className="absolute bottom-4 right-4 flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </Button>
                <Button size="sm" variant="outline" onClick={restartAnimation}>
                  <RefreshCw size={16} />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeBlock
              code={`// Main element
<motion.div
  animate={{
    rotate: [0, 180, 180, 0],
    scale: [1, 1.5, 1.5, 1, 1],
    x: [0, 120, -120, 0],
    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
  }}
  transition={{
    duration: 6,
    times: [0, 0.3, 0.7, 1],
    repeat: Infinity,
    repeatDelay: 0.5,
  }}
/>

// Multiple particles with staggered animations
{[...Array(4)].map((_, i) => (
  <motion.div
    key={i}
    animate={{
      x: [0, Math.cos(i * Math.PI / 2) * 150],
      y: [0, Math.sin(i * Math.PI / 2) * 150],
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5]
    }}
    transition={{
      duration: 3,
      times: [0, 0.5, 1],
      repeat: Infinity,
      delay: i * 0.2,
    }}
  />
))}`}
            />
          </div>
        </div>
      </div>
    </ExampleLayout>
  );
}
