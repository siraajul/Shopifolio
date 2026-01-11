"use client"

import { motion, MotionProps } from "framer-motion"
import { ComponentType, ElementType, forwardRef, RefObject } from "react"

interface TimelineContentProps extends MotionProps {
  as?: ElementType
  animationNum?: number
  timelineRef?: RefObject<any> // Relaxed type to avoid invariance issues
  customVariants?: any
  children?: React.ReactNode
  className?: string
  href?: string
  target?: string
  rel?: string
}

export const TimelineContent = forwardRef<HTMLElement, TimelineContentProps>(
  ({ as: Component = "div", children, animationNum, timelineRef, customVariants, ...props }, ref) => {
    // For now, we'll just render the component with motion to allow variants to be passed without error.
    // In a real implementation, this would likely use the timelineRef to trigger animations.
    
    const MotionComponent = motion.create(Component as any)

    return (
      <MotionComponent
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={customVariants}
        custom={animationNum}
        {...props}
      >
        {children}
      </MotionComponent>
    )
  }
)

TimelineContent.displayName = "TimelineContent"
