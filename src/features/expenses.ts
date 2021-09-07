import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import { ExpensesApi } from '../api/expenses' 

export interface Expense {
    id: string,
    label: string,
    amount: number
}

interface ExpenseState {
    list: Array<Expense>,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null | string
}

const initialState: ExpenseState = {
    list: [],
    status: 'idle',
    error: null
}

export const fetchExpenses = createAsyncThunk('expenses/fetch', async() => {
    console.log('Fetching expsenses')
    const res = await ExpensesApi.fetch()
    console.log('Result:', res)
    return res as Array<Expense>
})

export const addExpense = createAsyncThunk('expenses/add', async(exp: Expense) => {
    console.log('Adding expense', exp)
    await ExpensesApi.add(exp)
    return exp
})

export const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<Expense>) => {
            state.list.unshift(action.payload)
        },
        remove: (state, action: PayloadAction<string>) => {
            const i = state.list.findIndex(e => e.id === action.payload)
            state.list.splice(i, 1)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchExpenses.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.list = action.payload
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.status = 'failed'
                state.error = 'Error man'
            })
            .addCase(addExpense.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.list = state.list.slice().concat([action.payload])
            })
            .addCase(addExpense.rejected, (state, action) => {
                state.status = 'failed'
                state.error = 'Error man'
            })
    }
})

export const {
    add,
    remove
} = expenseSlice.actions
export const selectExpenses = (state: RootState) => state.expenses.list
export default expenseSlice.reducer