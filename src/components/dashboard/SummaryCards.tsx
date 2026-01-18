import { BalanceCard } from './BalanceCard';
import { IncomeCard } from './IncomeCard';
import { ExpenseCard } from './ExpenseCard';

export function SummaryCards() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full h-full">
            <BalanceCard />
            <IncomeCard />
            <ExpenseCard />
        </section>
    );
}
