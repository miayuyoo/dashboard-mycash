import {
    Home,
    Target,
    CreditCard,
    ArrowLeftRight,
    User,
    LogOut
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const MENU_ITEMS = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/cards', label: 'Cartões', icon: CreditCard },
    { path: '/goals', label: 'Objetivos', icon: Target },
    { path: '/transactions', label: 'Transações', icon: ArrowLeftRight },
    { path: '/profile', label: 'Perfil', icon: User },
];

export function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
    const location = useLocation();

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? '96px' : '312px' }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="hidden lg:flex flex-col bg-neutral-0 h-screen border-r border-neutral-200 fixed left-0 top-0 z-50 shadow-sm"
        >
            {/* TOGGLE BUTTON */}
            <div className="absolute right-[-12px] top-24 z-50">
                <button
                    onClick={toggleSidebar}
                    className="w-24 h-24 flex items-center justify-center bg-white rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:bg-neutral-50 transition-colors focus:outline-none"
                    aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
                >
                    {isCollapsed ? (
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 9L5 5L1 1" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 9L1 5L5 1" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </button>
            </div>

            {/* LOGO SECTION */}
            <div className={clsx(
                "flex items-center h-96 transition-all duration-300",
                isCollapsed ? "justify-center" : "px-32 gap-12"
            )}>
                {isCollapsed ? (
                    // COLLAPSED: Icon Only (External SVG)
                    <div className="shrink-0 flex items-center justify-center">
                        <img
                            src="/logo-small.svg"
                            alt="Mycash+ Logo"
                            className="h-24 w-auto"
                        />
                    </div>
                ) : (
                    // EXPANDED: Full Logo (External SVG)
                    <div className="flex items-center">
                        <div className="shrink-0">
                            <img
                                src="/logo-full.svg"
                                alt="Mycash+ Logo"
                                className="h-32 w-auto"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* NAVIGATION LINKS */}
            <nav className={clsx(
                "flex-1 flex flex-col gap-8 py-32",
                isCollapsed ? "items-center px-16" : "px-32"
            )}>
                {MENU_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <div key={item.path} className="relative group flex justify-center w-full">
                            {isCollapsed ? (
                                // Collapsed State: Icon ONLY
                                <Link
                                    to={item.path}
                                    className={clsx(
                                        "w-48 h-48 flex items-center justify-center rounded-full transition-all duration-200 relative",
                                        isActive
                                            ? "bg-brand-500 text-neutral-1000"
                                            : "text-neutral-900 hover:bg-neutral-100"
                                    )}
                                >
                                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />

                                    {/* Tooltip */}
                                    <div className="absolute left-full ml-16 px-12 py-6 bg-neutral-900 text-neutral-0 text-label-xs rounded-8 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                                        {item.label}
                                        <div className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 w-8 h-8 bg-neutral-900 rotate-45"></div>
                                    </div>
                                </Link>
                            ) : (
                                // Expanded State: Full Pill
                                <Link
                                    to={item.path}
                                    className={clsx(
                                        "flex items-center w-full h-[52px] rounded-full px-24 transition-all duration-200 overflow-hidden",
                                        isActive
                                            ? "bg-brand-500 text-neutral-1000 shadow-sm"
                                            : "text-neutral-900 hover:bg-neutral-100"
                                    )}
                                >
                                    <Icon
                                        size={24}
                                        className="shrink-0"
                                        strokeWidth={isActive ? 2.5 : 2}
                                    />

                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className={clsx(
                                            "ml-16 text-label-md whitespace-nowrap",
                                            isActive ? "font-bold" : "font-medium"
                                        )}
                                    >
                                        {item.label}
                                    </motion.span>
                                </Link>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* USER PROFILE */}
            <div className="p-24 mb-8 border-t border-neutral-200/50">
                <div className={clsx(
                    "flex items-center transition-all duration-200",
                    isCollapsed ? "justify-center flex-col gap-8" : "gap-12"
                )}>
                    <div className="relative shrink-0">
                        <img
                            src="https://github.com/shadcn.png" // Placeholder
                            alt="User Avatar"
                            className="w-40 h-40 rounded-full bg-neutral-200 object-cover border border-neutral-200"
                        />
                    </div>

                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                className="flex flex-col overflow-hidden"
                            >
                                <span className="text-label-sm font-semibold text-neutral-900 truncate">Michelle Y.</span>
                                <span className="text-label-xs text-neutral-500 truncate">michelle@mycash.com</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!isCollapsed && (
                        <button className="ml-auto text-neutral-400 hover:text-red-500 transition-colors p-8">
                            <LogOut size={20} />
                        </button>
                    )}
                </div>
            </div>
        </motion.aside>
    );
}
