import React from "react"

export interface Expense {
    id: string,
    label: string,
    amount: number
} 

export type ExpenseContextType = {
    expenseList: Array<Expense>,
    addExpense: (exp: Expense) => void,
    deleteExpense: (exp: Expense) => void
}

export const ExpenseContext = React.createContext<ExpenseContextType>({
    expenseList: [],
    addExpense: (exp: Expense) => ({}),
    deleteExpense: (exp: Expense) => ({})
})