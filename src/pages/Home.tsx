import React from 'react'
import { ExpenseContext, Expense } from "../contexts/ExpenseContext";


interface HomeState {
    label: string,
    amount: number
}

function makeid(length = 6) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
    }
    return result;
}

export class Home extends React.Component<{}, HomeState> {

    constructor(props: {}) {
        super(props)

        this.handleLabel = this.handleLabel.bind(this)
        this.handleAmount = this.handleAmount.bind(this)
        this.onAddExpense = this.onAddExpense.bind(this)
        this.state = {
            label: '',
            amount: 0
        }
    }

    handleLabel(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            label: e.target!.value
        })
    }

    handleAmount(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            amount: parseInt(e.target!.value)
        })
    }

    onAddExpense(e: React.FormEvent<HTMLFormElement>, addExpense: Function) {
        e.preventDefault()

        const id = makeid()
        addExpense({
            id,
            label: this.state.label,
            amount: this.state.amount
        })

        this.setState({
            label: '',
            amount: 0
        })
    }

    render() {
        const loadingExpenses = () => (
            <li>Loading data...</li>
        )
        const noExpenses = () => (
            <li>No expenses yet</li>
        )
        const expenses = (expenseList: Array<Expense>, deleteExpense: Function) => (
            expenseList.map(expense => (
                <li key={expense.id}>
                    {expense.label}: <b>{expense.amount}</b> <span onClick={() => deleteExpense(expense)}>x</span>
                </li>
            ))
        )
        return (
            <ExpenseContext.Consumer>
                {({ expenseList, isLoading, addExpense, deleteExpense }) => (
                    <div>
                        <h3>Expense list</h3>
                        <ul>
                            {isLoading
                                ? (loadingExpenses())
                                : (expenseList.length === 0
                                    ? (noExpenses())
                                    : (expenses(expenseList, deleteExpense))
                                )
                            }
                        </ul>
                        <form onSubmit={(e) => this.onAddExpense(e, addExpense)}>
                            <label>
                                Text:
                                <input type="text" value={this.state.label} onChange={this.handleLabel} />
                            </label>
                            <label>
                                Amount:
                                <input id="amount" value={this.state.amount} onChange={this.handleAmount} />
                            </label>
                            <input type="submit" value="Add expense" />
                        </form>
                    </div>
                )}
            </ExpenseContext.Consumer>   
        )
    }
}