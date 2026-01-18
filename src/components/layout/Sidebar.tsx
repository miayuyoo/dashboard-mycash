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
                    // COLLAPSED: Icon Only
                    <div className="shrink-0 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.5 4.5H7.5C5.84315 4.5 4.5 5.84315 4.5 7.5V13.5C4.5 15.1569 5.84315 16.5 7.5 16.5H16.5C18.1569 16.5 19.5 15.1569 19.5 13.5V7.5C19.5 5.84315 18.1569 4.5 16.5 4.5ZM7.5 3C5.01472 3 3 5.01472 3 7.5V13.5C3 15.9853 5.01472 18 7.5 18H16.5C18.9853 18 21 15.9853 21 13.5V7.5C21 5.01472 18.9853 3 16.5 3H7.5Z" fill="#111827" />
                            <path d="M10.5 7.5V13.5" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                            <path d="M13.5 10.5V16.5" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                ) : (
                    // EXPANDED: Full Logo (Icon + HTML Text)
                    // Note: User requested SVG only, but provided SVG data only covers the icon geometry.
                    // To prevent "misconfigured" appearance, we render the Icon SVG + Text.
                    <div className="flex items-center">
                        <div className="shrink-0 text-neutral-1000">
                            {/* Logo Icon SVG */}
                            <svg width="32" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.875 5.92505C10.2223 5.92505 9.61081 6.25141 9.2396 6.79051L3.58284 15.0063C2.8647 16.0493 3.61051 17.475 4.875 17.475H10.5V19.4C10.5 20.8912 11.7088 22.1 13.2 22.1H18.975C19.6277 22.1 20.2392 21.7737 20.6104 21.2346L26.2672 13.0188C26.9853 11.9758 26.2395 10.55 24.975 10.55H19.35V8.62505C19.35 7.13388 18.1412 5.92505 16.65 5.92505H10.875ZM15.6896 9.41505L9.6604 18.1718C9.55781 18.3208 9.66436 18.525 9.84534 18.525H16.05C16.3814 18.525 16.65 18.2564 16.65 17.925V13.05C16.65 11.973 17.523 11.1 18.6 11.1H22.1466L23.4896 9.14959C23.5922 9.00057 23.4856 8.79636 23.3047 8.79636H16.65C16.1199 8.79636 15.6896 9.2266 15.6896 9.75666V9.41505ZM17.1604 18.6083C17.263 18.4593 17.1565 18.2551 16.9755 18.2551H13.2C12.6698 18.2551 12.24 17.8253 12.24 17.2952V14.525H8.7034L7.3604 16.4755C7.25781 16.6245 7.36436 16.8287 7.54534 16.8287H13.2C13.5314 16.8287 13.8 17.0973 13.8 17.4287V21.1718L17.1604 18.6083Z" fill="#080B12" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.875 5.92505H16.65C18.1412 5.92505 19.35 7.13388 19.35 8.62505V10.55H24.975C26.2395 10.55 26.9853 11.9758 26.2672 13.0188L20.6104 21.2346C20.2392 21.7737 19.6277 22.1 18.975 22.1H13.2C11.7088 22.1 10.5 20.8912 10.5 19.4V17.475H4.875C3.61051 17.475 2.8647 16.0493 3.58284 15.0063L9.2396 6.79051C9.61081 6.25141 10.2223 5.92505 10.875 5.92505ZM12.24 17.2952C12.24 17.8253 12.6698 18.2551 13.2 18.2551H16.9755C17.1565 18.2551 17.263 18.4593 17.1604 18.6083L13.8 21.1718V17.4287C13.8 17.0973 13.5314 16.8287 13.2 16.8287H7.54534C7.36436 16.8287 7.25781 16.6245 7.3604 16.4755L8.7034 14.525H12.24V17.2952ZM16.05 18.525C16.3814 18.525 16.65 18.2564 16.65 17.925V13.05C16.65 11.973 17.523 11.1 18.6 11.1H22.1466L23.4896 9.14959C23.5922 9.00057 23.4856 8.79636 23.3047 8.79636H16.65C16.1199 8.79636 15.6896 9.2266 15.6896 9.75666V9.41505L9.6604 18.1718C9.55781 18.3208 9.66436 18.525 9.84534 18.525H16.05Z" fill="currentColor" />
                            </svg>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            transition={{ duration: 0.2 }}
                            className="whitespace-nowrap overflow-hidden flex items-center ml-4"
                        >
                            <span className="font-bold text-heading-sm text-neutral-1100 tracking-tight">Mycash+</span>
                        </motion.div>
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
