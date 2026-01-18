import { Menu } from 'lucide-react';

interface MobileHeaderProps {
    onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
    return (
        <header className="lg:hidden h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 sticky top-0 z-40">
            {/* Left: Menu Toggle + Logo */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
                    aria-label="Abrir menu"
                >
                    <Menu size={24} />
                </button>

                <div className="flex items-center gap-2">
                    <img
                        src="/logo-small.svg"
                        alt="Mycash+"
                        className="w-8 h-8"
                    />
                    <span className="font-bold text-lg text-neutral-1100 tracking-tight">Mycash+</span>
                </div>
            </div>

            {/* Right: Placeholder for User or Actions (Optional) */}
            <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden">
                <img
                    src="https://github.com/shadcn.png"
                    alt="User"
                    className="w-full h-full object-cover"
                />
            </div>
        </header>
    );
}
