import { X } from 'lucide-react'
import { InputLabel, MenuItem, Select } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../../store/slices/toggleSlice';

function CreateTransaction() {
    const transactionType = ['Income', 'Expense'];

    const isActive = useSelector(state => state.toggle.isActive)

    const dispatch = useDispatch();

    const handeToggle = () => {
        dispatch(toggle());
    }


    return (
        <div className={`bg-[var(--bg-dark)] fixed z-10 right-full w-full flex justify-end top-0
        menuOpen
        ${isActive ? 'active' : ''}`}>
            <div className="z-[100] bg-[var(--color-secondary)] w-[40%] h-screen p-4
            flex flex-col gap-6">
                <div className='flex flex-col'>
                    <p className='text-[var(--color-muted)] flex justify-end'>
                        <X className='cursor-pointer' size={'1.5rem'}
                        onClick={handeToggle}/>
                    </p>
                    <div className='flex flex-col justify-start'>
                        <h2 className='text-[var(--color-primary)] font-bold text-2xl'>
                            Add New Transaction
                        </h2>
                        <p className='text-[var(--color-muted)]'>Fill in the details to add a new income or expense transaction</p>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <InputLabel>Transaction Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value='qqq'
                        label="Age"
                        onChange={handleChange}
                    >
                        {
                            transactionType.map((el, index) => {
                                return (
                                    <MenuItem selected key={index} value={el}>{el}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </div>
            </div>
        </div>
    );
}

export default CreateTransaction;