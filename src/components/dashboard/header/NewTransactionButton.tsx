import { Plus } from 'lucide-react';

export function NewTransactionButton() {
    return (
        <button className="flex items-center gap-2 bg-neutral-1000 text-white rounded-full h-[48px] px-24 hover:bg-neutral-800 transition-colors shadow-lg">
            <Plus size={20} strokeWidth={2} />
            <span className="text-body-sm font-semibold whitespace-nowrap">Nova transação</span>
        </button>
    );
}
