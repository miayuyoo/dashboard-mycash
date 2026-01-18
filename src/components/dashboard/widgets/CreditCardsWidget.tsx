import { useState } from 'react';
import { CreditCard, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFinance } from '../../../context/FinanceContext';
import { formatCurrency } from '../../../utils/format';
import { COLORS } from '../../../utils/colors';
import clsx from 'clsx';
import { CardTheme } from '../../../types';

export function CreditCardsWidget() {
    const { creditCards } = useFinance();
    const [currentPage, setCurrentPage] = useState(0);
    const ITEMS_PER_PAGE = 3;

    const totalPages = Math.ceil(creditCards.length / ITEMS_PER_PAGE);

    // Pagination slicing
    const visibleCards = creditCards.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    const handleNext = () => {
        if (currentPage < totalPages - 1) setCurrentPage(p => p + 1);
    };

    const handlePrev = () => {
        if (currentPage > 0) setCurrentPage(p => p - 1);
    };

    // Helper for visual themes
    const getThemeStyles = (theme: CardTheme) => {
        switch (theme) {
            case 'black':
                return {
                    iconBlock: 'bg-neutral-1000',
                    iconColor: 'text-white',
                    badgeBg: 'bg-neutral-1000/10',
                    badgeText: 'text-neutral-1000'
                };
            case 'lime':
                return {
                    iconBlock: 'bg-[#DFFE35]', // brand-500
                    iconColor: 'text-neutral-1000',
                    badgeBg: 'bg-[#DFFE35]/20',
                    badgeText: 'text-neutral-1000'
                };
            case 'purple':
                return {
                    iconBlock: 'bg-purple-600',
                    iconColor: 'text-white',
                    badgeBg: 'bg-purple-100',
                    badgeText: 'text-purple-700'
                };
            case 'white':
            default:
                return {
                    iconBlock: 'bg-neutral-100 border border-neutral-200',
                    iconColor: 'text-neutral-600',
                    badgeBg: 'bg-neutral-100',
                    badgeText: 'text-neutral-600'
                };
        }
    };

    return (
        <div className="flex flex-col w-full h-full bg-white border border-neutral-200 rounded-32 p-24 md:p-32">
            {/* Header */}
            <div className="flex items-center justify-between mb-24">
                <div className="flex items-center gap-3">
                    <div className="p-8 bg-neutral-100 rounded-lg">
                        <CreditCard size={24} className="text-neutral-1000" />
                    </div>
                    <h3 className="text-heading-sm font-bold text-neutral-1000">Cartões</h3>
                </div>
                <button
                    className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors group shadow-sm"
                    title="Novo cartão"
                >
                    <Plus size={20} className="text-neutral-600 group-hover:text-neutral-900" />
                </button>
            </div>

            {/* Cards List */}
            <div className="flex flex-col gap-4 flex-1">
                {visibleCards.length > 0 ? (
                    visibleCards.map((card) => {
                        const styles = getThemeStyles(card.theme);
                        const usagePercent = Math.round((card.currentInvoice / card.limit) * 100);

                        return (
                            <div
                                key={card.id}
                                className="group/card flex items-center justify-between p-16 bg-white rounded-24 shadow-sm border border-neutral-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer select-none"
                                onClick={() => console.log('Open details for', card.id)}
                            >
                                {/* Left: Theme Block */}
                                <div className={clsx("w-12 h-12 md:w-48 md:h-48 rounded-xl flex items-center justify-center shrink-0", styles.iconBlock)}>
                                    <CreditCard size={20} className={styles.iconColor} />
                                </div>

                                {/* Center: Info */}
                                <div className="flex flex-col flex-1 px-4 md:px-6 overflow-hidden">
                                    <span className="text-body-xs font-medium text-neutral-500 truncate mb-2">
                                        {card.name}
                                    </span>
                                    <span className="text-heading-xs font-bold text-neutral-1000 tracking-tight mb-2">
                                        {formatCurrency(card.currentInvoice)}
                                    </span>
                                    <span className="text-body-xs text-neutral-400 font-medium">
                                        •••• {card.last4Digits || '0000'}
                                    </span>
                                </div>

                                {/* Right: Usage Badge */}
                                <div className={clsx("px-3 py-1 rounded-full text-body-xs font-bold shrink-0", styles.badgeBg, styles.badgeText)}>
                                    {usagePercent}%
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="flex-1 flex items-center justify-center text-neutral-400 text-body-sm italic">
                        Nenhum cartão cadastrado.
                    </div>
                )}
            </div>

            {/* Simple Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-16 pt-8 border-t border-neutral-200">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 0}
                        className="p-2 rounded-full hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-neutral-600"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-body-xs font-medium text-neutral-500">
                        {currentPage + 1} / {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages - 1}
                        className="p-2 rounded-full hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-neutral-600"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}
