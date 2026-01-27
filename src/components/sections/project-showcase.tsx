"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useTransform, useSpring, useMotionValue, useScroll } from "motion/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface SanityProject {
    _id: string;
    title: string;
    image: any;
    link: string;
    industry?: string;
}

interface FlipCardProps {
    project: SanityProject;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

// --- FlipCard Component ---
const IMG_WIDTH = 60;  // Reduced from 100
const IMG_HEIGHT = 85; // Reduced from 140

function FlipCard({
    project,
    index,
    total,
    phase,
    target,
}: FlipCardProps) {
    const imageUrl = project.image ? urlFor(project.image).width(300).url() : "";

    return (
        <motion.div
            // Smoothly animate to the coordinates defined by the parent
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
            }}

            // Initial style
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d", // Essential for the 3D hover effect
                perspective: "1000px",
                zIndex: 10 + index, // Ensure visible stacking
            }}
            className="cursor-pointer group"
        >
            <Link href={project.link || "#"} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180, scale: 1.2, zIndex: 100 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-md shadow-lg bg-gray-200"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {imageUrl && (
                         <Image
                            src={imageUrl}
                            alt={project.title || "Project"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100px, 150px"
                        />
                    )}
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-md shadow-lg bg-gray-900 flex flex-col items-center justify-center p-2 border border-gray-700"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[6px] font-bold text-blue-400 uppercase tracking-widest mb-0.5">Visit</p>
                        <p className="text-[8px] font-medium text-white line-clamp-2 leading-tight">{project.title}</p>
                    </div>
                </div>
            </motion.div>
            </Link>
        </motion.div>
    );
}

// --- Main Hero Component ---
// const TOTAL_IMAGES = 20; // We'll use the fetched length or a minimum
const MIN_IMAGES = 15; // Minimum to look good, we can loop data if needed

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function ProjectShowcase() {
    const [projects, setProjects] = useState<SanityProject[]>([]);
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);

    // --- Fetch Sanity Data ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch projects with valid images
                const query = `*[_type == "showcaseProject" && defined(image)][0...30] {
                    _id,
                    title,
                    image,
                    link,
                    industry
                }`;
                const result = await client.fetch(query);
                
                // If we don't have enough projects, duplicate them to fill the showcase
                let data = result || [];
                if (data.length > 0 && data.length < MIN_IMAGES) {
                    while (data.length < MIN_IMAGES) {
                        data = [...data, ...result];
                    }
                }
                // Limit to 30 max to prevent performance kills
                setProjects(data.slice(0, 30));
            } catch (err) {
                console.error("Failed to fetch projects:", err);
            }
        };
        fetchData();
    }, []);

    const TOTAL_IMAGES = projects.length;

    // --- Container Size (Measure the sticky viewport, not the scroll track) ---
    useEffect(() => {
        if (!stickyRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(stickyRef.current);

        // Initial set
        setContainerSize({
            width: stickyRef.current.offsetWidth,
            height: stickyRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    // --- Native Scroll Logic (replaced wheel hijacking) ---
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll progress (0-1) to our previous virtual units (0-3000)
    // This preserves the existing animation logic
    const virtualScroll = useTransform(scrollYProgress, [0, 1], [0, 3000]);

    // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
    // Happens between scroll 0 and 600 (first 20% of section)
    const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    // 2. Scroll Rotation (Shuffling): Starts after morph (e.g., > 600)
    // Rotates the bottom arc as user continues scrolling
    const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        // We'll attach this to window now since the container is sticky
        const handleMouseMove = (e: MouseEvent) => {
            if (!stickyRef.current) return;
            const rect = stickyRef.current.getBoundingClientRect();
            // Only strictly needed when in view, but simple enough:
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // --- Intro Sequence ---
    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    // --- Random Scatter Positions ---
    const scatterPositions = useMemo(() => {
        // We need enough positions for the max possible items, or generate efficiently
        // Safest is to generate for current length or a large number
        const count = Math.max(TOTAL_IMAGES, 30); 
        return Array.from({ length: count }).map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, [TOTAL_IMAGES]);

    // --- Render Loop (Manual Calculation for Morph) ---
    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    // --- Content Opacity ---
    // Fade in content when arc is formed (morphValue > 0.8)
    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    if (TOTAL_IMAGES === 0) return null; // Or loading state

    return (
        // Height 400vh to allow enough scroll space for the animation
        <div ref={containerRef} className="relative w-full h-[400vh]">
            {/* Sticky Container for visual content */}
            <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center perspective-1000 py-10">

                {/* Intro Text (Fades out) */}
                <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
                    <motion.h1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 dark:text-white"
                    >
                        Selected Work
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-4 text-xs font-bold tracking-[0.2em] text-gray-500"
                    >
                        SCROLL TO EXPLORE
                    </motion.p>
                </div>

                {/* Arc Active Content (Fades in) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[15%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
                        Curated Work
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                        A curated collection of high-performance Shopify stores. <br className="hidden md:block" />
                        Explore the revenue-generating designs.
                    </p>
                </motion.div>

                {/* Main Container */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {projects.map((project, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        
                        // Use scatterPositions based on index, wrapped safely just in case
                        const scatterPos = scatterPositions[i % scatterPositions.length];

                        // 1. Intro Phases (Scatter -> Line)
                        if (introPhase === "scatter") {
                            target = scatterPos;
                        } else if (introPhase === "line") {
                            const lineSpacing = 70; // Adjusted for smaller images (60px width + 10px gap)
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else {
                            // 2. Circle Phase & Morph Logic

                            // Responsive Calculations
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            // A. Calculate Circle Position
                            const circleRadius = Math.min(minDimension * 0.35, 350);

                            const circleAngle = (i / TOTAL_IMAGES) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            // B. Calculate Bottom Arc Position
                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);

                            // Position:
                            const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                            const arcCenterY = arcApexY + arcRadius;

                            // Spread angle:
                            const spreadAngle = isMobile ? 100 : 130;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / Math.max(TOTAL_IMAGES - 1, 1);

                            // Apply Scroll Rotation
                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.8; 
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.4 : 1.8, 
                            };

                            // C. Interpolate (Morph)
                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={`${project._id}-${i}`}
                                project={project}
                                index={i}
                                total={TOTAL_IMAGES}
                                phase={introPhase} // Pass intro phase for initial animations
                                target={target}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
