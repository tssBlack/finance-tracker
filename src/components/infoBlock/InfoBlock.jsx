import { icons } from "lucide-react";

function InfoBlock({description, title, icon: IconComponent}) {

    const descriptionConfig = {
        Income: {
            bgClass: 'bg-[var(--bg-success)]',
            textClass: 'text-[var(--color-success)]'
        },
        Expenses: {
            bgClass: 'bg-[var(--bg-unsuccess)]',
            textClass: 'text-[var(--color-unsuccess)]'
        },
        Transactions: {
            bgClass: 'bg-[var(--bg-accent)]',
            textClass: 'text-[var(--color-accent)]'
        }
    };

    const config = descriptionConfig[description] || descriptionConfig.Transactions;

    return(
        <div className="border-[var(--border-color)] border bg-secondary rounded-xl flex justify-between p-4 items-start">
            <div>
                <p className="text-[var(--color-muted)]">{description}</p>
                <h3 className="text-[var(--color-primary)] font-bold text-3xl">{title}</h3>
            </div>
            <div className={`p-2 rounded-xl ${config.bgClass}`}>
                <span className={config.textClass}>{IconComponent}</span>
            </div>
        </div>
    )
}

export default InfoBlock;