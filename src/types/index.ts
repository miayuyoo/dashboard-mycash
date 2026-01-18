export type TransactionType = 'income' | 'expense';
export type TransactionStatus = 'pending' | 'completed';

export interface Transaction {
    id: string;
    type: TransactionType;
    amount: number;
    description: string;
    category: string;
    date: string; // ISO 8601
    accountId?: string;
    memberId?: string;
    installments?: number; // 1 for one-time
    status: TransactionStatus;
}

export type GoalStatus = 'active' | 'archived';

export interface Goal {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    targetAmount: number;
    currentAmount: number;
    category: string;
    deadline?: string;
    status: GoalStatus;
}

export type CardTheme = 'black' | 'lime' | 'white' | 'purple';

export interface CreditCard {
    id: string;
    name: string;
    closingDay: number;
    dueDay: number;
    limit: number;
    currentInvoice: number;
    theme: CardTheme;
    logoUrl?: string;
    last4Digits?: string;
    memberId?: string;
}

export type AccountType = 'checking' | 'savings' | 'investment' | 'cash';

export interface BankAccount {
    id: string;
    name: string;
    type: AccountType;
    balance: number;
    color: string;
    memberId?: string;
}

export type FamilyRole = 'father' | 'mother' | 'son' | 'daughter' | 'other';

export interface FamilyMember {
    id: string;
    name: string;
    role: FamilyRole;
    avatarUrl?: string;
    email?: string;
    income?: number;
}
