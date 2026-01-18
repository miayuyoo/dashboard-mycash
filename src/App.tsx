import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';

// Page Placeholders
import { SummaryCards } from './components/dashboard/SummaryCards';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { ExpensesByCategoryCarousel } from './components/dashboard/category/ExpensesCarousel';

const Dashboard = () => (
    <div className="flex flex-col gap-8">
        <DashboardHeader />
        <ExpensesByCategoryCarousel />
        <SummaryCards />
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
