import { Plus } from 'lucide-react';
import { useFinance } from '../../../context/FinanceContext';
import clsx from 'clsx';
import { Check } from 'lucide-react';

export function FamilySelector() {
    const { familyMembers, selectedMember, setSelectedMember } = useFinance();

    return (
        <div className="flex items-center">
            <div className="flex -space-x-12 hover:space-x-4 transition-all duration-300">
                {familyMembers.map((member) => (
                    <button
                        key={member.id}
                        onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                        className="relative group transition-all duration-300 hover:z-10 hover:scale-110"
                    >
                        <div className={clsx(
                            "w-[40px] h-[40px] rounded-full border-2 transition-all overflow-hidden",
                            selectedMember === member.id
                                ? "border-neutral-1000 ring-2 ring-neutral-1000 ring-offset-2"
                                : "border-white"
                        )}>
                            <img
                                src={member.avatarUrl}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Check Icon Overlay if selected */}
                        {selectedMember === member.id && (
                            <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 border-2 border-white">
                                <Check size={8} className="text-white" strokeWidth={4} />
                            </div>
                        )}

                        {/* Tooltip Name */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-neutral-1000 text-white text-[10px] px-2 py-1 rounded">
                            {member.name}
                        </div>
                    </button>
                ))}
            </div>

            {/* Add Button */}
            <button className="w-[40px] h-[40px] rounded-full border border-dashed border-neutral-300 flex items-center justify-center ml-12 text-neutral-500 hover:border-neutral-1000 hover:text-neutral-1000 transition-colors bg-neutral-100">
                <Plus size={18} strokeWidth={1.5} />
            </button>
        </div>
    );
}
