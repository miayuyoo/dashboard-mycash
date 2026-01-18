import {
    FamilyMember,
    CreditCard,
    BankAccount,
    Transaction,
    Goal
} from '../types';

export const INITIAL_MEMBERS: FamilyMember[] = [
    {
        id: 'm1',
        name: 'Carlos Silva',
        role: 'father',
        avatarUrl: 'https://i.pravatar.cc/150?u=carlos',
        email: 'carlos@mycash.com',
        income: 12000
    },
    {
        id: 'm2',
        name: 'Ana Silva',
        role: 'mother',
        avatarUrl: 'https://i.pravatar.cc/150?u=ana',
        email: 'ana@mycash.com',
        income: 14000
    },
    {
        id: 'm3',
        name: 'Lucas Silva',
        role: 'son',
        avatarUrl: 'https://i.pravatar.cc/150?u=lucas',
        email: 'lucas@mycash.com',
        income: 0
    }
];

export const INITIAL_ACCOUNTS: BankAccount[] = [
    {
        id: 'acc1',
        name: 'Conta Principal (Itaú)',
        type: 'checking',
        balance: 4500.50,
        color: '#FF6B00',
        memberId: 'm1'
    },
    {
        id: 'acc2',
        name: 'Reserva (Nubank)',
        type: 'savings',
        balance: 12000.00,
        color: '#820AD1',
        memberId: 'm2'
    },
    {
        id: 'acc3',
        name: 'Investimentos XP',
        type: 'investment',
        balance: 55000.00,
        color: '#000000',
    }
];

export const INITIAL_CARDS: CreditCard[] = [
    {
        id: 'card1',
        name: 'Nubank Ultravioleta',
        closingDay: 25,
        dueDay: 5,
        limit: 20000,
        currentInvoice: 3450.20,
        theme: 'purple', // Using closest logical theme
        last4Digits: '8832',
        memberId: 'm1'
    },
    {
        id: 'card2',
        name: 'XP Visa Infinite',
        closingDay: 1,
        dueDay: 10,
        limit: 50000,
        currentInvoice: 1240.00,
        theme: 'black',
        last4Digits: '1290',
        memberId: 'm2'
    },
    {
        id: 'card3',
        name: 'Itaú Click',
        closingDay: 15,
        dueDay: 25,
        limit: 8000,
        currentInvoice: 560.50,
        theme: 'white', // Placeholder for lighter theme
        last4Digits: '4421',
        memberId: 'm3'
    }
];

export const INITIAL_GOALS: Goal[] = [
    {
        id: 'goal1',
        name: 'Viagem Europa',
        description: 'Férias de julho em família',
        targetAmount: 30000,
        currentAmount: 12500,
        category: 'Viagem',
        deadline: '2024-07-01',
        status: 'active'
    },
    {
        id: 'goal2',
        name: 'Troca de Carro',
        description: 'Upgrade para SUV',
        targetAmount: 85000,
        currentAmount: 45000,
        category: 'Veículo',
        deadline: '2024-12-20',
        status: 'active'
    },
    {
        id: 'goal3',
        name: 'Reserva de Emergência',
        description: '6 meses de custo de vida',
        targetAmount: 60000,
        currentAmount: 55000,
        category: 'Finanças',
        status: 'active'
    },
    {
        id: 'goal4',
        name: 'Macbook Pro',
        description: 'Para trabalho do Lucas',
        targetAmount: 14000,
        currentAmount: 2000,
        category: 'Eletrônicos',
        status: 'active'
    }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
    {
        id: 't1',
        type: 'expense',
        amount: 350.00,
        description: 'Mercado Semanal',
        category: 'Alimentação',
        date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), // 2 days ago
        accountId: 'acc1',
        memberId: 'm1',
        status: 'completed'
    },
    {
        id: 't2',
        type: 'expense',
        amount: 120.90,
        description: 'Uber',
        category: 'Transporte',
        date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), // Yesterday
        accountId: 'acc1',
        memberId: 'm1',
        status: 'completed'
    },
    {
        id: 't3',
        type: 'income',
        amount: 6000.00,
        description: 'Salário Adiantamento',
        category: 'Salário',
        date: new Date(new Date().setDate(5)).toISOString(), // 5th of current month
        accountId: 'acc1',
        memberId: 'm1',
        status: 'completed'
    },
    {
        id: 't4',
        type: 'expense',
        amount: 89.90,
        description: 'Spotify Family',
        category: 'Assinaturas',
        date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
        accountId: 'acc2',
        memberId: 'm2',
        status: 'completed'
    },
    {
        id: 't5',
        type: 'expense',
        amount: 2500.00,
        description: 'Aluguel',
        category: 'Moradia',
        date: new Date(new Date().setDate(10)).toISOString(),
        accountId: 'acc1',
        memberId: 'm1',
        status: 'completed'
    },
    {
        id: 't6',
        type: 'expense',
        amount: 156.00,
        description: 'Jantar Japônes',
        category: 'Lazer',
        date: new Date().toISOString(),
        accountId: 'acc2',
        memberId: 'm2',
        status: 'completed'
    },
    // More transactions...
    {
        id: 't7',
        type: 'income',
        amount: 1400.00,
        description: 'Freelance Design',
        category: 'Extra',
        date: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
        accountId: 'acc2',
        memberId: 'm2',
        status: 'completed'
    },
    {
        id: 't8',
        type: 'expense',
        amount: 45.00,
        description: 'Café da Tarde',
        category: 'Alimentação',
        date: new Date().toISOString(),
        memberId: 'm3',
        status: 'pending' // Just recorded
    },
    {
        id: 't9',
        type: 'expense',
        amount: 320.00,
        description: 'Fisioterapia',
        category: 'Saúde',
        date: new Date().toISOString(),
        memberId: 'm1',
        status: 'completed'
    },
    {
        id: 't10',
        type: 'expense',
        amount: 450.00,
        description: 'Curso Online',
        category: 'Educação',
        date: new Date().toISOString(),
        memberId: 'm2',
        status: 'completed'
    },
    {
        id: 't11',
        type: 'expense',
        amount: 210.00,
        description: 'Roupas Renner',
        category: 'Vestuário',
        date: new Date().toISOString(),
        memberId: 'm1',
        status: 'completed'
    },
    // Pending Upcoming Expenses
    {
        id: 't_pending_1',
        type: 'expense',
        amount: 160.00,
        description: 'Conta de luz',
        category: 'Contas',
        date: '2026-01-21T10:00:00Z',
        accountId: 'acc2', // Nubank
        isRecurring: true,
        recurrenceFrequency: 'monthly',
        status: 'pending'
    },
    {
        id: 't_pending_2',
        type: 'expense',
        amount: 80.00,
        description: 'Netflix',
        category: 'Assinaturas',
        date: '2026-01-21T10:00:00Z',
        cardId: 'card1', // Nubank Ultravioleta
        isRecurring: true,
        recurrenceFrequency: 'monthly',
        status: 'pending'
    },
    {
        id: 't_pending_3',
        type: 'expense',
        amount: 99.00,
        description: 'Internet',
        category: 'Contas',
        date: '2026-01-21T12:00:00Z',
        accountId: 'acc2',
        isRecurring: true,
        recurrenceFrequency: 'monthly',
        status: 'pending'
    },
    {
        id: 't_pending_4',
        type: 'expense',
        amount: 60.00,
        description: 'Academia',
        category: 'Saúde',
        date: '2026-01-21T08:00:00Z',
        cardId: 'card2', // XP Visa
        isRecurring: true,
        recurrenceFrequency: 'monthly',
        status: 'pending'
    }
];
