import { ArrowDown } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { AnimatedCounter } from '../ui/AnimatedCounter';

export function IncomeCard() {
    const { calculateIncomeForPeriod } = useFinance();
    const income = calculateIncomeForPeriod();

    return (
        <div className="flex flex-col w-full lg:flex-1 bg-white rounded-32 p-24 border border-neutral-200">
            {/* Icon */}
            <div className="w-40 h-40 flex items-center justify-center mb-40">
                <ArrowDown size={32} className="text-neutral-1000" strokeWidth={1.5} />
            </div>

            {/* Title */}
            <span className="text-neutral-1000 font-medium text-label-sm mb-8">Receitas</span>

            {/* Value */}
            <div>
                <h2 className="text-heading-md font-bold text-neutral-1000 tracking-tight">
                    <AnimatedCounter value={income} />
                </h2>
            </div>
        </div>
    );
}
