import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useSelector } from 'react-redux';
import { selectSpendingByCategoryData } from '../../store/slices/addTransaction/addTransactionSlice';

const colors = ['#2463eb', '#00C49F', '#FFBB28', '#FF8042', '#af57db', '#21c45d', '#dc2828'];

function SpendingByCategory() {
    const data = useSelector(selectSpendingByCategoryData);
    return (
        <div className="bg-secondary border border-[var(--border-color)] rounded-xl p-4">
            <h4 className="text-[var(--color-primary)] font-semibold mb-4">Spending by Category</h4>
            <PieChart width={500} height={250}>
                <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value" nameKey="name" label>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    )
}

export default SpendingByCategory;