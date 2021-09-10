import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ExpenseCategoryApi, ExpenseCategory } from "../api"

export function CategoryList(props: any) {
    const [loading, setLoading] = useState(false)
    const [categoryList, setCategoryList] = useState<Array<ExpenseCategory>>([])
    
    useEffect(() => {
        console.log("CategoryList::useEffect - loading category list")
        if (props.selectedGroup?.id !== 'all-group-item') {
            const getCategoryList = async() => {
                setLoading(true)
                try {
                    const data = await ExpenseCategoryApi.fetch(props.selectedGroup.id)
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
            getCategoryList()
        } else {
            setCategoryList([])
        }
    }, [props.selectedGroup])

    return (
        <div>
            <h4>Category list</h4>
            <ul>
                { loading
                    ? <li>Loading categories...</li>
                    : (
                        categoryList.length === 0
                        ? <li>No categories yet</li>
                        : categoryList.map((category: ExpenseCategory) => (
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