import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../../utils/format';

const MOCK_DATA = [
    { month: 'JAN', income: 4000, expense: 2500 },
    { month: 'FEV', income: 3500, expense: 2800 },
    { month: 'MAR', income: 8200, expense: 3900 },
    { month: 'ABR', income: 6800, expense: 4200 },
    { month: 'MAI', income: 9500, expense: 5100 },
    { month: 'JUN', income: 7200, expense: 4800 },
    { month: 'JUL', income: 5900, expense: 3600 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-16 rounded-16 shadow-xl border border-neutral-100 min-w-[200px]">
                <p className="text-body-sm font-bold text-neutral-1000 mb-8 capitalize">{label}</p>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-8">
                        <span className="text-body-xs font-medium text-neutral-500">Receitas</span>
                        <span className="text-body-sm font-bold text-[#15803d]">
                            {formatCurrency(payload[0].value)}
                        </span>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                        <span className="text-body-xs font-medium text-neutral-500">Despesas</span>
                        <span className="text-body-sm font-bold text-neutral-1000">
                            {formatCurrency(payload[1].value)}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export function FinancialFlowChart() {
    return (
        <div className="w-full bg-white p-24 md:p-32 rounded-32 border border-neutral-200">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-32 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-8 bg-neutral-100 rounded-lg">
                        <TrendingUp size={24} className="text-neutral-1000" />
                    </div>
                    <h3 className="text-heading-sm font-bold text-neutral-1000">Fluxo financeiro</h3>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#CCF300]" />
                        <span className="text-body-sm font-medium text-neutral-600">Receitas</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-neutral-1000" />
                        <span className="text-body-sm font-medium text-neutral-600">Despesas</span>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={MOCK_DATA}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#CCF300" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#CCF300" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#111827" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#111827" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            vertical={false}
                            stroke="#E5E5E5"
                            strokeDasharray="4 4"
                        />

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            dy={10}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            tickFormatter={(value) => `R$ ${value / 1000}k`}
                            dx={-10}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ stroke: '#E5E5E5', strokeWidth: 1 }}
                        />

                        {/* Income Area - Rendered LAST to be ON TOP? No, usually overlapping. 
                            Transparency allows intersection. 
                            User said: "A opacidade menor garante que ambas áreas sejam visíveis".
                            Order matters for tooltip usually, but visual mix works.
                        */}
                        <Area
                            type="monotone"
                            dataKey="income"
                            stroke="#CCF300"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorIncome)"
                        />

                        <Area
                            type="monotone"
                            dataKey="expense"
                            stroke="#111827"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorExpense)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
