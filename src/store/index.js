import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from './slices/toggleSlice'
import transactionsSlice from './slices/addTransaction/addTransactionSlice'

const store = configureStore({
  reducer: {
        toggle: toggleSlice,
        transactions: transactionsSlice,
    },
})

export default store;