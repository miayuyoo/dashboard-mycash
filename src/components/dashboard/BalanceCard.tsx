import { TrendingUp } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { AnimatedCounter } from '../ui/AnimatedCounter';

export function BalanceCard() {
    const { calculateTotalBalance } = useFinance();
    const balance = calculateTotalBalance();

    return (
        <div className="relative overflow-hidden bg-neutral-1000 rounded-32 p-32 flex flex-col justify-between h-[200px] lg:h-[240px] w-full lg:flex-[1.4]">
            {/* Decorative Blur Circle */}
            <div className="absolute -right-16 -top-32 w-128 h-128 bg-[#CCF300] rounded-full blur-[80px] opacity-20 pointer-events-none" />

            {/* Header */}
            <div className="relative z-10">
                <span className="text-neutral-400 font-medium text-body-sm">Saldo Total</span>
            </div>

            {/* Value */}
            <div className="relative z-10 mt-8 mb-auto">
                <h2 className="text-display-md lg:text-display-lg font-bold text-white tracking-tight">
                    <AnimatedCounter value={balance} />
                </h2>
            </div>

            {/* Growth Badge */}
            <div className="relative z-10 flex items-center">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-12 py-6 border border-white/5">
                    <div className="w-20 h-20 rounded-full bg-[#CCF300] flex items-center justify-center shrink-0">
                        <TrendingUp size={12} className="text-neutral-1000" />
                    </div>
                    <span className="text-body-xs font-semibold text-white">
                        +12% <span className="text-neutral-400 font-normal">esse mês</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
