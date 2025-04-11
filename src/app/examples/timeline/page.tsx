"use client";

import React, { useState, useRef } from "react";
import { motion, useAnimationControls } from "motion/react";
import { Play, Pause, RefreshCw, FastForward, Rewind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import ExampleLayout from "@/components/layout/ExampleLayout";
import CodeBlock from "@/components/ui/CodeBlock";

export default function TimelineAnimation() {
  return (
    <ExampleLayout
      title="Timeline"
      description="Orchestrate complex animation sequences with timelines"
    >
      <div className="space-y-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Introduction to Timelines
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Motion's timeline feature allows you to sequence and orchestrate
            multiple animations with precise timing and control. Timelines are
            perfect for creating complex, coordinated animations that would be
            difficult to synchronize otherwise.
          </p>

          <CodeBlock
            title="Timeline API"
            code={`import { motion, useAnimationControls } from 'motion/react';

// Create animation controls
const controls = useAnimationControls();

// Define a timeline sequence
async function sequence() {
  await controls.start({ x: 100 });       // First step
  await controls.start({ y: 100 });       // Second step
  await controls.start({ rotate: 180 });  // Third step
  return controls.start({ scale: 2 });    // Final step
}

// Component with controlled animations
<motion.div animate={controls}>
  Animated element
</motion.div>

// Button to trigger the sequence
<button onClick={sequence}>Start</button>`}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Basic Timeline Sequence
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            This example demonstrates a simple animation sequence controlled by
            a timeline.
          </p>

          <BasicTimelineExample />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Interactive Timeline</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Control the playback of a timeline animation with buttons and a
              progress slider.
            </p>

            <InteractiveTimelineExample />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Orchestrated Animation
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Coordinate multiple elements in a complex animation sequence.
            </p>

            <OrchestrationExample />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Advanced Timeline Techniques
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Create a more complex animation with staggered elements, varied
            durations, and overlapping animations.
          </p>

          <AdvancedTimelineExample />

          <div className="mt-6">
            <CodeBlock
              code={`// Creating complex sequences with staggered animations
async function complexSequence() {
  // Start all elements with a staggered fade in
  await controls.start(i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3 }
  }));
  
  // Animate elements in parallel
  await Promise.all([
    controls.start("box1", { rotate: 180 }),
    controls.start("box2", { scale: 1.5 }),
    controls.start("box3", { x: 100 })
  ]);
  
  // Final sequential animation
  await controls.start(i => ({
    y: 100,
    transition: { 
      delay: i * 0.2,
      type: "spring" 
    }
  }));
}`}
            />
          </div>
        </div>
      </div>
    </ExampleLayout>
  );
}

// Basic Timeline Example Component
const BasicTimelineExample = () => {
  const controls = useAnimationControls();
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);

  const runSequence = async () => {
    setIsPlaying(true);
    setStep(1);

    // Step 1: Move right
    await controls.start({
      x: 100,
      transition: { duration: 1 },
    });
    setStep(2);

    // Step 2: Move down
    await controls.start({
      y: 100,
      transition: { duration: 1 },
    });
    setStep(3);

    // Step 3: Rotate
    await controls.start({
      rotate: 180,
      transition: { duration: 1 },
    });
    setStep(4);

    // Step 4: Scale up and change color
    await controls.start({
      scale: 1.5,
      backgroundColor: "#8b5cf6",
      transition: { duration: 1 },
    });
    setStep(5);

    // Step 5: Return to initial state
    await controls.start({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      backgroundColor: "#3b82f6",
      transition: { duration: 1.5 },
    });

    setStep(0);
    setIsPlaying(false);
  };

  const resetSequence = () => {
    controls.start({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      backgroundColor: "#3b82f6",
    });
    setStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-lg min-h-[350px]">
      <div className="flex flex-col items-center mb-8">
        <div className="relative h-[200px] w-full flex items-center justify-center">
          <motion.div
            animate={controls}
            initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
            className="w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center text-white font-medium"
          >
            Box
          </motion.div>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <Button
            onClick={runSequence}
            disabled={isPlaying}
            className="flex items-center gap-2"
          >
            <Play size={16} />
            Play Sequence
          </Button>

          <Button
            variant="outline"
            onClick={resetSequence}
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Reset
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium mb-1">Timeline steps:</div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full ${
                step >= s ? "bg-blue-500" : "bg-zinc-300 dark:bg-zinc-700"
              }`}
            />
          ))}
        </div>
        <div className="text-xs text-zinc-500 mt-2">
          {step === 0 && "Ready to play"}
          {step === 1 && "Step 1: Move right"}
          {step === 2 && "Step 2: Move down"}
          {step === 3 && "Step 3: Rotate"}
          {step === 4 && "Step 4: Scale up and change color"}
          {step === 5 && "Step 5: Return to initial state"}
        </div>
      </div>

      <div className="mt-6">
        <CodeBlock
          code={`const controls = useAnimationControls();

async function runSequence() {
  // Step 1: Move right
  await controls.start({ 
    x: 100,
    transition: { duration: 1 }
  });
  
  // Step 2: Move down
  await controls.start({ 
    y: 100,
    transition: { duration: 1 }
  });
  
  // Step 3: Rotate
  await controls.start({ 
    rotate: 180,
    transition: { duration: 1 }
  });
  
  // Step 4: Scale up and change color
  await controls.start({ 
    scale: 1.5, 
    backgroundColor: "#8b5cf6",
    transition: { duration: 1 }
  });
  
  // Step 5: Return to initial state
  await controls.start({ 
    x: 0, y: 0, rotate: 0, scale: 1, backgroundColor: "#3b82f6",
    transition: { duration: 1.5 }
  });
}`}
        />
      </div>
    </div>
  );
};

// Interactive Timeline Example Component
const InteractiveTimelineExample = () => {
  const controls = useAnimationControls();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<any>(null);

  const totalDuration = 5000; // 5 seconds

  const playAnimation = () => {
    if (isPlaying) return;

    setIsPlaying(true);
    const startTime = Date.now() - progress * totalDuration;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / totalDuration, 1);
      setProgress(newProgress);

      // Update animation based on progress
      updateAnimationAtProgress(newProgress);

      if (newProgress < 1) {
        animationRef.current = requestAnimationFrame(updateProgress);
      } else {
        setIsPlaying(false);
      }
    };

    animationRef.current = requestAnimationFrame(updateProgress);
  };

  const pauseAnimation = () => {
    if (!isPlaying) return;

    cancelAnimationFrame(animationRef.current);
    setIsPlaying(false);
  };

  const resetAnimation = () => {
    cancelAnimationFrame(animationRef.current);
    setIsPlaying(false);
    setProgress(0);
    updateAnimationAtProgress(0);
  };

  const setProgressManually = (newProgress: number[]) => {
    setProgress(newProgress[0]);
    updateAnimationAtProgress(newProgress[0]);
  };

  const skipForward = () => {
    const newProgress = Math.min(progress + 0.1, 1);
    setProgress(newProgress);
    updateAnimationAtProgress(newProgress);
  };

  const skipBackward = () => {
    const newProgress = Math.max(progress - 0.1, 0);
    setProgress(newProgress);
    updateAnimationAtProgress(newProgress);
  };

  const updateAnimationAtProgress = (p: number) => {
    // Phase 1 (0-0.2): Move right and rotate
    // Phase 2 (0.2-0.4): Scale up and change color
    // Phase 3 (0.4-0.6): Move to circle formation
    // Phase 4 (0.6-0.8): Pulse scale
    // Phase 5 (0.8-1.0): Return to start

    let x = 0,
      y = 0,
      rotate = 0,
      scale = 1,
      backgroundColor = "#3b82f6";

    if (p < 0.2) {
      // Phase 1: Linear interpolation for first 20%
      const phaseProgress = p / 0.2;
      x = 150 * phaseProgress;
      rotate = 180 * phaseProgress;
    } else if (p < 0.4) {
      // Phase 2: Already moved right and rotated, now scale and change color
      const phaseProgress = (p - 0.2) / 0.2;
      x = 150;
      rotate = 180;
      scale = 1 + 0.5 * phaseProgress;
      // Interpolate color from blue to purple
      const blue = Math.floor(59 + (92 - 59) * phaseProgress);
      const purple = Math.floor(130 + (207 - 130) * phaseProgress);
      backgroundColor = `rgb(59, ${blue}, ${purple})`;
    } else if (p < 0.6) {
      // Phase 3: Move to final position
      const phaseProgress = (p - 0.4) / 0.2;
      x = 150 - 150 * phaseProgress;
      y = 100 * phaseProgress;
      rotate = 180 + 180 * phaseProgress;
      scale = 1.5;
      backgroundColor = "#8b5cf6";
    } else if (p < 0.8) {
      // Phase 4: Pulse scale
      const phaseProgress = (p - 0.6) / 0.2;
      const pulseScale = Math.sin(phaseProgress * Math.PI * 2) * 0.25 + 1.25;
      y = 100;
      rotate = 360;
      scale = pulseScale;
      backgroundColor = "#8b5cf6";
    } else {
      // Phase 5: Return to start
      const phaseProgress = (p - 0.8) / 0.2;
      y = 100 - 100 * phaseProgress;
      rotate = 360 - 360 * phaseProgress;
      scale = 1.5 - 0.5 * phaseProgress;
      // Interpolate back to blue
      const blue = Math.floor(92 + (130 - 92) * phaseProgress);
      const purple = Math.floor(207 + (246 - 207) * phaseProgress);
      backgroundColor = `rgb(59, ${blue}, ${purple})`;
    }

    // Apply the calculated values
    controls.start({
      x,
      y,
      rotate,
      scale,
      backgroundColor,
      transition: { duration: 0 }, // immediate transition
    });
  };

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
      <div className="h-[200px] relative flex items-center justify-center">
        <motion.div
          animate={controls}
          initial={{
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            backgroundColor: "#3b82f6",
          }}
          className="w-20 h-20 rounded-lg flex items-center justify-center text-white font-medium"
        >
          {Math.round(progress * 100)}%
        </motion.div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              Progress: {Math.round(progress * 100)}%
            </span>
          </div>
          <Slider
            value={[progress]}
            min={0}
            max={1}
            step={0.001}
            onValueChange={setProgressManually}
          />
        </div>

        <div className="flex items-center justify-center space-x-2">
          <Button size="sm" variant="outline" onClick={skipBackward}>
            <Rewind size={16} />
          </Button>

          {isPlaying ? (
            <Button onClick={pauseAnimation}>
              <Pause size={16} className="mr-2" />
              Pause
            </Button>
          ) : (
            <Button onClick={playAnimation}>
              <Play size={16} className="mr-2" />
              Play
            </Button>
          )}

          <Button size="sm" variant="outline" onClick={resetAnimation}>
            <RefreshCw size={16} />
          </Button>

          <Button size="sm" variant="outline" onClick={skipForward}>
            <FastForward size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Orchestration Example Component
const OrchestrationExample = () => {
  const controls = useAnimationControls();
  const [isPlaying, setIsPlaying] = useState(false);

  const startSequence = async () => {
    if (isPlaying) return;
    setIsPlaying(true);

    // Step 1: Fade in elements one by one
    await controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }));

    // Step 2: Move boxes into circle formation
    await controls.start((i) => {
      const angle = (i * (2 * Math.PI)) / 6; // 6 boxes in a circle
      return {
        x: 80 * Math.cos(angle),
        y: 80 * Math.sin(angle),
        rotate: i * 60, // Rotate each box a bit
        transition: { duration: 0.8, type: "spring" },
      };
    });

    // Step 3: Rotate the entire formation
    await controls.start((i) => ({
      rotate: [i * 60, i * 60 + 360], // Full revolution
      transition: { duration: 2, ease: "linear" },
    }));

    // Step 4: Scale each box in sequence
    await controls.start((i) => ({
      scale: [1, 1.5, 1],
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        times: [0, 0.5, 1],
      },
    }));

    // Step 5: Return to starting positions
    await controls.start((i) => ({
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        type: "spring",
      },
    }));

    // Step 6: Fade out
    await controls.start({
      opacity: 0,
      y: 20,
      transition: { duration: 0.5 },
    });

    // Reset and prepare for next run
    controls.start({
      opacity: 0,
      y: 20,
      x: 0,
      rotate: 0,
      scale: 1,
    });

    setIsPlaying(false);
  };

  const colors = [
    "bg-red-500",
    "bg-amber-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
  ];

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
      <div className="h-[250px] relative flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          {colors.map((color, i) => (
            <motion.div
              key={i}
              custom={i}
              animate={controls}
              initial={{ opacity: 0, y: 20, x: 0, rotate: 0, scale: 1 }}
              className={`absolute w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white font-medium`}
            >
              {i + 1}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Button onClick={startSequence} disabled={isPlaying}>
          {isPlaying ? "Playing..." : "Play Sequence"}
        </Button>
      </div>
    </div>
  );
};

// Advanced Timeline Example Component
const AdvancedTimelineExample = () => {
  const controls = useAnimationControls();
  const [isPlaying, setIsPlaying] = useState(false);

  const runAdvancedSequence = async () => {
    if (isPlaying) return;
    setIsPlaying(true);

    // Reset state
    controls.start({
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0,
      rotate: 0,
    });

    // Phase 1: Initial staggered appearance
    await controls.start((i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }));

    // Phase 2: Split into two groups
    await Promise.all([
      // Left group
      controls.start((i) =>
        i < 3
          ? {
              x: -120,
              rotate: -15,
              transition: { duration: 0.5 },
            }
          : {}
      ),

      // Right group
      controls.start((i) =>
        i >= 3
          ? {
              x: 120,
              rotate: 15,
              transition: { duration: 0.5 },
            }
          : {}
      ),
    ]);

    // Phase 3: Merge back to center with bounce
    await controls.start((i) => ({
      x: 0,
      rotate: 0,
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.7,
        times: [0, 0.6, 1],
        type: "spring",
        stiffness: 200,
        delay: i * 0.05,
      },
    }));

    // Phase 4: Circle formation and rotation
    const circlePoints = 6;
    const radius = 100;

    await controls.start((i) => {
      const angle = (i * (2 * Math.PI)) / circlePoints;
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        transition: { duration: 0.5 },
      };
    });

    // Phase 5: Rotate as a formation
    await controls.start({
      rotate: 360,
      transition: {
        duration: 2,
        ease: "linear",
      },
    });

    // Phase 6: Final effect - burst outward and fade
    await controls.start((i) => {
      const angle = (i * (2 * Math.PI)) / circlePoints;
      return {
        x: radius * 2 * Math.cos(angle),
        y: radius * 2 * Math.sin(angle),
        opacity: 0,
        scale: 0,
        transition: {
          duration: 0.8,
          ease: [0.25, 1, 0.5, 1], // Custom easing
        },
      };
    });

    setIsPlaying(false);
  };

  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-green-500",
    "bg-teal-500",
    "bg-blue-500",
  ];

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
      <div className="h-[400px] relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          {colors.map((color, i) => (
            <motion.div
              key={i}
              custom={i}
              animate={controls}
              initial={{ opacity: 0, y: 0, x: 0, rotate: 0, scale: 0 }}
              className={`absolute w-16 h-16 ${color} rounded-lg shadow-lg flex items-center justify-center text-white font-medium`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          onClick={runAdvancedSequence}
          disabled={isPlaying}
          className="px-6"
        >
          {isPlaying ? "Playing Animation..." : "Play Advanced Sequence"}
        </Button>
      </div>
    </div>
  );
};
