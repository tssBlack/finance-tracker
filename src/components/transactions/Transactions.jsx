import { useSelector } from 'react-redux';
import { selectTransactions } from '../../store/slices/addTransaction/addTransactionSlice';

function Transactions() {
    const transactions = useSelector(selectTransactions);
    return (
        <div className="flex flex-col gap-4 p-8">
            <h3 className="text-[var(--color-primary)] font-bold text-3xl">Recent Transactions</h3>
            <div className="flex flex-col divide-y divide-[var(--border-color)]">
                {transactions.map((t) => (
                    <div key={t.id} className="flex items-center justify-between py-4">
                        <div className="flex flex-col">
                            <span className="text-[var(--color-primary)] font-semibold">{t.description}</span>
                            <span className="text-[var(--color-muted)]">{new Date(t.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`${t.type === 'Income' ? 'text-[var(--color-success)]' : 'text-[var(--color-unsuccess)]'} font-semibold`}>
                                {t.type === 'Income' ? '+' : '-'}${t.amount.toFixed(2)}
                            </span>
                            <span className="rounded-full bg-[var(--bg-accent)] text-[var(--color-accent)] px-3 py-1 text-sm">{t.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ); 
}

export default Transactions;