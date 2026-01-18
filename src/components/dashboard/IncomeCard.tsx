import { ArrowDown } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { AnimatedCounter } from '../ui/AnimatedCounter';

export function IncomeCard() {
    const { calculateIncomeForPeriod } = useFinance();
    const income = calculateIncomeForPeriod();

    return (
        <div className="flex flex-col justify-between h-[160px] lg:h-[180px] w-full lg:flex-1 bg-white rounded-32 p-32 border border-neutral-200">
            {/* Header / Icon */}
            <div className="flex flex-col gap-4">
                <div className="w-40 h-40 flex items-center justify-center">
                    <ArrowDown size={32} className="text-neutral-1000" strokeWidth={1.5} />
                </div>
                <span className="text-neutral-1000 font-medium text-body-md">Receitas</span>
            </div>

            {/* Value */}
            <div className="mt-auto">
                <h2 className="text-display-xs lg:text-heading-xl font-bold text-neutral-1000 tracking-tight">
                    <AnimatedCounter value={income} />
                </h2>
            </div>
        </div>
    );
}
