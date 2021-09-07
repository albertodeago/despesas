import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user'
import expensesReducer from '../features/expenses'

const store = configureStore({
    reducer: {
        user: userReducer,
        expenses: expensesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store