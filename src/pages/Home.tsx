import { useState, useEffect } from 'react'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store'
import { add, remove, Expense, fetchExpenses, addExpense } from '../features/expenses'

const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const makeId = (length = 6) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
    }
    return result; 
}

export function Home() {
    const list = useAppSelector(state => state.expenses.list)
    const dispatch = useAppDispatch()
    const [label, setLabel] = useState('')
    const [amount, setAmount] = useState('')

    const expensesStatus = useAppSelector(state => state.expenses.status)

    useEffect(() => {
        if (expensesStatus === 'idle') {
            dispatch(fetchExpenses())
        }
    }, [expensesStatus, dispatch])

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch(addExpense({
            id: makeId(),
            label,
            amount: parseInt(amount)
        }))
        setLabel('')
        setAmount('')
    }

    return (
        <div>
            <h3>Home</h3>
            <ul>
                {expensesStatus === 'loading'
                    ? <div>Loading, please wait</div>
                    : list.length === 0
                        ? <li>No expenses yet</li>
                        : (list.map((exp: Expense) => (
                            <li key={exp.id}>{exp.label}: <b>{exp.amount}</b> <span onClick={() => dispatch(remove(exp.id))}>x</span></li>
                        )))
                }
            </ul>

            <form onSubmit={(e) => submit(e)}>
                <label>
                    Label:
                    <input type="text" value={label} onChange={e => setLabel(e.target.value)} />
                </label>
                <label>
                    Amount:
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                </label>
                <input type="submit" value="Add" />
            </form>
        </div>
    )
}