import { TrendingUp, TrendingDown, Plus  } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../../store/slices/toggleSlice';

function Header() {

    const isActive = useSelector(state => state.toggle.isActive)

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
                    <span className="text-[var(--color-secondary)] font-bold text-6xl">$2,320.00</span>
                    <span className="text-[var(--color-invisible)]">Great job! Month over month change</span>
                </div>
                <div className="rounded-4xl text-[var(--color-secondary)] text-[0.9rem] font-bold bg-[var(--bg-success)] flex gap-0.5 h-fit px-3 py-2 items-center">
                    <span><TrendingUp size={'1rem'}></TrendingUp></span>
                    <span>+58.0%</span>              
                </div>
            </div>
        </div>
    )
}

export default Header;