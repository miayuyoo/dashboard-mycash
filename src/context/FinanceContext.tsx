import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import {
    Transaction,
    Goal,
    CreditCard,
    BankAccount,
    FamilyMember,
    TransactionType
} from '../types';
import {
    INITIAL_MEMBERS,
    INITIAL_ACCOUNTS,
    INITIAL_CARDS,
    INITIAL_GOALS,
    INITIAL_TRANSACTIONS
} from '../data/mockData';

export interface DateRange {
    startDate: string | null;
    endDate: string | null;
}

interface FinanceContextType {
    // Data States
    transactions: Transaction[];
    goals: Goal[];
    creditCards: CreditCard[];
    bankAccounts: BankAccount[];
    familyMembers: FamilyMember[];

    // Filter States
    selectedMember: string | null;
    dateRange: DateRange;
    transactionType: 'all' | TransactionType;
    searchText: string;

    // Setters for Filters
    setSelectedMember: (id: string | null) => void;
    setDateRange: (range: DateRange) => void;
    setTransactionType: (type: 'all' | TransactionType) => void;
    setSearchText: (text: string) => void;

    // CRUD - Transactions
    addTransaction: (tx: Omit<Transaction, 'id'>) => void;
    updateTransaction: (id: string, tx: Partial<Transaction>) => void;
    deleteTransaction: (id: string) => void;

    // CRUD - Goals
    addGoal: (goal: Omit<Goal, 'id'>) => void;
    updateGoal: (id: string, goal: Partial<Goal>) => void;
    deleteGoal: (id: string) => void;

    // CRUD - Others
    addCreditCard: (card: Omit<CreditCard, 'id'>) => void;
    addBankAccount: (acc: Omit<BankAccount, 'id'>) => void;
    addFamilyMember: (member: Omit<FamilyMember, 'id'>) => void;

