"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  animate,
  useAnimationControls,
} from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ExampleLayout from "@/components/layout/example-layout";
import CodeBlock from "@/components/ui/code-block";

export default function AdvancedTechniques() {
  return (
    <ExampleLayout
      title="Advanced Techniques"
      description="Explore advanced animation techniques and concepts"
    >
      <div className="space-y-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Combining Animation Techniques
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Creating advanced animations often involves combining multiple
            techniques like gesture animations, scroll-linked effects, and
            complex transitions. This page showcases some advanced examples.
          </p>
        </div>

        <Tabs defaultValue="motion-values">
          <TabsList className="mb-6">
            <TabsTrigger value="motion-values">Motion Values</TabsTrigger>
            <TabsTrigger value="svg-animation">SVG Animation</TabsTrigger>
            <TabsTrigger value="3d-effects">3D Effects</TabsTrigger>
            <TabsTrigger value="particles">Particle System</TabsTrigger>
          </TabsList>

          <TabsContent value="motion-values">
            <MotionValuesExample />
          </TabsContent>

          <TabsContent value="svg-animation">
            <SVGAnimationExample />
          </TabsContent>

          <TabsContent value="3d-effects">
            <ThreeDEffectsExample />
          </TabsContent>

          <TabsContent value="particles">
            <ParticleSystemExample />
          </TabsContent>
        </Tabs>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Creating Reusable Animation Components
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            For complex applications, it&apos;s helpful to create reusable animation
            components. Here are some examples of how to structure these
            components.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Animated Counter</CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatedCounter />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reveal Text</CardTitle>
              </CardHeader>
              <CardContent>
                <RevealText />
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <CodeBlock
              title="Creating a reusable animation component"
              code={`// Example of a reusable animated counter component
function AnimatedCounter({ from = 0, to, duration = 2 }) {
  const nodeRef = useRef(null);
  const count = useMotionValue(from);
  
  useEffect(() => {
    const controls = animate(count, to, { duration });
    
    count.on("change", v => {
      if (nodeRef.current) {
        nodeRef.current.textContent = Math.round(v);
      }
    });
    
    return controls.stop;
  }, [count, to, duration]);
  
  return <span ref={nodeRef} />;
}`}
            />
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Animation Performance Tips
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Performance is crucial for smooth animations. Here are some tips for
            optimizing your Motion animations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Use Hardware Acceleration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Animate properties that can be hardware accelerated, such as{" "}
                    <code>transform</code> and <code>opacity</code>, instead of
                    properties like <code>width</code>, <code>height</code>, or{" "}
                    <code>margin</code>.
                  </p>

                  <PerformanceComparisonExample />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reduce Rerenders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Use <code>useMotionValue</code> and{" "}
                    <code>useTransform</code> to create animations that update
                    without triggering React rerenders.
                  </p>

                  <MotionValuePerformanceExample />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ExampleLayout>
  );
}

// Motion Values Example Component
const MotionValuesExample = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useTransform(x, [-100, 0, 100], [0.5, 1, 1.5]);
  const rotate = useTransform(y, [-100, 0, 100], [-45, 0, 45]);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ff008c", "#7700ff", "#00c3ff"]
  );
  const color = useTransform(
    y,
    [-100, 0, 100],
    ["#00c3ff", "#ffffff", "#ff008c"]
  );

  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">
          Interactive Motion Values
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Motion values let you create animations that respond to user input
          without triggering React rerenders. Move your mouse over the box below
          to see how motion values can transform multiple properties
          simultaneously.
        </p>
      </div>

      <div
        className="h-[300px] flex items-center justify-center"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{
            x,
            y,
            scale,
            rotate,
            background,
            color,
          }}
          className="w-40 h-40 rounded-lg flex items-center justify-center font-medium"
        >
          Move mouse here
        </motion.div>
      </div>

      <div className="mt-6">
        <CodeBlock
          code={`const x = useMotionValue(0);
const y = useMotionValue(0);
const scale = useTransform(x, [-100, 0, 100], [0.5, 1, 1.5]);
const rotate = useTransform(y, [-100, 0, 100], [-45, 0, 45]);
const background = useTransform(
  x,
  [-100, 0, 100],
  ["#ff008c", "#7700ff", "#00c3ff"]
);

<motion.div
  style={{ x, y, scale, rotate, background }}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
>
  Move mouse here
</motion.div>`}
        />
      </div>
    </div>
  );
};

