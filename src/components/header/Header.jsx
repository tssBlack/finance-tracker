import { TrendingUp, TrendingDown, Plus  } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../../store/slices/toggleSlice';
import { selectTotals, selectMonthOverMonth } from '../../store/slices/addTransaction/addTransactionSlice';

function Header() {

    const isActive = useSelector(state => state.toggle.isActive)
    const { balance } = useSelector(selectTotals)
    const { percent } = useSelector(selectMonthOverMonth)

    const isNegativeBalance = balance < 0
    const formattedBalance = `${isNegativeBalance ? '-' : ''}$${Math.abs(balance).toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}`
    const isUp = percent >= 0
    const badgeBgClass = isUp ? 'bg-[var(--bg-success)]' : 'bg-[var(--bg-unsuccess)]'
    const changeText = isUp ? 'Sad story :(' : 'Good Job!'
    const percentText = `${isUp ? '+' : ''}${Math.abs(percent).toFixed(1)}%`
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
                    <span className="text-[var(--color-secondary)] font-bold text-6xl">{formattedBalance}</span>
                    <span className="text-[var(--color-invisible)]">{changeText}</span>
                </div>
                <div className={`rounded-4xl text-[var(--color-secondary)] text-[0.9rem] font-bold ${badgeBgClass} flex gap-0.5 h-fit px-3 py-2 items-center`}>
                    <span>{isUp ? <TrendingUp size={'1rem'}/> : <TrendingDown size={'1rem'}/>}</span>
                    <span>{percentText}</span>
                </div>
            </div>
        </div>
    )
}

export default Header;