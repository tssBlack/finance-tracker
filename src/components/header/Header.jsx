import { TrendingUp, TrendingDown, Plus  } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { toggle } from '../../store/slices/toggleSlice';
import { selectTotals, selectTransactions } from '../../store/slices/addTransaction/addTransactionSlice';

function Header() {

    const isActive = useSelector(state => state.toggle.isActive)
    const { balance } = useSelector(selectTotals);
    const transactions = useSelector(selectTransactions);

    // Calculate current and previous month balances (income - expenses)
    const now = dayjs();
    const previousMonth = now.subtract(1, 'month');

    let currentMonthBalance = 0;
    let previousMonthBalance = 0;

    for (const t of transactions) {
        const d = dayjs(t.dateISO);
        const delta = t.type === 'Income' ? t.amount : -t.amount;
        if (d.isSame(now, 'month')) currentMonthBalance += delta;
        else if (d.isSame(previousMonth, 'month')) previousMonthBalance += delta;
    }

    // Month-over-month percent change
    const rawChange = currentMonthBalance - previousMonthBalance;
    const isUp = rawChange >= 0;
    const percentChange = previousMonthBalance !== 0
        ? (rawChange / Math.abs(previousMonthBalance)) * 100
        : (currentMonthBalance === 0 ? 0 : 100);

    const percentLabel = `${isUp ? '+' : ''}${Math.abs(percentChange).toFixed(1)}%`;
    const badgeBgClass = isUp ? 'bg-[var(--bg-success)]' : 'bg-[var(--bg-unsuccess)]';

    const dispatch = useDispatch();

    const handeToggle = () => {
        dispatch(toggle());
    }


    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-[var(--color-primary)] font-bold text-3xl">Dashboard</h1>
                    <p className="text-[var(--color-muted)]">Overview of your financial activity</p>
                </div>
                <button className={`
                flex gap-2 bg-[var(--btn-create)] text-[var(--color-secondary)]
                h-fit py-3 px-6 rounded-xl cursor-pointer
                hover:bg-[var(--btn-create-hover)] transition-all duration-200
                ${isActive ? 'active' : ''}
                `}
                onClick={handeToggle}
                >
                    <Plus/>
                    <span>Add Transaction</span>
                </button>
            </div>
            <div className="rounded-xl bg-[image:var(--bg-purple)] p-8 flex justify-between">
                <div className='flex flex-col gap-4'>
                    <span className="text-[var(--color-invisible)] font-bold">Total Balance</span>
                    <span className="text-[var(--color-secondary)] font-bold text-6xl">${balance.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                    <span className="text-[var(--color-invisible)]">{balance >= 0 ? 'Great job! Month over month change' : 'Внимание: баланс отрицательный. Проверьте расходы за месяц'}</span>
                </div>
                <div className={`rounded-4xl text-[var(--color-secondary)] text-[0.9rem] font-bold ${badgeBgClass} flex gap-0.5 h-fit px-3 py-2 items-center`}>
                    <span>{isUp ? <TrendingUp size={'1rem'}/> : <TrendingDown size={'1rem'}/>}</span>
                    <span>{percentLabel}</span>              
                </div>
            </div>
        </div>
    )
}

export default Header;