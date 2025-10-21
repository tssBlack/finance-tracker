import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';
import { selectIncomeVsExpensesData } from '../../store/slices/addTransaction/addTransactionSlice';

function IncomeVsExpense() {
    const data = useSelector(selectIncomeVsExpensesData);
    return (
        <div className="bg-secondary border border-[var(--border-color)] rounded-xl p-4">
            <h4 className="text-[var(--color-primary)] font-semibold mb-4">Income vs Expenses</h4>
            <AreaChart width={500} height={250} data={data}>
                <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#21c45d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#21c45d" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc2828" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#dc2828" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="label" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="income" stroke="#21c45d" fillOpacity={1} fill="url(#colorIncome)" name="income" />
                <Area type="monotone" dataKey="expenses" stroke="#dc2828" fillOpacity={1} fill="url(#colorExpenses)" name="expenses" />
            </AreaChart>
        </div>
    );
}

export default IncomeVsExpense;