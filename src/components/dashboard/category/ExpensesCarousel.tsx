import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFinance } from '../../../context/FinanceContext';
import { CategoryDonutCard } from './CategoryDonutCard';
import clsx from 'clsx';
import { COLORS } from '../../../utils/colors';

const PALETTE = [
    COLORS.brand[600], // Lime
    COLORS.neutral[1000], // Black
    COLORS.neutral[500], // Gray
    '#E5E7EB', // Gray-300
    COLORS.neutral[200], // Gray-200
    '#D1D5DB', // Gray-400
];

export function ExpensesByCategoryCarousel() {
    const { calculateExpensesByCategory, calculateCategoryPercentage } = useFinance();
    const categories = calculateExpensesByCategory();

    // Ref for the scrolling container
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [isHovering, setIsHovering] = useState(false);

    // Scroll Handler to toggle arrows
    const checkScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftArrow(scrollLeft > 0);
        // Tolerance of 1px
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [categories]); // Re-check if data changes

    // Navigation Logic
    const scrollByAmount = (amount: number) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    // Mouse Drag Logic
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeftStart, setScrollLeftStart] = useState(0);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeftStart(scrollContainerRef.current.scrollLeft);
        scrollContainerRef.current.style.cursor = 'grabbing';
    };

    const onMouseLeave = () => {
        setIsDragging(false);
        if (scrollContainerRef.current) scrollContainerRef.current.style.cursor = 'grab';
        setIsHovering(false);
    };

    const onMouseUp = () => {
        setIsDragging(false);
        if (scrollContainerRef.current) scrollContainerRef.current.style.cursor = 'grab';
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Scroll speed multiplier
        scrollContainerRef.current.scrollLeft = scrollLeftStart - walk;
    };

    // Wheel Horizontal Scroll
    const onWheel = (e: React.WheelEvent) => {
        if (scrollContainerRef.current) {
            // If deltaX provided (touchpad), use it. If only vertical wheel (mouse), map Y to X.
            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            scrollContainerRef.current.scrollLeft += delta;
        }
    };

    if (categories.length === 0) {
        return null; // Don't render empty state or render placeholder? User asked for carousel. 
        // If empty, maybe hide it? Or show "No expenses"? 
        // I'll keep previous behavior but clean.
    }

    return (
        <div
            className="relative w-full group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={onMouseLeave}
        >
            {/* Nav Arrows (Desktop Only, Hover Only) */}
            <div className={clsx(
                "hidden md:flex absolute inset-y-0 left-0 items-center pl-4 z-20 transition-opacity duration-300",
                showLeftArrow && isHovering ? "opacity-100" : "opacity-0 pointer-events-none"
            )}>
                <button
                    onClick={() => scrollByAmount(-200)}
                    className="w-40 h-40 bg-white rounded-full shadow-lg border border-neutral-100 flex items-center justify-center text-neutral-1000 hover:scale-110 transition-transform"
                >
                    <ChevronLeft size={20} />
                </button>
            </div>

            <div className={clsx(
                "hidden md:flex absolute inset-y-0 right-0 items-center pr-4 z-20 transition-opacity duration-300",
                showRightArrow && isHovering ? "opacity-100" : "opacity-0 pointer-events-none"
            )}>
                <button
                    onClick={() => scrollByAmount(200)}
                    className="w-40 h-40 bg-white rounded-full shadow-lg border border-neutral-100 flex items-center justify-center text-neutral-1000 hover:scale-110 transition-transform"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Gradient Masks */}
            <div className={clsx("absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-neutral-100 to-transparent z-10 pointer-events-none transition-opacity", showLeftArrow ? "opacity-100" : "opacity-0")} />
            <div className={clsx("absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-neutral-100 to-transparent z-10 pointer-events-none transition-opacity", showRightArrow ? "opacity-100" : "opacity-0")} />

            {/* Carousel Container */}
            <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto overflow-y-hidden pb-4 pt-1 px-1 no-scrollbar cursor-grab active:cursor-grabbing select-none"
                onScroll={checkScroll}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                onWheel={onWheel}
            >
                {categories.map((cat, index) => (
                    <CategoryDonutCard
                        key={cat.category}
                        name={cat.category}
                        value={cat.amount}
                        percentage={calculateCategoryPercentage(cat.category)}
                        color={PALETTE[index % PALETTE.length]}
                    />
                ))}
            </div>
        </div>
    );
}
