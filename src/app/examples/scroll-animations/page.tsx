"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "motion/react";
import ExampleLayout from "@/components/layout/ExampleLayout";
import CodeBlock from "@/components/ui/CodeBlock";

export default function ScrollAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Create a spring-based progress
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
  });

  // Transform the scroll progress into different ranges
  const scale = useTransform(springProgress, [0, 1], [0.6, 1]);
  const rotate = useTransform(springProgress, [0, 1], [0, 360]);
  const opacity = useTransform(springProgress, [0, 0.5, 1], [0, 1, 1]);
  const x = useTransform(springProgress, [0, 1], [-100, 100]);

  return (
    <ExampleLayout
      title="Scroll Animations"
      description="Learn how to create animations based on scroll position"
    >
      <div className="space-y-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Scroll-Linked Animations
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Motion lets you create animations that are directly linked to scroll
            position, creating smooth, synchronized effects as users scroll.
          </p>

          <div
            ref={containerRef}
            className="h-[500px] bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden relative p-8"
          >
            <div className="sticky top-1/3 flex justify-center items-center">
              <motion.div
                className="w-32 h-32 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium"
                style={{
                  scale,
                  rotate,
                  opacity,
                  x,
                }}
              >
                Scroll Effect
              </motion.div>
            </div>

            {/* Visual indicators for progress */}
            <div className="absolute left-4 right-4 bottom-4 h-4 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                style={{ scaleX: springProgress, transformOrigin: "left" }}
              />
            </div>

            <div className="absolute right-4 top-4 text-xs font-mono bg-white dark:bg-zinc-900 px-2 py-1 rounded-md">
              <motion.div>{springProgress.get().toFixed(2)}</motion.div>
            </div>
          </div>

          <div className="mt-6">
            <CodeBlock
              code={`// Setup scroll tracking
const containerRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start end", "end end"]
});

// Create a spring-based progress for smoother animation
const springProgress = useSpring(scrollYProgress, { 
  stiffness: 200, 
  damping: 30 
});

// Map the 0-1 progress to different ranges
const scale = useTransform(springProgress, [0, 1], [0.6, 1]);
const rotate = useTransform(springProgress, [0, 1], [0, 360]);
const opacity = useTransform(springProgress, [0, 0.5, 1], [0, 1, 1]);
const x = useTransform(springProgress, [0, 1], [-100, 100]);

// Add scrolling container
<div ref={containerRef} className="h-[500px]">
  <motion.div style={{ scale, rotate, opacity, x }}>
    Scroll Effect
  </motion.div>
</div>`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Scroll Into View</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Trigger animations when elements enter the viewport using the{" "}
              <code className="px-1 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded">
                useInView
              </code>{" "}
              hook.
            </p>

            <ScrollInViewExample />

            <div className="mt-6">
              <CodeBlock
                code={`const ref = useRef(null);
const isInView = useInView(ref, { once: false });

<div ref={ref}>
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
    transition={{ duration: 0.5 }}
  >
    I'll animate when in view
  </motion.div>
</div>`}
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Parallax Effect</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Create depth with parallax scrolling, where elements move at
              different speeds as you scroll.
            </p>

            <ParallaxExample />

            <div className="mt-6">
              <CodeBlock
                code={`const { scrollY } = useScroll();

const y1 = useTransform(scrollY, [0, 500], [0, -150]);
const y2 = useTransform(scrollY, [0, 500], [0, -50]);
const y3 = useTransform(scrollY, [0, 500], [0, -200]);

<div className="relative h-[300px] overflow-hidden">
  <motion.div style={{ y: y1 }} className="absolute">
    Slow layer
  </motion.div>
  <motion.div style={{ y: y2 }} className="absolute">
    Medium layer
  </motion.div>
  <motion.div style={{ y: y3 }} className="absolute">
    Fast layer
  </motion.div>
</div>`}
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Advanced Scroll Techniques
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Combine scroll-linked animations with other Motion features to
            create more complex effects.
          </p>

          <div className="h-[600px] overflow-y-auto bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
            <div className="min-h-[1200px] flex flex-col space-y-[200px] pt-[100px] items-center">
              {[...Array(4)].map((_, i) => (
                <AdvancedScrollItem key={i} index={i} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <CodeBlock
              code={`const AdvancedScrollItem = ({ index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const { scrollYProgress } = useScroll({ target: ref });
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]);
  
  return (
    <motion.div 
      ref={ref} 
      style={{ scale, opacity, rotate }}
      animate={isInView ? { x: 0 } : { x: -100 }}
      transition={{ duration: 0.5 }}
    >
      Scroll item {index}
    </motion.div>
  );
};`}
            />
          </div>
        </div>
      </div>
    </ExampleLayout>
  );
}

// Scroll In View Example Component
const ScrollInViewExample = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <div className="h-[300px] bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6 overflow-y-auto flex flex-col space-y-20">
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        Scroll down to see animation
      </div>

      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-[120px]"></div>
      ))}

      <div ref={ref} className="bg-zinc-200 dark:bg-zinc-700 p-6 rounded-lg">
        <motion.div
          className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-2">I animate when in view</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            This element animates whenever it enters the viewport.
          </p>
        </motion.div>
      </div>

      {[...Array(2)].map((_, i) => (
        <div key={i} className="h-[120px]"></div>
      ))}
    </div>
  );
};

// Parallax Example Component
const ParallaxExample = () => {
  const { scrollY } = useScroll();
  const ref = useRef(null);

  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const y3 = useTransform(scrollY, [0, 500], [0, -200]);

  return (
    <div
      ref={ref}
      className="h-[300px] bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden relative"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ y: y1 }}
          className="absolute w-full h-full flex items-center justify-center"
        >
          <div className="absolute w-full h-full bg-blue-500 opacity-10" />
          <div className="relative text-lg font-bold text-zinc-600 dark:text-zinc-300">
            Background Layer
          </div>
        </motion.div>

        <motion.div
          style={{ y: y2 }}
          className="absolute w-64 h-64 flex items-center justify-center"
        >
          <div className="absolute w-full h-full bg-purple-500 opacity-20 rounded-full" />
          <div className="relative text-lg font-bold text-zinc-700 dark:text-zinc-200">
            Middle Layer
          </div>
        </motion.div>

        <motion.div
          style={{ y: y3 }}
          className="absolute w-32 h-32 flex items-center justify-center"
        >
          <div className="absolute w-full h-full bg-amber-500 opacity-30 rounded-lg" />
          <div className="relative text-lg font-bold text-zinc-800 dark:text-white">
            Foreground
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-zinc-500">
        Scroll the page to see parallax effect
      </div>
    </div>
  );
};

// Advanced Scroll Item Component
const AdvancedScrollItem = ({ index }: { index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const { scrollYProgress } = useScroll({ target: ref });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]);
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    index % 2 === 0 ? ["#818cf8", "#ec4899"] : ["#8b5cf6", "#f59e0b"]
  );

  return (
    <motion.div
      ref={ref}
      className="w-4/5 h-[200px] rounded-xl flex items-center justify-center relative overflow-hidden"
      style={{ scale, opacity, rotate, backgroundColor }}
      animate={isInView ? { x: 0 } : { x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold text-white">Scroll Item {index + 1}</h3>
    </motion.div>
  );
};
