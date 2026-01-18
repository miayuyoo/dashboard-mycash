import { SearchInput } from './header/SearchInput';
import { FilterToggle } from './header/FilterToggle';
import { DateSelector } from './header/DateSelector';
import { FamilySelector } from './header/FamilySelector';
import { NewTransactionButton } from './header/NewTransactionButton';

export function DashboardHeader() {
    return (
        <header className="bg-surface-500 p-6 md:p-8 rounded-32 w-full mb-8">
            <div className="flex flex-wrap items-center justify-between gap-y-6 gap-x-4">

                {/* Left Side: Search & Filters & Family */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full xl:w-auto flex-1">
                    <SearchInput />

                    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                        <FilterToggle />
                        <DateSelector />
                        <FamilySelector />
                    </div>
                </div>

                {/* Right Side: Actions */}
                <div className="flex items-center gap-4 w-full xl:w-auto justify-end xl:flex-none">
                    <NewTransactionButton />
                </div>
            </div>
        </header>
    );
}
