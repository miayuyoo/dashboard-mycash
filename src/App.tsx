import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';

// Page Placeholders
import { SummaryCards } from './components/dashboard/SummaryCards';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { ExpensesByCategoryCarousel } from './components/dashboard/category/ExpensesCarousel';
import { FinancialFlowChart } from './components/dashboard/charts/FinancialFlowChart';
import { CreditCardsWidget } from './components/dashboard/widgets/CreditCardsWidget';

const Dashboard = () => (
    <div className="flex flex-col gap-8">
        <DashboardHeader />

        {/* Main Grid: Carousel/Summary (Left) | Widgets (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column: Carousel & Summary */}
            <div className="lg:col-span-2 flex flex-col gap-8 h-full">
                <ExpensesByCategoryCarousel />
                <div className="flex-1">
                    <SummaryCards />
                </div>
            </div>

            {/* Right Column: Widgets */}
            <div className="lg:col-span-1 h-full">
                <CreditCardsWidget />
            </div>
        </div>

        {/* Full Width Flow Chart */}
        <FinancialFlowChart />
    </div>
);

const Goals = () => <h1 className="text-heading-lg font-bold">Objetivos</h1>;
const Cards = () => <h1 className="text-heading-lg font-bold">Cartões</h1>;
const Transactions = () => <h1 className="text-heading-lg font-bold">Transações</h1>;
const Profile = () => <h1 className="text-heading-lg font-bold">Perfil</h1>;

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
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
