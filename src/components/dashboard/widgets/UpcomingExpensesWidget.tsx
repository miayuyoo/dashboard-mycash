import { Wallet, Plus, Check } from 'lucide-react';
import { useFinance } from '../../../context/FinanceContext';
import { formatCurrency } from '../../../utils/format';
import { format, isFuture, parseISO, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import clsx from 'clsx';
import { Transaction } from '../../../types';

export function UpcomingExpensesWidget() {
    const { transactions, accounts, creditCards, updateTransaction, addTransaction } = useFinance();

    // Filter pending expenses
    const pendingExpenses = transactions
        .filter(t => t.type === 'expense' && t.status === 'pending')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const handleMarkAsPaid = (transaction: Transaction) => {
        // 1. Mark as completed
        updateTransaction({ ...transaction, status: 'completed' });

        // 2. Logic for recurrence (create next month's expense)
        if (transaction.isRecurring) {
            const nextDate = addMonths(parseISO(transaction.date), 1).toISOString();

            addTransaction({
                ...transaction,
                id: crypto.randomUUID(), // Generate new ID
                date: nextDate,
                status: 'pending',
                description: transaction.description, // Keep description
                amount: transaction.amount, // Keep amount
                // Keep other links
            });
        }

        // Alert
        alert('Despesa marcada como paga!');
    };

    const getSourceName = (t: Transaction) => {
        if (t.cardId) {
            const card = creditCards.find(c => c.id === t.cardId);
            return card ? `Crédito ${card.name.split(' ')[0]} **** ${card.last4Digits}` : 'Cartão de Crédito';
        }
        if (t.accountId) {
            const account = accounts.find(a => a.id === t.accountId);
            // Example: "Nubank conta" implies extracting Bank name?
            // If name is "Reserva (Nubank)", logic might be complex.
            // I'll just use the account name or a simplified version as requested "Nubank conta".
            // If account name contains 'Nubank', use 'Nubank conta'.
            // Simple generic fallback:
            return account ? `${account.name}` : 'Conta Bancária';
        }
        return 'Não especificado';
    };

    return (
        <div className="flex flex-col w-full bg-white border border-neutral-200 rounded-32 p-24 md:p-32 h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-24">
                <div className="flex items-center gap-3">
                    <Wallet size={24} className="text-neutral-1000" />
                    <h3 className="text-heading-sm font-bold text-neutral-1000">Próximas despesas</h3>
                </div>
                <button
                    className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors group shadow-sm"
                    title="Adicionar despesa"
                >
                    <Plus size={20} className="text-neutral-600 group-hover:text-neutral-900" />
                </button>
            </div>

            {/* Content List */}
            <div className="flex flex-col flex-1 gap-0">
                {pendingExpenses.length > 0 ? (
                    pendingExpenses.map((t, index) => (
                        <div
                            key={t.id}
                            className={clsx(
                                "flex items-center justify-between py-16",
                                index !== pendingExpenses.length - 1 && "border-b border-neutral-100"
                            )}
                        >
                            {/* Left Info */}
                            <div className="flex flex-col gap-1">
                                <span className="text-body-sm font-bold text-neutral-1000">
                                    {t.description}
                                </span>
                                <span className="text-body-xs font-medium text-neutral-600">
                                    Vence dia {format(parseISO(t.date), 'dd/MM')}
                                </span>
                                <span className="text-body-xs text-neutral-400">
                                    {getSourceName(t)}
                                </span>
                            </div>

                            {/* Right Action */}
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-heading-xs font-bold text-neutral-1000">
                                    {formatCurrency(t.amount)}
                                </span>
                                <button
                                    onClick={() => handleMarkAsPaid(t)}
                                    className="group/check w-8 h-8 rounded-full border border-neutral-200 bg-transparent flex items-center justify-center transition-all hover:bg-green-50 hover:border-green-500 cursor-pointer"
                                    title="Marcar como pago"
                                >
                                    <Check size={16} className="text-neutral-300 group-hover/check:text-green-600 transition-colors" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 border border-dashed border-neutral-200 rounded-16 bg-neutral-50/50">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Check size={24} className="text-green-600" />
                        </div>
                        <p className="text-body-sm text-neutral-500 font-medium">
                            Nenhuma despesa pendente
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
