import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from './slices/toggleSlice'
import transactionsReducer from './slices/addTransaction/addTransactionSlice'

const store = configureStore({
  reducer: {
        toggle: toggleSlice,
        transactions: transactionsReducer,
    },
})

export default store;