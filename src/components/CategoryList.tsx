import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { SessionContext } from "../contexts"
import { ExpenseCategoryApi, ExpenseCategory } from "../api"

export function CategoryList(props: any) {
    const session = useContext(SessionContext)

    const [loading, setLoading] = useState(false)
    const [categoryList, setCategoryList] = useState<Array<ExpenseCategory>>([])
    
    useEffect(() => {
        console.log("loading category list")
        if (session?.user && props.selectedGroup?.id !== 'all-group-item') {
            getCategoryList()
        } else {
            setCategoryList([])
        }
    }, [session, props.selectedGroup])

    const getCategoryList = async() => {
        setLoading(true)
        try {
            const data = await ExpenseCategoryApi.fetch(props.selectedGroup.id)
            console.log(`Categories for ${props.selectedGroup.name}: ${data}`)
            setCategoryList(data && data.length
                ? (data as Array<ExpenseCategory>)
                : []
            )
        } catch(error: any) {
            alert("Error fetching categories " + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h4>Category list</h4>
            <ul>
                { loading
                    ? <li>Loading categories...</li>
                    : (
                        categoryList.length === 0
                        ? <li>No categories yet</li>
                        : categoryList.map((category: any) => ( // TODO: no any dai
                            <li
                                key={category.id}
                            >
                                {category.name}
                            </li>
                        ))
                    )
                }
                <li><Link to="/create-category">Create a category</Link></li>
            </ul>
        </div>
    )
}