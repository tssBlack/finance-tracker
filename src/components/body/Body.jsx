import InfoBlock from "../infoBlock/InfoBlock"
import {ArrowDownRight, ArrowUpRight, Wallet} from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectIncomeTotal, selectExpensesTotal, selectTransactionsCount } from '../../store/slices/addTransaction/addTransactionSlice'
import SpendingByCategory from "../charts/SpendingbyCategory";
import IncomeVsExpense from "../charts/IncomeVsExpenses";
import Transactions from "../transactions/Transactions";

function Body() {
    const incomeTotal = useSelector(selectIncomeTotal)
    const expensesTotal = useSelector(selectExpensesTotal)
    const transactionsCount = useSelector(selectTransactionsCount)
    return(
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-3 gap-4">
                <InfoBlock description={"Income"} title={`$${incomeTotal.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}`} icon={<ArrowUpRight size={'1.5rem'}/>}/>
                <InfoBlock description={"Expenses"} title={`$${expensesTotal.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}`} icon={<ArrowDownRight size={'1.5rem'}/>}/>
                <InfoBlock description={"Transactions"} title={`${transactionsCount}`} icon={<Wallet size={'1.5rem'}/>}/>
            </div>

            <div className="grid gap-8 grid-cols-2">
                <div>
                    <SpendingByCategory/>
                </div>
                <div>
                    <IncomeVsExpense/>
                </div>
            </div>

            <div>
                <Transactions/>
            </div>
        </div>
    )
}

export default Body;