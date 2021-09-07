import React from "react"

export interface Expense {
    id: string,
    label: string,
    amount: number
} 

export type ExpenseContextType = {
    expenseList: Array<Expense>,
    isLoading: boolean,
    addExpense: (exp: Expense) => void,
    deleteExpense: (exp: Expense) => void
}

export const ExpenseContext = React.createContext<ExpenseContextType>({
    expenseList: [],
    isLoading: false,
    addExpense: (exp: Expense) => ({}),
    deleteExpense: (exp: Expense) => ({})
})