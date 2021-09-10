import { useState, useEffect, useContext } from "react"
import { supabase } from "../supabaseClient"
import { GroupsContext } from "../contexts"
import { ExpenseGroup } from "../api"

interface ExpenseListProps {
    selectedGroup: ExpenseGroup
}
export function ExpenseList(props: ExpenseListProps) {
    const groups = useContext(GroupsContext)

    const [loading, setLoading] = useState(false)
    const [expenseList, setExpenseList] = useState([])
    
    useEffect(() => {
        const getExpenseList = async() => {
            try {
                setLoading(true)
                const isAllGroups = props.selectedGroup.id === 'all-group-item'
                let result
    
                if (isAllGroups) {
                    result = await supabase
                        .from('expenses')
                        .select('*')
                        .in('group_id', groups.map(g => g.id))
                } else {
                    result = await supabase
                        .from('expenses')
                        .select('*')
                        .eq('group_id', props.selectedGroup.id)
                }
                let { data, error, status } = result
                
                if (error && status !== 406) {
                    throw error
                }
                if (data) {
                    console.log("ExpenseList::getExpenseList - got expenses", data)
                    setExpenseList(data as [])
                } else {
                    setExpenseList([])
                }
            } catch(error:any) {
                alert('Something went wrong fetching the expense list' + error.message)
            } finally {
                setLoading(false)
            }
        }
        getExpenseList()
    }, [groups, props.selectedGroup])

    const emptyExpenseListEl = () => <li>No expenses yet</li>
    const expenseListEl = () => expenseList.map((exp: any) => ( // TODO: no any dai
        <li key={exp.id}>{exp.name} - {exp.amount} ({exp.category_id})</li>
    ))
    return (
        <div>
            <h4>Expense list</h4>
            <ul>
                { loading
                    ? <li>Loading...</li>
                    : (
                        expenseList.length === 0
                            ? emptyExpenseListEl()
                            : expenseListEl()
                    )
                }
            </ul>
        </div>
    )
}