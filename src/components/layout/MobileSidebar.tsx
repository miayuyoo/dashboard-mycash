import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    Target,
    CreditCard,
    ArrowLeftRight,
    User,
    LogOut,
    X
} from 'lucide-react';
import { clsx } from 'clsx';

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const MENU_ITEMS = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/cards', label: 'Cartões', icon: CreditCard },
    { path: '/goals', label: 'Objetivos', icon: Target },
    { path: '/transactions', label: 'Transações', icon: ArrowLeftRight },
    { path: '/profile', label: 'Perfil', icon: User },
];

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
    const location = useLocation();

    // Use a portal to render outside the main layout container if needed, 
    // but typically strictly z-indexed fixed position works fine. 
    // We'll stick to fixed overlay for simplicity.

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-neutral-1100/50 z-50 lg:hidden backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.aside
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }} // Note: exit animation requirement implies AnimatePresence is parent
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 lg:hidden shadow-xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/logo-small.svg"
                                    alt="Mycash+"
                                    className="w-8 h-8"
                                />
                                <span className="font-bold text-lg text-neutral-1100 tracking-tight">Mycash+</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 -mr-2 text-neutral-500 hover:text-neutral-900 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                            {MENU_ITEMS.map((item) => {
                                const isActive = location.pathname === item.path;
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={onClose} // Close drawer on navigation
                                        className={clsx(
                                            "flex items-center w-full min-h-[48px] px-4 rounded-full transition-colors",
                                            isActive
                                                ? "bg-brand-500 text-neutral-1000 font-bold"
                                                : "text-neutral-900 font-medium hover:bg-neutral-100"
                                        )}
                                    >
                                        <Icon
                                            size={20}
                                            className="shrink-0 mr-3"
                                            strokeWidth={isActive ? 2.5 : 2}
                                        />
                                        <span className="text-base">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* User / Footer */}
                        <div className="p-6 border-t border-neutral-200">
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://github.com/shadcn.png"
                                    alt="User"
                                    className="w-10 h-10 rounded-full bg-neutral-200 object-cover"
                                />
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-semibold text-neutral-900 truncate">Michelle Y.</span>
                                    <span className="text-xs text-neutral-500 truncate">michelle@mycash.com</span>
                                </div>
                                <button className="ml-auto text-neutral-400 hover:text-red-500">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
