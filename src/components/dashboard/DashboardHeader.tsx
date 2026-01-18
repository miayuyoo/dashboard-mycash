import { SearchInput } from './header/SearchInput';
import { FilterToggle } from './header/FilterToggle';
import { DateSelector } from './header/DateSelector';
import { FamilySelector } from './header/FamilySelector';
import { NewTransactionButton } from './header/NewTransactionButton';

export function DashboardHeader() {
    return (
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 w-full mb-8">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
                <SearchInput />
                <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <FilterToggle />
                    <DateSelector />
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto">
                <FamilySelector />
                <div className="hidden lg:block w-px h-32 bg-neutral-200 mx-2" />
                <div className="w-full md:w-auto">
                    <NewTransactionButton />
                </div>
            </div>
        </header>
    );
}
