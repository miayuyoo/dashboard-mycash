import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';

// Page Placeholders
import { SummaryCards } from './components/dashboard/SummaryCards';

const Dashboard = () => (
    <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
            <h1 className="text-display-xs font-bold text-neutral-1000">Dashboard</h1>
            <p className="text-body-md text-neutral-500">Visão geral das suas finanças</p>
        </div>

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
