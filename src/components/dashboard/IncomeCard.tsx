import { ArrowDownLeft } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { AnimatedCounter } from '../ui/AnimatedCounter';

export function IncomeCard() {
    const { calculateIncomeForPeriod } = useFinance();
    const income = calculateIncomeForPeriod();

    return (
        <div className="bg-white rounded-32 p-32 flex flex-col justify-between h-[200px] lg:h-[240px] w-full lg:flex-1 border border-neutral-200">
            {/* Header */}
            <div className="flex items-start justify-between">
                <span className="text-neutral-1000 font-bold text-body-lg">Receitas</span>
                <div className="w-40 h-40 rounded-full bg-neutral-100 flex items-center justify-center">
                    <ArrowDownLeft size={20} className="text-neutral-600" />
                </div>
            </div>

            {/* Value */}
            <div className="mt-auto">
                <h2 className="text-display-sm font-bold text-neutral-1000 tracking-tight">
                    <AnimatedCounter value={income} />
                </h2>
                <span className="text-body-xs text-neutral-500 mt-4 block">
                    No período selecionado
                </span>
            </div>
        </div>
    );
}
