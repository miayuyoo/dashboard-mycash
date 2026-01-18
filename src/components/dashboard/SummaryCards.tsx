import { BalanceCard } from './BalanceCard';
import { IncomeCard } from './IncomeCard';
import { ExpenseCard } from './ExpenseCard';

export function SummaryCards() {
    return (
        <section className="grid grid-cols-1 lg:flex gap-6 w-full mb-8">
            <BalanceCard />
            <IncomeCard />
            <ExpenseCard />
        </section>
    );
}
