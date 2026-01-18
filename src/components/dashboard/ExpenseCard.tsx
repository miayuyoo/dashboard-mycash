import { ArrowUp } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { AnimatedCounter } from '../ui/AnimatedCounter';

export function ExpenseCard() {
    const { calculateExpensesForPeriod } = useFinance();
    const expenses = calculateExpensesForPeriod();

    return (
        <div className="flex flex-col w-full lg:flex-1 bg-white rounded-32 p-24 border border-neutral-200">
            {/* Icon */}
            <div className="w-40 h-40 flex items-center justify-center mb-40">
                <ArrowUp size={32} className="text-neutral-1000" strokeWidth={1.5} />
            </div>

            {/* Title */}
            <span className="text-neutral-500 font-medium text-label-sm mb-8">Despesas</span>

            {/* Value */}
            <div>
                <h2 className="text-heading-md font-bold text-neutral-1000 tracking-tight">
                    <AnimatedCounter value={expenses} />
                </h2>
            </div>
        </div>
    );
}
