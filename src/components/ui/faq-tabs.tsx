"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  categories: Record<string, string>;
  faqData: Record<string, FAQItemProps[]>;
  className?: string;
}

export const FAQ = ({ 
  title = "FAQs",
  subtitle = "Frequently Asked Questions",
  categories,
  faqData,
  className,
}: FAQProps) => {
  const categoryKeys = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);

  return (
    <section 
      className={cn(
        "relative overflow-hidden bg-background px-4 py-20 text-foreground",
        className
      )}
    >
      <FAQHeader title={title} subtitle={subtitle} />
      <FAQTabs 
        categories={categories}
        selected={selectedCategory} 
        setSelected={setSelectedCategory} 
      />
      <FAQList 
        faqData={faqData}
        selected={selectedCategory} 
      />
    </section>
  );
};

const FAQHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="relative z-10 flex flex-col items-center justify-center text-center">
    <span className="mb-4 inline-block rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
      {subtitle}
    </span>
    <h2 className="mb-12 text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h2>
  </div>
);

const FAQTabs = ({ 
  categories, 
  selected, 
  setSelected 
}: { 
  categories: Record<string, string>; 
  selected: string; 
  setSelected: (key: string) => void;
}) => (
  <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
    {Object.entries(categories).map(([key, label]) => (
      <button
        key={key}
        onClick={() => setSelected(key)}
        className={cn(
          "relative overflow-hidden whitespace-nowrap rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-300",
          selected === key
            ? "border-black dark:border-white text-white dark:text-black"
            : "border-gray-200 dark:border-gray-800 bg-transparent text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700"
        )}
      >
        <span className="relative z-10">{label}</span>
        {selected === key && (
          <motion.span
            layoutId="activeTab"
            className="absolute inset-0 z-0 bg-black dark:bg-white"
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </button>
    ))}
  </div>
);

const FAQList = ({ faqData, selected }: { faqData: Record<string, FAQItemProps[]>; selected: string }) => (
  <div className="mx-auto mt-12 max-w-3xl">
    <AnimatePresence mode="wait">
      <motion.div
        key={selected}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {faqData[selected]?.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </motion.div>
    </AnimatePresence>
  </div>
);

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      className={cn(
        "rounded-2xl border border-gray-100 dark:border-gray-800 transition-all duration-300 overflow-hidden",
        isOpen ? "bg-gray-50 dark:bg-zinc-900 ring-1 ring-gray-200 dark:ring-gray-700" : "bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-zinc-900/50"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
      >
        <span
          className={cn(
            "text-lg font-medium transition-colors pr-8",
            isOpen ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"
          )}
        >
          {question}
        </span>
        <motion.span
          variants={{
            open: { rotate: 45 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <Plus
            className={cn(
              "h-5 w-5 transition-colors",
              isOpen ? "text-gray-900 dark:text-white" : "text-gray-400"
            )}
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed text-base">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
};
