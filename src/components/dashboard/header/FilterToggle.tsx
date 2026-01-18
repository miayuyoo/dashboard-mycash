import { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, ArrowUpRight, ArrowDownLeft, LayoutGrid } from 'lucide-react';
import { useFinance } from '../../../context/FinanceContext';
import { TransactionType } from '../../../types';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

export function FilterToggle() {
    const { transactionType, setTransactionType } = useFinance();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const options: { value: 'all' | TransactionType; label: string; icon: any }[] = [
        { value: 'all', label: 'Todos', icon: LayoutGrid },
        { value: 'income', label: 'Receitas', icon: ArrowDownLeft },
        { value: 'expense', label: 'Despesas', icon: ArrowUpRight },
    ];

    return (
        <div className="relative" ref={containerRef}>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    "w-[48px] h-[48px] flex items-center justify-center rounded-full border transition-all",
                    isOpen
                        ? "bg-neutral-1000 border-neutral-1000 text-white"
                        : "bg-white border-neutral-300 text-neutral-1000 hover:bg-neutral-100"
                )}
            >
                <SlidersHorizontal size={20} strokeWidth={1.5} />
            </button>

            {/* Desktop Popover */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-8 w-[240px] bg-white/80 backdrop-blur-xl border border-neutral-200 rounded-24 p-16 shadow-lg z-50 flex flex-col gap-4"
                    >
                        <div className="flex flex-col gap-2">
                            <span className="text-label-xs text-neutral-500 font-medium px-8">TIPO DE TRANSAÇÃO</span>
                            <div className="flex flex-col gap-1">
                                {options.map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => {
                                            setTransactionType(opt.value);
                                            setIsOpen(false);
                                        }}
                                        className={clsx(
                                            "flex items-center gap-3 px-12 py-8 rounded-16 transition-all text-body-sm font-medium",
                                            transactionType === opt.value
                                                ? "bg-neutral-1000 text-white"
                                                : "text-neutral-600 hover:bg-neutral-100"
                                        )}
                                    >
                                        <opt.icon size={16} />
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
