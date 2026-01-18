import { Gem } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { AnimatedCounter } from '../ui/AnimatedCounter';

export function BalanceCard() {
    const { calculateTotalBalance } = useFinance();
    const balance = calculateTotalBalance();

    return (
        <div className="flex flex-col w-full h-full bg-white rounded-32 p-24 border border-neutral-200">
            {/* Icon */}
            <div className="w-40 h-40 flex items-center justify-center mb-40">
                <Gem size={32} className="text-neutral-1000" strokeWidth={1.5} />
            </div>

            {/* Title */}
            <span className="text-neutral-500 font-medium text-label-sm mb-8">Saldo total</span>

            {/* Value */}
            <div>
                <h2 className="text-heading-md font-bold text-neutral-1000 tracking-tight">
                    <AnimatedCounter value={balance} />
                </h2>
            </div>
        </div>
    );
}
