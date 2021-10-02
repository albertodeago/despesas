import { useContext, useEffect, useState } from "react";
import { GroupsContext, SessionContext, CategoriesContext } from ".";
import { ExpenseCategory, ExpenseCategoryApi } from "../api";

interface CategoriesProviderProps {
    children: React.ReactElement,
    setLoading: (arg0: boolean) => void
}
export function CategoriesProvider(props: CategoriesProviderProps) {
    const session = useContext(SessionContext)
    const groups = useContext(GroupsContext)
    
    const [categories, setCategories] = useState<ExpenseCategory[]>([])

    useEffect(() => {
        console.log("CategoriesProvider::useEffect::fetching categories")
        if (groups && groups.length) {
            const promises = groups.map(g => ExpenseCategoryApi.fetch(g))
            Promise.all(promises).then(res => {
                console.log("categories", res)
                setCategories(res.flat());
                props.setLoading(false);
            }).catch(error => alert('Error fetching categories ' + error.message))
        }
    }, [groups])

    return (
        <CategoriesContext.Provider value={categories}>
            { props.children }
        </CategoriesContext.Provider>
    )
}