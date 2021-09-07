import { Expense } from "../contexts/ExpenseContext"

let expenseList: Array<Expense> = [{
    id: "1",
    label: 'Spesa alì',
    amount: 28
}, {
    id: "2",
    label: 'Torneo taggì',
    amount: 10
}, {
    id: "3",
    label: 'Birrozza',
    amount: 4
}, ]

export const ExpenseApi = {
    fetchExpenses(): Promise<Array<Expense>> {
        console.log('Fetching expenses...')
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('Fetch complete...')
                resolve(expenseList)
            }, 1000)
        })
    },
    addExpense(exp: Expense): Promise<Array<Expense>> {
        console.log('Adding expense')
        expenseList.push(exp)
        return this.fetchExpenses()
    },
    deleteExpense(exp: Expense): Promise<Array<Expense>> {
        console.log('Deleting expenses...')
        expenseList = expenseList.filter(e => e.id !== exp.id)
        return this.fetchExpenses()
    }
}