import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';
import { buildIncomeVsExpensesSeries } from '../../store/slices/addTransaction/addTransactionSlice';

function IncomeVsExpense() {
    const data = useSelector(buildIncomeVsExpensesSeries);
    return (
        <AreaChart width={500} height={250} data={data}>
            <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="income" stroke="#22c55e" fillOpacity={1} fill="url(#colorIncome)" />
            <Area type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpenses)" />
        </AreaChart>
    );
}

export default IncomeVsExpense;