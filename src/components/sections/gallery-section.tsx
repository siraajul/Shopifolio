"use client"

import { ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  GalleryCol,
  GalleryContainer } from "@/components/ui/animated-gallery"
import { Button } from "@/components/ui/button"
import { VideoIcon } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"

// Unsplash IDs extracted from the demo URLs (Fallback)
const IMAGES_1 = [
  "https://images.unsplash.com/photo-1529218402470-5dec8fea0761?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFkfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8MHwwfHx8Mg%3D%3D",
  "https://images.unsplash.com/photo-1604928141064-207cea6f571f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dG9reW98ZW58MHwwfDB8fHwy",
  "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dG9reW98ZW58MHwwfDB8fHwy",
]
const IMAGES_2 = [
  "https://images.unsplash.com/photo-1542052125323-e69ad37a47c2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHRva3lvfGVufDB8MHwwfHx8Mg%3D%3D",
  "https://images.unsplash.com/photo-1564284369929-026ba231f89b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1532236204992-f5e85c024202?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHRva3lvfGVufDB8MHwwfHx8Mg%3D%3D",
  "https://images.unsplash.com/photo-1493515322954-4fa727e97985?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRva3lvfGVufDB8MHwwfHx8Mg%3D%3D",
]
const IMAGES_3 = [
  "https://images.unsplash.com/photo-1528361237150-8a9a7df33035?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1493515322954-4fa727e97985?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8MHwwfHx8Mg%3D%3D",
  "https://images.unsplash.com/photo-1608875004752-2fdb6a39ba4c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

interface GallerySectionProps {
  data?: {
    images?: any[]
  }
}

export const GallerySection = ({ data }: GallerySectionProps) => {
  // Use Sanity images if available, otherwise fallback
  // Add Sanity CDN optimizations: auto format for WebP, resize width, crop fit, and quality
  const images = data?.images 
    ? data.images.map(img => urlFor(img).auto('format').fit('crop').width(800).quality(80).url()) 
    : [...IMAGES_1, ...IMAGES_2, ...IMAGES_3];
  
  // Split images into 3 columns
  const chunk1 = images.slice(0, Math.ceil(images.length / 3));
  const chunk2 = images.slice(Math.ceil(images.length / 3), Math.ceil(images.length * 2 / 3));
  const chunk3 = images.slice(Math.ceil(images.length * 2 / 3));

  // Determine if using fallback (for manual split logic if needed, but above slice works generally)
  const isFallback = !data?.images;
  const col1 = isFallback ? IMAGES_1 : chunk1;
  const col2 = isFallback ? IMAGES_2 : chunk2;
  const col3 = isFallback ? IMAGES_3 : chunk3;

  return (
    <div className="relative bg-transparent">
      <div className="pointer-events-none absolute z-10 h-[70vh] w-full "
      style={{
            background: "linear-gradient(to right, transparent, rgba(var(--primary-rgb), 0.1), transparent)",
            filter: "blur(84px)",
            mixBlendMode: "screen",
          }}
      />

      <ContainerScroll className="relative h-[300vh] sm:h-[350vh] z-0">
        <ContainerSticky className="h-screen flex items-center justify-center">
          <GalleryContainer className="max-w-7xl mx-auto px-4">
            <GalleryCol yRange={["-20%", "-5%"]} className="-mt-2">
              {col1.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-[4/5] block h-auto max-h-full w-full rounded-xl object-cover shadow-2xl border border-white/10"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </GalleryCol>
            <GalleryCol className="mt-[10%]" yRange={["-40%", "-15%"]}>
              {col2.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-[4/5] block h-auto max-h-full w-full rounded-xl object-cover shadow-2xl border border-white/10"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </GalleryCol>
            <GalleryCol yRange={["-20%", "-5%"]} className="-mt-2">
              {col3.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-[4/5] block h-auto max-h-full w-full rounded-xl object-cover shadow-2xl border border-white/10"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </GalleryCol>
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
    </div>
  )
}
