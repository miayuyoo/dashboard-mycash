import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileHeader } from './MobileHeader';
import { MobileSidebar } from './MobileSidebar';
import { motion } from 'framer-motion';

export function MainLayout() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <div className="flex min-h-screen bg-neutral-100 font-sans text-neutral-900">
            {/* Desktop Sidebar */}
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                toggleSidebar={toggleSidebar}
            />

            {/* Mobile Sidebar (Drawer) */}
            <MobileSidebar
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
                className="flex-1 flex flex-col min-w-0"
                animate={{
                    marginLeft: isSidebarCollapsed ? '96px' : '312px'
                }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                initial={false}
                style={{ marginLeft: 0 }}
            >
                {/* Mobile Header */}
                <MobileHeader onMenuClick={toggleMobileMenu} />

                <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1400px] xl:max-w-[1600px] w-full mx-auto overflow-x-hidden">
                    <Outlet />
                </main>
            </motion.div>

            <style>{`
        @media (max-width: 1023px) {
          .flex-1.flex.flex-col {
            margin-left: 0 !important;
          }
        }
      `}</style>
        </div>
    );
}
