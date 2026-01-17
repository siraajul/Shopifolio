"use client";
import React from "react";
import { motion } from "motion/react";

interface Testimonial {
  text: string;
  image?: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow duration-300 w-full" key={i}>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">"{text}"</p>
                  <div className="flex items-center gap-3">
                    {image ? (
                        <img
                        width={40}
                        height={40}
                        src={image}
                        alt={name}
                        className="h-12 w-12 rounded-full object-cover border-2 border-gray-100 dark:border-gray-800"
                        />
                    ) : (
                        <div className="h-12 w-12 rounded-full border-2 border-gray-100 dark:border-gray-800 bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                             {name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                        </div>
                    )}
                    <div className="flex flex-col">
                      <div className="font-semibold text-gray-900 dark:text-white leading-tight">{name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 leading-tight mt-0.5">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
