import { useSelector, useDispatch } from 'react-redux';
import { selectTransactions, deleteTransaction } from '../../store/slices/addTransaction/addTransactionSlice';
import { Trash2 } from 'lucide-react';
import dayjs from 'dayjs';

function Transactions() {
    const items = useSelector(selectTransactions);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-4 p-8">
            <h3 className="text-[var(--color-primary)] font-bold text-3xl">Recent Transactions</h3>
            <div className="flex flex-col divide-y divide-[var(--border-color)]">
                {items.map((t) => (
                    <div key={t.id} className="flex items-center justify-between py-4">
                        <div className="flex flex-col">
                            <span className="text-[var(--color-primary)] font-semibold">{t.description || t.category}</span>
                            <span className="text-[var(--color-muted)] text-sm">{dayjs(t.dateISO).format('MMM D, YYYY')}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`${t.type === 'Income' ? 'text-[var(--color-success)]' : 'text-[var(--color-unsuccess)]'} font-semibold`}>
                                {t.type === 'Income' ? '+' : '-'}${t.amount.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}
                            </span>
                            <span className="rounded-full border px-3 py-1 text-xs text-[var(--color-muted)] border-[var(--border-color)]">
                                {t.category}
                            </span>
                            <button
                                className="text-[var(--color-muted)] hover:text-[var(--color-unsuccess)] transition-colors"
                                onClick={() => dispatch(deleteTransaction(t.id))}
                                aria-label="Delete transaction"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ); 
}

export default Transactions;