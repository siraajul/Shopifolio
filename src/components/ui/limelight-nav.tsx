import React, { useState, useRef, useLayoutEffect, cloneElement, useEffect } from 'react';

// --- Internal Types and Defaults ---

const DefaultHomeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>;
const DefaultCompassIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" /></svg>;
const DefaultBellIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>;

export type NavItem = {
  id: string | number;
  icon: React.ReactElement;
  label?: string;
  onClick?: () => void;
};

const defaultNavItems: NavItem[] = [
  { id: 'default-home', icon: <DefaultHomeIcon />, label: 'Home' },
  { id: 'default-explore', icon: <DefaultCompassIcon />, label: 'Explore' },
  { id: 'default-notifications', icon: <DefaultBellIcon />, label: 'Notifications' },
];

type LimelightNavProps = {
  items?: NavItem[];
  defaultActiveIndex?: number;
  activeIndex?: number; // Added to support controlled state
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

/**
 * An adaptive-width navigation bar with a "limelight" effect that highlights the active item.
 */
export const LimelightNav = ({
  items = defaultNavItems,
  defaultActiveIndex = 0,
  activeIndex: controlledActiveIndex,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
}: LimelightNavProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  // Sync with controlled prop if provided
  useEffect(() => {
    if (controlledActiveIndex !== undefined) {
      setActiveIndex(controlledActiveIndex);
    }
  }, [controlledActiveIndex]);

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    
    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) {
    return null; 
  }

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    if (controlledActiveIndex === undefined) {
      setActiveIndex(index);
    }
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav className={`relative inline-flex items-center h-16 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md border border-neutral-200 dark:border-white/10 px-2 shadow-lg max-w-[95vw] overflow-x-auto no-scrollbar ${className}`}>
      {items.map(({ id, icon, label, onClick }, index) => (
          <a
            key={id}
            ref={el => {navItemRefs.current[index] = el}}
            className={`relative z-20 flex h-full cursor-pointer items-center justify-center p-3 sm:p-5 ${iconContainerClassName}`}
            onClick={() => handleItemClick(index, onClick)}
            aria-label={label}
          >
            {cloneElement(icon as React.ReactElement<any>, {
              className: `w-5 h-5 sm:w-6 sm:h-6 transition-opacity duration-300 ease-in-out ${
                activeIndex === index ? 'opacity-100 text-foreground' : 'opacity-50 hover:opacity-100 text-muted-foreground'
              } ${(icon.props as any).className || ''} ${iconClassName || ''}`,
            })}
          </a>
      ))}

      <div 
        ref={limelightRef}
        className={`absolute top-0 z-10 w-12 h-[4px] rounded-full bg-primary shadow-[0_50px_15px_var(--primary)] ${
          isReady ? 'transition-[left] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]' : ''
        } ${limelightClassName}`}
        style={{ left: '-999px' }}
      >
        <div className="absolute left-[-30%] top-[5px] w-[160%] h-12 [clip-path:polygon(15%_100%,35%_0,65%_0,85%_100%)] bg-gradient-to-b from-primary/30 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};
