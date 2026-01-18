import { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFinance, DateRange } from '../../../context/FinanceContext'; // Importing interface locally if not exported? I exported it in step 825.
import { AnimatePresence, motion } from 'framer-motion';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWithinInterval, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import clsx from 'clsx';

export function DateSelector() {
    const { dateRange, setDateRange } = useFinance();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [viewDate, setViewDate] = useState(new Date()); // Current month in view

    // Temporary selection state before confirming
    const [tempRange, setTempRange] = useState<DateRange>(dateRange);

    // Initial load: sync temp with context
    useEffect(() => {
        setTempRange(dateRange);
    }, [dateRange]);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
                // Confirm selection on close? Or Cancel? 
                // Prompt: "Quando o usuário confirma... (clicando fora ou em OK)".
                // So clicking outside confirms.
                handleConfirm();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, tempRange]);

    const handleConfirm = () => {
        setDateRange(tempRange);
        setIsOpen(false);
    };

    const handleDateClick = (date: Date) => {
        const dateStr = date.toISOString();

        // Logic: 
        // 1. If no start, set start.
        // 2. If start exists but no end, set end. (If clicked before start, swap).
        // 3. If both exist, reset and set start.

        if (!tempRange.startDate || (tempRange.startDate && tempRange.endDate)) {
            setTempRange({ startDate: dateStr, endDate: null });
        } else {
            // Has start, no end
            const start = new Date(tempRange.startDate);
            if (date < start) {
                setTempRange({ startDate: dateStr, endDate: tempRange.startDate });
            } else {
                setTempRange({ startDate: tempRange.startDate, endDate: dateStr });
            }
        }
    };

    // Quick Selectors
    const setQuickRange = (type: 'thisMonth' | 'lastMonth' | 'last3Months' | 'thisYear') => {
        const now = new Date();
        let start, end;

        switch (type) {
            case 'thisMonth':
                start = startOfMonth(now);
                end = endOfMonth(now);
                break;
            case 'lastMonth':
                const last = subMonths(now, 1);
                start = startOfMonth(last);
                end = endOfMonth(last);
                break;
            case 'last3Months':
                start = startOfMonth(subMonths(now, 2)); // Current + 2 prev
                end = endOfMonth(now);
                break;
            case 'thisYear':
                start = new Date(now.getFullYear(), 0, 1);
                end = new Date(now.getFullYear(), 11, 31);
                break;
        }
        setTempRange({ startDate: start.toISOString(), endDate: end.toISOString() });
    };

    // Render Calendar Helper
    const renderMonth = (monthDate: Date) => {
        const start = startOfMonth(monthDate);
        const end = endOfMonth(monthDate);
        const days = eachDayOfInterval({ start, end });
        const startDayOfWeek = start.getDay(); // 0 is Sunday

        // Empty slots
        const emptySlots = Array(startDayOfWeek).fill(null);

        return (
            <div className="w-[280px]">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-body-sm font-semibold text-neutral-1000 capitalize">
                        {format(monthDate, 'MMMM yyyy', { locale: ptBR })}
                    </span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                        <span key={i} className="text-label-xs text-neutral-400 font-medium">{d}</span>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {emptySlots.map((_, i) => <div key={`empty-${i}`} />)}
                    {days.map(day => {
                        const isStart = tempRange.startDate && isSameDay(day, new Date(tempRange.startDate));
                        const isEnd = tempRange.endDate && isSameDay(day, new Date(tempRange.endDate));
                        const isInRange = tempRange.startDate && tempRange.endDate &&
                            isWithinInterval(day, { start: new Date(tempRange.startDate), end: new Date(tempRange.endDate) });

                        return (
                            <button
                                key={day.toString()}
                                onClick={() => handleDateClick(day)}
                                className={clsx(
                                    "w-32 h-32 flex items-center justify-center rounded-full text-body-xs font-medium transition-all relative",
                                    (isStart || isEnd) ? "bg-neutral-1000 text-white z-10" :
                                        isInRange ? "bg-neutral-100 text-neutral-1000 rounded-none first:rounded-l-full last:rounded-r-full" :
                                            "text-neutral-700 hover:bg-neutral-100"
                                )}
                            >
                                {format(day, 'd')}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    const formatDateText = () => {
        if (!dateRange.startDate) return 'Selecione o período';
        const start = format(new Date(dateRange.startDate), 'dd MMM', { locale: ptBR });
        const end = dateRange.endDate ? format(new Date(dateRange.endDate), 'dd MMM yyyy', { locale: ptBR }) : '';
        return `${start} - ${end}`;
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    "h-[48px] px-24 flex items-center gap-3 rounded-full border transition-all truncate min-w-[200px]",
                    isOpen
                        ? "bg-neutral-1000 border-neutral-1000 text-white"
                        : "bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                )}
            >
                <CalendarIcon size={18} strokeWidth={1.5} />
                <span className="text-body-sm font-medium capitalize truncate">
                    {formatDateText()}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed md:absolute top-auto md:top-full left-0 md:left-auto right-0 md:right-0 mt-8 w-full md:w-auto bg-white/90 backdrop-blur-xl border border-neutral-200 rounded-t-32 md:rounded-32 shadow-2xl z-50 p-24 flex flex-col gap-6 origin-top"
                        style={{ maxWidth: '100vw' }} // Safety
                    >
                        {/* Calendar Header / Nav */}
                        <div className="flex items-center justify-between">
                            <button onClick={() => setViewDate(subMonths(viewDate, 1))} className="p-2 hover:bg-neutral-100 rounded-full"><ChevronLeft size={20} /></button>
                            <span className="md:hidden font-bold">{format(viewDate, 'MMMM yyyy', { locale: ptBR })}</span>
                            <div className="hidden md:flex gap-8">
                                {/* Desktop Side-by-Side: View Date & Next Month */}
                            </div>
                            <button onClick={() => setViewDate(addMonths(viewDate, 1))} className="p-2 hover:bg-neutral-100 rounded-full"><ChevronRight size={20} /></button>
                        </div>

                        {/* Calendars Container */}
                        <div className="flex flex-col md:flex-row gap-8 justify-center">
                            {renderMonth(viewDate)}
                            <div className="hidden md:block">
                                {renderMonth(addMonths(viewDate, 1))}
                            </div>
                        </div>

                        {/* Shortcuts */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-200">
                            <button onClick={() => setQuickRange('thisMonth')} className="px-12 py-6 rounded-full bg-neutral-100 text-label-xs font-semibold hover:bg-neutral-200">Este mês</button>
                            <button onClick={() => setQuickRange('lastMonth')} className="px-12 py-6 rounded-full bg-neutral-100 text-label-xs font-semibold hover:bg-neutral-200">Mês passado</button>
                            <button onClick={() => setQuickRange('last3Months')} className="px-12 py-6 rounded-full bg-neutral-100 text-label-xs font-semibold hover:bg-neutral-200">Últimos 3 meses</button>
                            <button onClick={() => setQuickRange('thisYear')} className="px-12 py-6 rounded-full bg-neutral-100 text-label-xs font-semibold hover:bg-neutral-200">Este ano</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
