"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExampleLayout from "@/components/layout/example-layout";
import CodeBlock from "@/components/ui/code-block";

export default function LayoutAnimations() {
  return (
    <ExampleLayout
      title="Layout Animations"
      description="Animate layout changes with smooth transitions"
    >
      <div className="space-y-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Understanding Layout Animations
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Motion can automatically animate elements when their layout changes,
            creating smooth transitions between different states. This is
            achieved using the{" "}
            <code className="px-1 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded">
              layout
            </code>{" "}
            prop.
          </p>

          <CodeBlock
            title="Basic Layout Animation"
            code={`<motion.div
  layout
  className={isOpen ? "w-full" : "w-32"}
>
  I'll animate my size automatically
</motion.div>`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Simple Layout Animation
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Elements with the{" "}
              <code className="px-1 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded">
                layout
              </code>{" "}
              prop will animate smoothly when their size or position changes.
            </p>

            <SimpleLayoutExample />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Grid Layout Animation
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Layout animations can work with complex arrangements like grids,
              automatically animating items as they reflow.
            </p>

            <GridLayoutExample />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Layout Animation with Shared Layouts
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Use{" "}
              <code className="px-1 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded">
                layoutId
              </code>{" "}
              to create animations between different components that share an
              identity.
            </p>

            <SharedLayoutExample />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Layout Groups</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              <code className="px-1 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded">
                LayoutGroup
              </code>{" "}
              helps coordinate layout animations between related components.
            </p>

            <LayoutGroupExample />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Complex Layout Transitions
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Combine layout animations with appearance and exit animations for
            more complex transitions.
          </p>

          <Tabs defaultValue="list">
            <TabsList className="mb-6">
              <TabsTrigger value="list">List Example</TabsTrigger>
              <TabsTrigger value="card">Card Example</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <ListLayoutExample />
            </TabsContent>

            <TabsContent value="card">
              <CardLayoutExample />
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <CodeBlock
              code={`// Combining layout, presence and transition props
<AnimatePresence>
  {items.map(item => (
    <motion.div
      key={item.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        opacity: { duration: 0.3 },
        layout: { type: "spring", stiffness: 300, damping: 30 }
      }}
    >
      {item.content}
    </motion.div>
  ))}
</AnimatePresence>`}
            />
          </div>
        </div>
      </div>
    </ExampleLayout>
  );
}

// Simple Layout Example Component
const SimpleLayoutExample = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg space-y-4">
      <motion.div
        layout
        className={`bg-blue-500 rounded-lg p-4 text-white ${
          isExpanded ? "w-full" : "w-32"
        }`}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <p>{isExpanded ? "I am expanded!" : "Expand me"}</p>
      </motion.div>

      <Button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Shrink" : "Expand"}
      </Button>

      <div className="mt-6">
        <CodeBlock
          code={`const [isExpanded, setIsExpanded] = useState(false);

<motion.div
  layout
  className={\`bg-blue-500 rounded-lg p-4 \${isExpanded ? 'w-full' : 'w-32'}\`}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
>
  <p>{isExpanded ? 'I am expanded!' : 'Expand me'}</p>
</motion.div>`}
        />
      </div>
    </div>
  );
};

