import { Search } from 'lucide-react';
import { useFinance } from '../../../context/FinanceContext';

export function SearchInput() {
    const { searchText, setSearchText } = useFinance();

    return (
        <div className="relative w-full md:w-[280px] lg:w-[320px] h-[48px]">
            <div className="absolute left-16 top-1/2 -translate-y-1/2 text-neutral-500">
                <Search size={20} strokeWidth={1.5} />
            </div>
            <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Pesquisar"
                className="w-full h-full pl-48 pr-16 bg-white border border-neutral-300 rounded-full text-neutral-1000 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all text-body-md"
            />
        </div>
    );
}
