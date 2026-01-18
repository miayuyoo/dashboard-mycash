import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Layout Placeholder
const Layout = () => {
    return (
        <div className="flex min-h-screen bg-neutral-100">
            {/* Sidebar will go here */}
            <div className="hidden lg:block w-64 bg-white border-r border-neutral-200 p-4">
                Sidebar (Desktop)
            </div>

            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header will go here */}
                <div className="lg:hidden h-16 bg-white border-b border-neutral-200 flex items-center px-4">
                    Header (Mobile)
                </div>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1400px] xl:max-w-[1600px] w-full mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

// Page Placeholders
const Dashboard = () => <h1 className="text-heading-lg font-bold">Dashboard</h1>;
const Goals = () => <h1 className="text-heading-lg font-bold">Objetivos</h1>;
const Cards = () => <h1 className="text-heading-lg font-bold">Cartões</h1>;
const Transactions = () => <h1 className="text-heading-lg font-bold">Transações</h1>;
const Profile = () => <h1 className="text-heading-lg font-bold">Perfil</h1>;

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="goals" element={<Goals />} />
                    <Route path="cards" element={<Cards />} />
                    <Route path="transactions" element={<Transactions />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