    // Derived / Calculated
    getFilteredTransactions: () => Transaction[];
    calculateTotalBalance: () => number;
    calculateIncomeForPeriod: () => number;
    calculateExpensesForPeriod: () => number;
    calculateExpensesByCategory: () => { category: string; amount: number; percentage: number }[];
    calculateCategoryPercentage: (category: string) => number;
    calculateSavingsRate: () => number;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

// Helper for ID generation
const generateId = () => Math.random().toString(36).substring(2, 9);

export function FinanceProvider({ children }: { children: ReactNode }) {
    // -------------------------------------------------------------------------
    // STATE
    // -------------------------------------------------------------------------
    const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
    const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
    const [creditCards, setCreditCards] = useState<CreditCard[]>(INITIAL_CARDS);
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(INITIAL_ACCOUNTS);
    const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(INITIAL_MEMBERS);

    // Filters
    const [selectedMember, setSelectedMember] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(), // Start of month
        endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString() // End of month
    });
    const [transactionType, setTransactionType] = useState<'all' | TransactionType>('all');
    const [searchText, setSearchText] = useState('');

    // -------------------------------------------------------------------------
    // CRUD ACTIONS
    // -------------------------------------------------------------------------

    // Transactions
    const addTransaction = (tx: Omit<Transaction, 'id'>) => {
        const newTx = { ...tx, id: generateId() };
        setTransactions(prev => [newTx, ...prev]);
    };

    const updateTransaction = (id: string, tx: Partial<Transaction>) => {
        setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...tx } : t));
    };

    const deleteTransaction = (id: string) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    // Goals
    const addGoal = (goal: Omit<Goal, 'id'>) => {
        setGoals(prev => [...prev, { ...goal, id: generateId() }]);
    };

    const updateGoal = (id: string, goal: Partial<Goal>) => {
        setGoals(prev => prev.map(g => g.id === id ? { ...g, ...goal } : g));
    };

    const deleteGoal = (id: string) => {
        setGoals(prev => prev.filter(g => g.id !== id));
    };

    // Other Entities
    const addCreditCard = (card: Omit<CreditCard, 'id'>) => {
        setCreditCards(prev => [...prev, { ...card, id: generateId() }]);
    };

    const addBankAccount = (acc: Omit<BankAccount, 'id'>) => {
        setBankAccounts(prev => [...prev, { ...acc, id: generateId() }]);
    };

    const addFamilyMember = (member: Omit<FamilyMember, 'id'>) => {
        setFamilyMembers(prev => [...prev, { ...member, id: generateId() }]);
    };

    // -------------------------------------------------------------------------
    // CALCULATIONS & FILTERS
    // -------------------------------------------------------------------------

    // Memoized filtered transactions to avoid recalculation on every render
    const filteredTransactions = useMemo(() => {
        return transactions.filter(tx => {
            // Member Filter
            if (selectedMember && tx.memberId !== selectedMember) return false;

            // Type Filter
            if (transactionType !== 'all' && tx.type !== transactionType) return false;

            // Date Filter
            const txDate = new Date(tx.date);
            if (dateRange.startDate && txDate < new Date(dateRange.startDate)) return false;
            if (dateRange.endDate) {
                const end = new Date(dateRange.endDate);
                // Assuming endDate includes the full day, usually set to 23:59:59 or we compare just dates.
                // For simplicity in string comparison:
                if (txDate > end) return false;
            }

            // Search (Case insensitive)
            if (searchText) {
                const term = searchText.toLowerCase();
                const matchesDesc = tx.description.toLowerCase().includes(term);
                const matchesCat = tx.category.toLowerCase().includes(term);
                if (!matchesDesc && !matchesCat) return false;
            }

            return true;
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [transactions, selectedMember, transactionType, dateRange, searchText]);

    // Exposed getter (stable reference)
    const getFilteredTransactions = useCallback(() => filteredTransactions, [filteredTransactions]);

    const calculateTotalBalance = () => {
        let validAccounts = bankAccounts;
        let validCards = creditCards;

        if (selectedMember) {
            validAccounts = bankAccounts.filter(a => a.memberId === selectedMember);
            validCards = creditCards.filter(c => c.memberId === selectedMember);
        }

        const totalAssets = validAccounts.reduce((acc, curr) => acc + curr.balance, 0);
        const totalLiabilities = validCards.reduce((acc, curr) => acc + curr.currentInvoice, 0);

        return totalAssets - totalLiabilities;
    };

    const calculateIncomeForPeriod = () => {
        return filteredTransactions
            .filter(t => t.type === 'income')
            .reduce((acc, curr) => acc + curr.amount, 0);
    };

    const calculateExpensesForPeriod = () => {
        return filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((acc, curr) => acc + curr.amount, 0);
    };

    const calculateExpensesByCategory = () => {
        const totalIncome = calculateIncomeForPeriod(); // Base for percentage as requested
        const expenses = filteredTransactions.filter(t => t.type === 'expense');

        const grouped: Record<string, number> = {};

        expenses.forEach(tx => {
            grouped[tx.category] = (grouped[tx.category] || 0) + tx.amount;
        });

        return Object.entries(grouped)
            .map(([category, amount]) => ({
                category,
                amount,
                percentage: totalIncome > 0 ? (amount / totalIncome) * 100 : 0
            }))
            .sort((a, b) => b.amount - a.amount);
    };

    const calculateCategoryPercentage = (category: string) => {
        const totalIncome = calculateIncomeForPeriod();
        if (totalIncome === 0) return 0;

        const catExpenses = filteredTransactions
            .filter(t => t.type === 'expense' && t.category === category)
            .reduce((acc, curr) => acc + curr.amount, 0);

        return (catExpenses / totalIncome) * 100;
    };

    const calculateSavingsRate = () => {
        const income = calculateIncomeForPeriod();
        const expenses = calculateExpensesForPeriod();

        if (income === 0) return 0;
        return ((income - expenses) / income) * 100;
    };

    const value: FinanceContextType = {
        transactions,
        goals,
        creditCards,
        bankAccounts,
        familyMembers,
        selectedMember,
        dateRange,
        transactionType,
        searchText,
        setSelectedMember,
        setDateRange,
        setTransactionType,
        setSearchText,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addGoal,
        updateGoal,
        deleteGoal,
        addCreditCard,
        addBankAccount,
        addFamilyMember,
        getFilteredTransactions,
        calculateTotalBalance,
        calculateIncomeForPeriod,
        calculateExpensesForPeriod,
        calculateExpensesByCategory,
        calculateCategoryPercentage,
        calculateSavingsRate
    };

    return (
        <FinanceContext.Provider value={value}>
            {children}
        </FinanceContext.Provider>
    );
}

export function useFinance() {
    const context = useContext(FinanceContext);
    if (context === undefined) {
        throw new Error('useFinance must be used within a FinanceProvider');
    }
    return context;
}
