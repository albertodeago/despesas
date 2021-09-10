import { useState, useEffect, useContext } from "react"
import { PostgrestError } from "@supabase/postgrest-js"
import { supabase } from "../supabaseClient"
import { SessionContext } from "../contexts"
import { ExpenseGroupsApi } from "../api"

export function ExpenseList(props: any) {
    const session = useContext(SessionContext)

    const [loading, setLoading] = useState(false)
    const [expenseList, setExpenseList] = useState([])
    
    useEffect(() => {
        if (session?.user && props.selectedGroup) {
            getExpenseList(session.user.id)
        }
    }, [session, props.selectedGroup])

    const getExpenseList = async(userId: string) => {
        try {
            setLoading(true)
            const isAllGroups = props.selectedGroup.id === 'all-group-item'

            let data: Array<any> // TODO: type
            let error: PostgrestError | null
            let status: number
            let result

            // fetch all the user groups
            const allGroups = await ExpenseGroupsApi.fetch(userId)
            console.log("All users groups: ", allGroups.map(a =>({name: a.name, id: a.id})))

            if (isAllGroups) {
                result = await supabase
                    .from('expenses')
                    .select('*')
                    .in('group_id', allGroups.map(g => g.id))
            } else {
                result = await supabase
                    .from('expenses')
                    .select('*')
                    .eq('group_id', props.selectedGroup.id)
            }
            data = result.data!
            error = result.error
            status = result.status
            
            if (error && status !== 406) {
                throw error
            }
            if (data) {
                console.log("Expenses:", data)
                setExpenseList(data as [])
            }
        } catch(error:any) {
            alert('Something went wrong fetching the expense list' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const emptyExpenseListEl = () => <li>No expenses yet</li>
    const expenseListEl = () => expenseList.map((exp: any) => ( // TODO: no any dai
        <li key={exp.id}>{exp.name} - {exp.amount}</li>
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