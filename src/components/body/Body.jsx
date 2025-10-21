import InfoBlock from "../infoBlock/InfoBlock"
import {ArrowDownRight, ArrowUpRight, Wallet} from 'lucide-react'
import SpendingByCategory from "../charts/SpendingbyCategory";
import IncomeVsExpense from "../charts/IncomeVsExpenses";

function Body() {
    return(
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-3 gap-4">
                <InfoBlock description={"Income"} title={"$4,000.00"} icon={<ArrowUpRight size={'1.5rem'}/>}/>
                <InfoBlock description={"Expenses"} title={"$1,680.00"} icon={<ArrowDownRight size={'1.5rem'}/>}/>
                <InfoBlock description={"Transactions"} title={"6"} icon={<Wallet size={'1.5rem'}/>}/>
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

            </div>
        </div>
    )
}

export default Body;