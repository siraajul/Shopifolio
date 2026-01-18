"use client"

import React from "react"
import NextImage from "next/image"

import { cn } from "@/lib/utils"

interface AvatarCirclesProps {
  className?: string
  numPeople?: number
  avatarUrls: string[]
  onMoreClick?: () => void
}

const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
  onMoreClick,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <NextImage
          key={index}
          className="rounded-full border-2 border-white dark:border-gray-800 object-cover"
          src={url}
          width={40}
          height={40}
          priority
          alt={`Avatar ${index + 1}`}
        />
      ))}
      {numPeople && (
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black cursor-pointer"
          onClick={onMoreClick}
        >
          +{numPeople}
        </button>
      )}
    </div>
  )
}

export { AvatarCircles }
