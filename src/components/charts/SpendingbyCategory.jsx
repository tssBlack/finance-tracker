import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function SpendingByCategory() {
    return (
        <PieChart width={500} height={250}>
        <Pie data={data} cx="50%" cy="50%" outerRadius={80} label>
            {
            data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]}/>
            ))
            }
        </Pie>
        </PieChart>
    )
}

export default SpendingByCategory;