import { useState, useMemo, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowDownLeft, ArrowUpRight, User, FileText, ChevronDown } from 'lucide-react';
import { useFinance } from '../../../context/FinanceContext';
import { formatCurrency } from '../../../utils/format';
import { format, parseISO } from 'date-fns';
import clsx from 'clsx';
import { Transaction } from '../../../types';

const ITEMS_PER_PAGE = 5;

export function TransactionsTable() {
    const { getFilteredTransactions, familyMembers, bankAccounts, creditCards } = useFinance();

    // Local State filters
    const [localSearch, setLocalSearch] = useState('');
    const [localType, setLocalType] = useState<'all' | 'income' | 'expense'>('all');
    const [currentPage, setCurrentPage] = useState(1);

    // 1. Get Global Filtered Data
    const globalData = getFilteredTransactions();

    // 2. Apply Local Filters
    const filteredData = useMemo(() => {
        return globalData.filter(tx => {
            // Local Type
            if (localType !== 'all' && tx.type !== localType) return false;

            // Local Search
            if (localSearch) {
                const term = localSearch.toLowerCase();
                const matchesDesc = tx.description.toLowerCase().includes(term);
                const matchesCat = tx.category.toLowerCase().includes(term);
                if (!matchesDesc && !matchesCat) return false;
            }
            return true;
        });
    }, [globalData, localSearch, localType]);

    // Reset page on filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [localSearch, localType, globalData.length]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Helper: Source Name
    const getSourceName = (t: Transaction) => {
        if (t.accountId) {
            const account = bankAccounts.find(a => a.id === t.accountId);
            if (account) return account.name;
        }
        if (t.cardId) {
            const card = creditCards.find(c => c.id === t.cardId);
            if (card) return `Crédito ${card.name}`;
        }
        return "Desconhecido";
    };

    // Helper: Pagination Array
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');

            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 3) { end = 4; start = 2; }
            if (currentPage >= totalPages - 2) { start = totalPages - 3; end = totalPages - 1; }

            for (let i = start; i <= end; i++) {
                if (i > 1 && i < totalPages) pages.push(i);
            }

            if (currentPage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }
        return pages;
    };

    // Pagination Rendering
    const renderPageButton = (page: number | string, idx: number) => {
        if (page === '...') {
            return <span key={`ellipsis-${idx}`} className="px-2 text-neutral-400">...</span>;
        }
        const p = page as number;
        return (
            <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={clsx(
                    "w-8 h-8 rounded-lg text-label-sm font-medium transition-colors",
                    currentPage === p
                        ? "bg-neutral-1000 text-white"
                        : "text-neutral-500 hover:bg-neutral-100"
                )}
            >
                {p}
            </button>
        );
    };

    return (
        <div className="flex flex-col w-full bg-white p-24 md:p-32 rounded-32 border border-neutral-200">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-6">
                <div className="flex items-center gap-3 self-start md:self-center">
                    <div className="p-8 bg-neutral-100 rounded-lg">
                        <FileText size={24} className="text-neutral-1000" />
                    </div>
                    <h3 className="text-heading-sm font-bold text-neutral-1000">Extrato detalhado</h3>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar lançamentos..."
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                            className="w-full pl-12 pr-6 h-12 bg-white border border-neutral-200 rounded-full text-body-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                        />
                    </div>

                    {/* Type Filter */}
                    <div className="relative w-full md:w-[180px]">
                        <select
                            value={localType}
                            onChange={(e) => setLocalType(e.target.value as any)}
                            className="w-full pl-6 pr-10 h-12 bg-white border border-neutral-200 rounded-full text-body-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 appearance-none cursor-pointer transition-all"
                        >
                            <option value="all">Todas</option>
                            <option value="income">Receitas</option>
                            <option value="expense">Despesas</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" size={16} />
                    </div>
                </div>
            </div>

            {/* Table Wrapper (Borderless) */}
            <div className="w-full flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-neutral-50 border-b border-neutral-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-label-xs font-bold text-neutral-500 uppercase tracking-wider w-[60px]">Avatar</th>
                                <th className="px-6 py-4 text-left text-label-xs font-bold text-neutral-500 uppercase tracking-wider">Data</th>
                                <th className="px-6 py-4 text-left text-label-xs font-bold text-neutral-500 uppercase tracking-wider">Descrição</th>
                                <th className="px-6 py-4 text-left text-label-xs font-bold text-neutral-500 uppercase tracking-wider">Categoria</th>
                                <th className="px-6 py-4 text-left text-label-xs font-bold text-neutral-500 uppercase tracking-wider">Conta/Cartão</th>
                                <th className="px-6 py-4 text-center text-label-xs font-bold text-neutral-500 uppercase tracking-wider">Parcelas</th>
                                <th className="px-6 py-4 text-right text-label-xs font-bold text-neutral-500 uppercase tracking-wider">Valor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {currentItems.length > 0 ? (
                                currentItems.map((tx, idx) => {
                                    const member = familyMembers.find(m => m.id === tx.memberId);
                                    const isIncome = tx.type === 'income';
                                    const Icon = isIncome ? ArrowDownLeft : ArrowUpRight;
                                    const iconColor = isIncome ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';

                                    return (
                                        <tr
                                            key={tx.id}
                                            className="group transition-colors bg-white hover:bg-neutral-50"
                                        >
                                            {/* Avatar (40px) */}
                                            <td className="px-6 py-4">
                                                {member?.avatarUrl ? (
                                                    <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-white shadow-sm" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center border border-white shadow-sm">
                                                        <User size={20} className="text-neutral-500" />
                                                    </div>
                                                )}
                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-4 text-body-sm text-neutral-500 font-medium">
                                                {format(parseISO(tx.date), 'dd/MM/yyyy')}
                                            </td>

                                            {/* Description (Icon 24px) */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center", iconColor)}>
                                                        <Icon size={24} />
                                                    </div>
                                                    <span className="text-body-sm font-bold text-neutral-1000 line-clamp-1">{tx.description}</span>
                                                </div>
                                            </td>

                                            {/* Category */}
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 rounded-full bg-neutral-100 text-label-xs font-bold text-neutral-500 ring-1 ring-neutral-200">
                                                    {tx.category}
                                                </span>
                                            </td>

                                            {/* Source */}
                                            <td className="px-6 py-4 text-body-sm text-neutral-500">
                                                {getSourceName(tx)}
                                            </td>

                                            {/* Installments */}
                                            <td className="px-6 py-4 text-center text-body-sm text-neutral-500 font-medium">
                                                {(tx.currentInstallment && tx.totalInstallments)
                                                    ? `${tx.currentInstallment}/${tx.totalInstallments}`
                                                    : (tx.installments && tx.installments > 1 ? `${tx.installments}x` : '-')}
                                            </td>

                                            {/* Value */}
                                            <td className="px-6 py-4 text-right">
                                                <span className={clsx("text-body-sm font-bold", isIncome ? "text-green-600" : "text-neutral-1000")}>
                                                    {isIncome ? '+' : '-'}{formatCurrency(tx.amount)}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={7} className="h-96 text-center text-neutral-500 text-body-md font-medium">
                                        Nenhum lançamento encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredData.length > 0 && (
                    <div className="flex items-center justify-between pt-24 border-t border-neutral-100">
                        <span className="text-body-xs text-neutral-500">
                            Mostrando <span className="font-bold text-neutral-900">{Math.min(startIndex + 1, filteredData.length)}</span> a <span className="font-bold text-neutral-900">{Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length)}</span> de <span className="font-bold text-neutral-900">{filteredData.length}</span>
                        </span>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {getPageNumbers().map((p, i) => renderPageButton(p, i))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