// Grid Layout Example Component
const GridLayoutExample = () => {
  const initialItems = [
    { id: 1, color: "bg-red-500" },
    { id: 2, color: "bg-blue-500" },
    { id: 3, color: "bg-green-500" },
    { id: 4, color: "bg-yellow-500" },
    { id: 5, color: "bg-purple-500" },
    { id: 6, color: "bg-pink-500" },
  ];

  const [items, setItems] = useState(initialItems);

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const addItem = () => {
    if (items.length < initialItems.length) {
      const missingItems = initialItems.filter(
        (initialItem) => !items.some((item) => item.id === initialItem.id)
      );
      setItems([...items, missingItems[0]]);
    }
  };

  const shuffleItems = () => {
    setItems([...items].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg space-y-4">
      <div className="grid grid-cols-3 gap-2 min-h-[200px]">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              layout
              key={item.id}
              className={`${item.color} rounded-lg aspect-square flex items-center justify-center text-white font-medium cursor-pointer`}
              onClick={() => removeItem(item.id)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              {item.id}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex gap-2">
        <Button onClick={shuffleItems} variant="outline">
          Shuffle
        </Button>
        <Button
          onClick={addItem}
          disabled={items.length >= initialItems.length}
        >
          Add Item
        </Button>
      </div>

      <div className="mt-6">
        <CodeBlock
          code={`<div className="grid grid-cols-3 gap-2">
  <AnimatePresence>
    {items.map((item) => (
      <motion.div
        layout
        key={item.id}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ type: "spring", damping: 15 }}
      >
        {item.id}
      </motion.div>
    ))}
  </AnimatePresence>
</div>`}
        />
      </div>
    </div>
  );
};

// Shared Layout Example Component
const SharedLayoutExample = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const items = [
    {
      id: 1,
      color: "bg-teal-500",
      title: "Card 1",
      content:
        "This is the content for Card 1. Click to expand and see more details about this item.",
    },
    {
      id: 2,
      color: "bg-indigo-500",
      title: "Card 2",
      content:
        "This is the content for Card 2. Click to expand and see more details about this item.",
    },
    {
      id: 3,
      color: "bg-amber-500",
      title: "Card 3",
      content:
        "This is the content for Card 3. Click to expand and see more details about this item.",
    },
  ];

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
      <div className="relative min-h-[300px]">
        <div className="grid grid-cols-3 gap-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-${item.id}`}
              className={`${item.color} rounded-lg cursor-pointer p-4 text-white`}
              onClick={() => setSelectedId(item.id)}
            >
              <motion.h3 layoutId={`title-${item.id}`} className="font-medium">
                {item.title}
              </motion.h3>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && (
            <motion.div
              layoutId={`card-${selectedId}`}
              className={`${
                items.find((item) => item.id === selectedId)?.color
              } absolute inset-0 rounded-lg z-10 p-6 flex flex-col`}
              onClick={() => setSelectedId(null)}
            >
              <motion.h3
                layoutId={`title-${selectedId}`}
                className="text-xl font-medium text-white mb-4"
              >
                {items.find((item) => item.id === selectedId)?.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white/90"
              >
                {items.find((item) => item.id === selectedId)?.content}
              </motion.p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-auto bg-white/20 text-white px-3 py-1 rounded-md self-end"
              >
                Close
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6">
        <CodeBlock
          code={`// Using layoutId to create shared element transitions
<div className="grid grid-cols-3 gap-4">
  {items.map(item => (
    <motion.div
      key={item.id}
      layoutId={\`card-\${item.id}\`}
      onClick={() => setSelectedId(item.id)}
    >
      <motion.h3 layoutId={\`title-\${item.id}\`}>
        {item.title}
      </motion.h3>
    </motion.div>
  ))}
</div>

<AnimatePresence>
  {selectedId && (
    <motion.div layoutId={\`card-\${selectedId}\`}>
      <motion.h3 layoutId={\`title-\${selectedId}\`}>
        {selectedItem.title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {selectedItem.content}
      </motion.p>
    </motion.div>
  )}
</AnimatePresence>`}
        />
      </div>
    </div>
  );
};

// Layout Group Example Component
const LayoutGroupExample = () => {
  const [selected, setSelected] = useState(0);

  const tabs = [
    { id: 0, label: "Account" },
    { id: 1, label: "Settings" },
    { id: 2, label: "Privacy" },
  ];

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
      <LayoutGroup id="tabs">
        <div className="flex border-b border-zinc-300 dark:border-zinc-700 mb-6">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`px-4 py-2 cursor-pointer relative ${
                selected === tab.id
                  ? "text-blue-500"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
              onClick={() => setSelected(tab.id)}
            >
              {tab.label}
              {selected === tab.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 bg-white dark:bg-zinc-900 rounded-md">
              {selected === 0 && (
                <p>Account preferences and settings go here.</p>
              )}
              {selected === 1 && (
                <p>App settings and configuration options go here.</p>
              )}
              {selected === 2 && (
                <p>Privacy controls and preferences go here.</p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>

      <div className="mt-6">
        <CodeBlock
          code={`<LayoutGroup id="tabs">
  <div className="flex border-b">
    {tabs.map(tab => (
      <div
        key={tab.id}
        onClick={() => setSelected(tab.id)}
      >
        {tab.label}
        {selected === tab.id && (
          <motion.div
            layoutId="underline"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
          />
        )}
      </div>
    ))}
  </div>
  
  <AnimatePresence mode="wait">
    <motion.div
      key={selected}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {/* Content for selected tab */}
    </motion.div>
  </AnimatePresence>
</LayoutGroup>`}
        />
      </div>
    </div>
  );
};

// List Layout Example Component
const ListLayoutExample = () => {
  const initialItems = [
    { id: 1, text: "Learn Motion animations", completed: false },
    { id: 2, text: "Master layout animations", completed: false },
    { id: 3, text: "Create beautiful transitions", completed: false },
    { id: 4, text: "Build an animation library", completed: false },
  ];

  const [items, setItems] = useState(initialItems);

  const toggleItem = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const addItem = () => {
    const newId = Math.max(0, ...items.map((item) => item.id)) + 1;
    const newItem = {
      id: newId,
      text: `New task ${newId}`,
      completed: false,
    };
    setItems([...items, newItem]);
  };

  const filterCompleted = () => {
    setItems(items.filter((item) => !item.completed));
  };

  const resetItems = () => {
    setItems(initialItems);
  };

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg space-y-4">
      <div className="min-h-[250px]">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ opacity: { duration: 0.2 } }}
              className="bg-white dark:bg-zinc-900 p-4 rounded-md mb-2 flex items-center"
            >
              <Switch
                checked={item.completed}
                onCheckedChange={() => toggleItem(item.id)}
                className="mr-3"
              />
              <span
                className={`flex-grow ${
                  item.completed ? "line-through text-zinc-400" : ""
                }`}
              >
                {item.text}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(item.id)}
                className="ml-2 text-zinc-400 hover:text-red-500"
              >
                Remove
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button onClick={addItem}>Add Task</Button>
        <Button variant="outline" onClick={filterCompleted}>
          Clear Completed
        </Button>
        <Button variant="outline" onClick={resetItems}>
          Reset
        </Button>
      </div>
    </div>
  );
};

// Card Layout Example Component
const CardLayoutExample = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [isListView, setIsListView] = useState(false);

  const cards = [
    {
      id: 1,
      title: "Introduction to Motion",
      color: "bg-gradient-to-br from-pink-500 to-rose-500",
    },
    {
      id: 2,
      title: "Animation Basics",
      color: "bg-gradient-to-br from-blue-500 to-indigo-500",
    },
    {
      id: 3,
      title: "Gesture Animations",
      color: "bg-gradient-to-br from-amber-500 to-orange-500",
    },
    {
      id: 4,
      title: "Timeline Sequences",
      color: "bg-gradient-to-br from-emerald-500 to-green-500",
    },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Animation Topics</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-500">List View</span>
            <Switch checked={isListView} onCheckedChange={setIsListView} />
          </div>
        </div>

        <div
          className={`${isListView ? "space-y-2" : "grid grid-cols-2 gap-4"}`}
        >
          <AnimatePresence>
            {cards.map((card) => (
              <motion.div
                key={card.id}
                layout
                onClick={() =>
                  setExpandedCard(expandedCard === card.id ? null : card.id)
                }
                className={`
                  ${card.color} rounded-lg overflow-hidden cursor-pointer
                  ${
                    isListView
                      ? "p-4 flex items-center"
                      : "p-6 aspect-[4/3] flex flex-col justify-between"
                  }
                  ${
                    expandedCard === card.id
                      ? "col-span-2 row-span-2 aspect-auto h-48"
                      : ""
                  }
                `}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <h4 className="font-medium text-white">{card.title}</h4>

                <AnimatePresence>
                  {expandedCard === card.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 text-white/90 text-sm"
                    >
                      <p>This is the expanded content for {card.title}.</p>
                      <p className="mt-2">Click again to collapse this card.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};
