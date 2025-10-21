import { X, Home, ShoppingCart, Car, Utensils, Film, Heart, BookOpen, Zap, MoreHorizontal } from 'lucide-react';
import { InputLabel, MenuItem, Select, FormControl, TextField, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../../store/slices/toggleSlice';
import { useState } from 'react';

function CreateTransaction() {
    dayjs.extend(advancedFormat);
    const transactionType = ['Income', 'Expense'];
    const categories = [
        { name: "Rent", icon: <Home size={18} /> },
        { name: "Groceries", icon: <ShoppingCart size={18} /> },
        { name: "Transport", icon: <Car size={18} /> },
        { name: "Food", icon: <Utensils size={18} /> },
        { name: "Entertainment", icon: <Film size={18} /> },
        { name: "Healthcare", icon: <Heart size={18} /> },
        { name: "Education", icon: <BookOpen size={18} /> },
        { name: "Utilities", icon: <Zap size={18} /> },
        { name: "Other", icon: <MoreHorizontal size={18} /> }
    ];
    const isActive = useSelector(state => state.toggle.isActive)

    const dispatch = useDispatch();

    const handeToggle = () => {
        dispatch(toggle());
    }

    const [type, setType] = useState('Expense');

    const handleChangeType = (event) => {
        setType(event.target.value);
    };

    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(dayjs());

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    return (
        <div className={`bg-[var(--bg-dark)] fixed z-10 right-full w-full h-screen flex justify-end top-0
        menuOpen
        ${isActive ? 'active' : ''}`}>
            <div className="z-[100] bg-[var(--color-secondary)] w-full sm:w-2/5 md:w-1/3 lg:w-1/4 h-screen p-6
            flex flex-col gap-6 overflow-y-auto">
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
                    <FormControl fullWidth>
                        <InputLabel id="transaction-type-label">Transaction Type</InputLabel>
                        <Select
                            labelId="transaction-type-label"
                            value={type}
                            label="Transaction Type"
                            onChange={handleChangeType}
                        >
                            {transactionType.map((el, index) => (
                                <MenuItem
                                    key={index}
                                    value={el}
                                    sx={{
                                        '&': {
                                            border: '2px solid rgba(255, 255, 255, 0)',
                                            borderRadius: '5px',
                                            margin: '5px'
                                        },
                                        '&:hover': {
                                            border: '2px solid var(--btn-create-hover)'
                                        },
                                        '&.Mui-selected': {
                                            backgroundColor: 'var(--btn-create)'
                                        },
                                        '&.Mui-selected:hover': {
                                            backgroundColor: 'var(--btn-create-hover)'
                                        }
                                    }}
                                >
                                    {el}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Amount"
                        variant="outlined"
                        type="number"
                        inputProps={{ step: '0.01', min: 0 }}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        fullWidth
                    />

                    <FormControl fullWidth>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            value={category}
                            label="Category"
                            onChange={handleChangeCategory}
                            displayEmpty
                            renderValue={(selected) =>
                                selected && selected.length > 0 ? (
                                    selected
                                ) : (
                                    <span style={{ color: 'var(--color-muted)' }}>Select category</span>
                                )
                            }
                            sx={{
                                '& .MuiSelect-select': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }
                            }}
                        >
                            {categories.map((el, index) => (
                                <MenuItem
                                    key={index}
                                    value={el.name}
                                    sx={{
                                        '&': {
                                            border: '2px solid rgba(255, 255, 255, 0)',
                                            borderRadius: '5px',
                                            margin: '5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem'
                                        },
                                        '&:hover': {
                                        	border: '2px solid var(--btn-create-hover)'
                                        },
                                        '&.Mui-selected': {
                                            backgroundColor: 'var(--btn-create)'
                                        },
                                        '&.Mui-selected:hover': {
                                            backgroundColor: 'var(--btn-create-hover)'
                                        }
                                    }}
                                >
                                    {el.icon} {el.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Description"
                        variant="outlined"
                        placeholder="Enter transaction details..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        multiline
                        minRows={3}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            format="MMMM Do, YYYY"
                            slotProps={{
                                textField: {
                                    fullWidth: true
                                }
                            }}
                        />
                    </LocalizationProvider>

                    <Button
                        variant="contained"
                        onClick={handeToggle}
                        sx={{
                            mt: 2,
                            textTransform: 'none',
                            bgcolor: 'var(--btn-create)',
                            '&:hover': {
                                bgcolor: 'var(--btn-create-hover)'
                            }
                        }}
                    >
                        Add Transaction
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CreateTransaction;