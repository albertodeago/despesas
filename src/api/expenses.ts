import { Expense } from "../features/expenses"

const list = [{
    id: '1',
    label: 'spesa Alì',
    amount: 12
}, {
    id: '2',
    label: 'Torneo Taggì',
    amount: 7
}, {
    id: '3',
    label: 'Birrozza',
    amount: 4
}]

export const ExpensesApi = {
    fetch() {
        return new Promise(resolve => {
            setTimeout(() => resolve(list.slice()), 1500)
        })
    },
    add(e: Expense): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, 1500)
        })
    },
    remove(): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => resolve(), 1500)
        })
    }
}