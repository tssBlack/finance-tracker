import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useSelector } from 'react-redux';
import { selectExpenseByCategory } from '../../store/slices/addTransaction/addTransactionSlice';

const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6', '#f97316', '#84cc16', '#06b6d4'];

function SpendingByCategory() {
    const data = useSelector(selectExpenseByCategory);
    return (
        <PieChart width={500} height={250}>
            <Pie data={data} cx="50%" cy="50%" outerRadius={80} label dataKey="value">
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    )
}

export default SpendingByCategory;