// SVG Animation Example Component
const SVGAnimationExample = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimationControls();

  useEffect(() => {
    if (isAnimating) {
      controls.start({
        pathLength: [0, 1],
        transition: { duration: 2, ease: "easeInOut" },
      });
    } else {
      controls.start({
        pathLength: 0,
        transition: { duration: 0.5 },
      });
    }
  }, [isAnimating, controls]);

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">SVG Path Animation</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Motion can animate SVG properties like <code>pathLength</code>,{" "}
          <code>pathOffset</code>, and <code>pathSpacing</code> to create path
          drawing animations.
        </p>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <svg width="200" height="200" viewBox="0 0 100 100">
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="#3b82f6"
            strokeWidth="2"
            fill="transparent"
            initial={{ pathLength: 0 }}
            animate={controls}
          />
          <motion.path
            d="M 20,50 L 40,70 L 80,30"
            stroke="#10b981"
            strokeWidth="3"
            fill="transparent"
            initial={{ pathLength: 0 }}
            animate={controls}
          />
        </svg>

        <Button onClick={() => setIsAnimating(!isAnimating)}>
          {isAnimating ? "Reset Animation" : "Animate Path"}
        </Button>
      </div>

      <div className="mt-6">
        <CodeBlock
          code={`// SVG path animation
<motion.path
  d="M 20,50 L 40,70 L 80,30"
  stroke="#10b981"
  strokeWidth="3"
  fill="transparent"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 2, ease: "easeInOut" }}
/>`}
        />
      </div>
    </div>
  );
};

// 3D Effects Example Component
const ThreeDEffectsExample = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newRotateY = ((event.clientX - centerX) / rect.width) * 20;
    const newRotateX = ((event.clientY - centerY) / rect.height) * -20;

    setRotateX(newRotateX);
    setRotateY(newRotateY);
  }

  function handleMouseLeave() {
    setRotateX(0);
    setRotateY(0);
  }

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">3D Transform Effects</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Create 3D effects by combining perspective with rotateX and rotateY
          transforms. Hover over the card to see the effect.
        </p>
      </div>

      <div className="flex justify-center p-6">
        <div
          style={{ perspective: 1000 }}
          className="w-full max-w-md"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              z: 100,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 shadow-xl h-60 flex items-center justify-center text-white"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">3D Card Effect</h3>
              <p>Hover and move mouse to see the 3D effect</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-6">
        <CodeBlock
          code={`// Setting up perspective container
<div style={{ perspective: 1000 }}>
  <motion.div
    style={{
      rotateX: rotateXValue,
      rotateY: rotateYValue,
      z: 100
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    Card content here
  </motion.div>
</div>

// Mouse move handler
function handleMouseMove(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const newRotateY = ((event.clientX - centerX) / rect.width) * 20;
  const newRotateX = ((event.clientY - centerY) / rect.height) * -20;
  
  setRotateX(newRotateX);
  setRotateY(newRotateY);
}`}
        />
      </div>
    </div>
  );
};

// Particle System Example Component
const ParticleSystemExample = () => {
  const controls = useAnimationControls();
  const [isPlaying, setIsPlaying] = useState(false);

  const particleCount = 20;

  const handleButtonClick = () => {
    if (!isPlaying) {
      setIsPlaying(true);

      controls
        .start(() => ({
          x: [0, Math.random() * 300 - 150],
          y: [0, Math.random() * 300 - 150],
          scale: [1, Math.random() * 0.5 + 0.5],
          opacity: [1, 0],
          transition: {
            duration: Math.random() * 1 + 1,
            ease: "easeOut",
            times: [0, 1],
            repeat: 3,
            repeatType: "loop",
          },
        }))
        .then(() => {
          setIsPlaying(false);
        });
    } else {
      controls.stop();
      controls.set({ x: 0, y: 0, opacity: 0 });
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Particle System</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Create a simple particle system using Motion. Multiple particles can
          be animated independently using the <code>custom</code> prop to
          differentiate behaviors.
        </p>
      </div>

      <div className="h-[300px] relative flex justify-center items-center">
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: particleCount }).map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              animate={controls}
              initial={{ x: 0, y: 0, opacity: 0 }}
              className="absolute w-4 h-4 rounded-full"
              style={{
                backgroundColor: `hsl(${(i / particleCount) * 360}, 80%, 60%)`,
              }}
            />
          ))}
        </div>

        <Button size="lg" onClick={handleButtonClick} className="z-10">
          {isPlaying ? "Stop" : "Emit Particles"}
        </Button>
      </div>

      <div className="mt-6">
        <CodeBlock
          code={`// Particle system with staggered animations
const controls = useAnimationControls();

// Create array of particles
{Array.from({ length: 20 }).map((_, i) => (
  <motion.div
    key={i}
    custom={i}
    animate={controls}
    initial={{ x: 0, y: 0, opacity: 0 }}
    style={{ backgroundColor: \`hsl(\${(i / 20) * 360}, 80%, 60%)\` }}
  />
))}

// Animate particles
controls.start(i => ({
  x: [0, Math.random() * 300 - 150],
  y: [0, Math.random() * 300 - 150],
  scale: [1, Math.random() * 0.5 + 0.5],
  opacity: [1, 0],
  transition: {
    duration: Math.random() * 1 + 1,
    ease: "easeOut",
    repeat: 3,
    repeatType: "loop"
  }
}))`}
        />
      </div>
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const animation = animate(count, target, {
      duration: 1,
      onUpdate: (latest) => {
        if (countRef.current) {
          countRef.current.textContent = Math.round(latest).toString();
        }
      },
    });

    return animation.stop;
  }, [count, target]);

  const incrementBy = (value: number) => {
    setCount(target);
    setTarget(target + value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <div className="text-5xl font-bold">
          <span ref={countRef}>0</span>
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        <Button size="sm" variant="outline" onClick={() => incrementBy(10)}>
          +10
        </Button>
        <Button size="sm" variant="outline" onClick={() => incrementBy(50)}>
          +50
        </Button>
        <Button size="sm" variant="outline" onClick={() => incrementBy(100)}>
          +100
        </Button>
      </div>

      <div className="text-sm text-zinc-600 dark:text-zinc-400 pt-4">
        <p>
          This counter animates between values using Motion&apos;s{" "}
          <code>animate</code> function directly.
        </p>
      </div>
    </div>
  );
};

