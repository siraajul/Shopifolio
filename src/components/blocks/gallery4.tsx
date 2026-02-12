"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { urlFor } from "@/sanity/lib/image";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: any;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
  viewAllHref?: string;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

const GalleryCard = ({ item }: { item: Gallery4Item }) => {
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    useEffect(() => {
        if (!item.image) {
            setImgSrc(FALLBACK_IMAGE);
        } else if (typeof item.image === 'string') {
            setImgSrc(item.image);
        } else {
             try {
                // @ts-ignore
                setImgSrc(urlFor(item.image).width(800).height(600).url());
             } catch (e) {
                setImgSrc(FALLBACK_IMAGE);
             }
        }
    }, [item.image]);

    return (
        <Link href={item.href} className="group flex flex-col h-[28rem] md:h-[32rem]">
            <div className="relative flex-grow flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.3)]">
            
            {/* Image Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/5 flex-shrink-0">
                {imgSrc && (
                    <Image
                    src={imgSrc}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() => setImgSrc(FALLBACK_IMAGE)}
                    unoptimized={imgSrc === FALLBACK_IMAGE}
                />
                )}
                {!imgSrc && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            </div>

            {/* Content */}
            <div className="relative p-6 flex flex-col flex-grow justify-between items-start -mt-12 z-10">
                <div className="w-full">
                <div className="inline-flex items-center rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs font-medium text-primary backdrop-blur-md mb-3">
                    Case Study
                </div>
                <h3 className="mb-2 text-2xl font-bold text-white font-display leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed mb-6">
                    {item.description}
                </p>
                </div>
                
                <div className="flex items-center text-sm font-medium text-primary mt-auto">
                Read Case Study{" "}
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
            </div>
        </Link>
    );
};

const Gallery4 = ({
  title = "Case Studies",
  description = "Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences. These case studies showcase real-world applications and success stories.",
  items = [],
  viewAllHref,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ... (rest of Gallery4)
  
  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    updateSelection();
    
    carouselApi.on("select", updateSelection);
    carouselApi.on("reInit", updateSelection);
    carouselApi.on("scroll", updateSelection); // Sometimes needed for instant state updates

    return () => {
      carouselApi.off("select", updateSelection);
      carouselApi.off("reInit", updateSelection);
      carouselApi.off("scroll", updateSelection);
    };
  }, [carouselApi]);

  if (!items || items.length === 0) {
      return null;
  }

  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
        {/* Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto relative z-10 px-4 md:px-6">
        <div className="mb-8 flex items-end justify-between md:mb-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-foreground">
              {title}
            </h2>
            <p className="max-w-lg text-muted-foreground text-lg leading-relaxed">{description}</p>
          </div>
          <div className="hidden shrink-0 gap-3 md:flex">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary disabled:opacity-30"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary disabled:opacity-30"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full relative z-10">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
            loop: true,
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="-ml-4 pb-4 pl-4 md:pl-[max(2rem,calc((100vw-1200px)/2))] items-stretch">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[32%] h-full"
              >
                <GalleryCard item={item} />
              </CarouselItem>
            ))}
            {viewAllHref && (
              <CarouselItem className="pl-4 basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[32%] h-full">
                <Link href={viewAllHref} className="group flex flex-col h-[28rem] md:h-[32rem]">
                    <div className="relative flex-grow flex flex-col items-center justify-center text-center overflow-hidden rounded-2xl border border-dashed border-white/10 bg-white/5 p-12 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                         <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-500">
                             <ArrowRight className="h-8 w-8" />
                         </div>
                         <h3 className="text-2xl font-bold text-white font-display mb-2 group-hover:text-primary transition-colors">
                            View All Case Studies
                         </h3>
                         <p className="text-muted-foreground text-sm max-w-[200px]">
                            Explore our full portfolio of projects and success stories.
                         </p>
                    </div>
                </Link>
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
         
         {/* Custom Pagination/Dots if needed, for now standard layout is cleaner without them or can add later */}
      </div>
    </section>
  );
};

export { Gallery4 };