// Reveal Text Component
const RevealText = () => {
  const text = "Motion animations can make your UI feel alive and engaging.";
  const controls = useAnimationControls();
  const [hasPlayed, setHasPlayed] = useState(false);

  const handlePlay = async () => {
    await controls.start("hidden");
    controls.start("visible");
    setHasPlayed(true);
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 20 },
    },
  };

  return (
    <div className="space-y-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate={controls}
        className="min-h-[100px] bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg"
      >
        {text.split(" ").map((word, i) => (
          <motion.span key={i} variants={item} className="inline-block mr-1">
            {word}
          </motion.span>
        ))}
      </motion.div>

      <Button onClick={handlePlay} disabled={hasPlayed}>
        {hasPlayed ? "Text Revealed" : "Reveal Text"}
      </Button>

      <div className="text-sm text-zinc-600 dark:text-zinc-400 pt-2">
        <p>
          This component uses Motion&apos;s variants and staggered animations to
          reveal text word by word.
        </p>
      </div>
    </div>
  );
};

// Performance Comparison Example
const PerformanceComparisonExample = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-center mb-2 font-medium">
            Using transform (efficient)
          </div>
          <div className="h-24 bg-zinc-200 dark:bg-zinc-700 rounded-lg relative overflow-hidden">
            <motion.div
              className="absolute top-2 left-2 w-8 h-8 bg-green-500 rounded-md"
              animate={{
                x: isAnimating ? "calc(100% - 40px)" : 0,
              }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div>
          <div className="text-xs text-center mb-2 font-medium">
            Using left (less efficient)
          </div>
          <div className="h-24 bg-zinc-200 dark:bg-zinc-700 rounded-lg relative overflow-hidden">
            <motion.div
              className="absolute top-2 left-2 w-8 h-8 bg-red-500 rounded-md"
              animate={{
                left: isAnimating ? "calc(100% - 40px)" : "8px",
              }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </div>

      <Button onClick={() => setIsAnimating(!isAnimating)} className="w-full">
        Toggle Animation
      </Button>
    </div>
  );
};

// Motion Value Performance Example
const MotionValuePerformanceExample = () => {
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const scale = useTransform(springX, [-100, 0, 100], [0.8, 1, 1.2]);
  const rotate = useTransform(springX, [-100, 0, 100], [-45, 0, 45]);
  const opacity = useTransform(
    springX,
    [-100, -50, 0, 50, 100],
    [0.5, 0.8, 1, 0.8, 0.5]
  );

  const moveDot = (direction: number) => {
    x.set(direction * 100);
    setTimeout(() => x.set(0), 1000);
  };

  return (
    <div className="space-y-4">
      <div className="h-32 flex items-center justify-center">
        <motion.div
          className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold"
          style={{ x: springX, scale, rotate, opacity }}
        >
          Dot
        </motion.div>
      </div>

      <div className="flex space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => moveDot(-1)}
          className="flex-1"
        >
          Left
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => moveDot(1)}
          className="flex-1"
        >
          Right
        </Button>
      </div>

      <div className="text-xs text-zinc-600 dark:text-zinc-400">
        <p>
          Using motion values for direct DOM updates without React rerenders.
        </p>
      </div>
    </div>
  );
};
