import React, { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { ExpenseCategoryApi,
    ExpenseGroup, ExpenseGroupId, ExpenseGroupsApi
} from "../api"
import { SessionContext, UserId } from "../contexts"

export function CreateCategory() {
    const session = useContext(SessionContext)
    const ownerId = session!.user!.id
    const history = useHistory()
    const [loading, setLoading] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [selectedGroup, setSelectedGroup] = useState<ExpenseGroup | null>(null)
    const [groups, setGroups] = useState<Array<ExpenseGroup>>([])
    const [color, setColor] = useState<string>('')
    const [keywords, setKeywords] = useState<Array<string>>([])

    useEffect(() => {
        ExpenseGroupsApi.fetch(ownerId)
            .then(res => {
                setSelectedGroup(res[0])
                setGroups(res)
            })
            .catch(err => alert("Error fetching groups " + err.message))
    }, [])

    const createCategory = async(params: {name: string, keywords: Array<string>, color: string, groupId: ExpenseGroupId}) => {
        setLoading(true)
        try {
            const newCategory = ExpenseCategoryApi.create(Object.assign({}, params, {ownerId, groupId: params.groupId}))
            console.log("Category created")
            // history.push("/") TODO: redirect somewhere
        } catch(error: any) {
            alert('Something went wrong creating the category ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const onGroupChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const group = JSON.parse(evt.target.value) as ExpenseGroup
        console.log("group change", group)
        setSelectedGroup(group)
    }

    return (
        <div>
            <h3>Create a category</h3>

            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="color">Color</label>
                <input
                    id="color"
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="keywords">Keywords (comma separated)</label>
                <input
                    id="keywords"
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value.split(",").map(a => a.trim()))}
                />
            </div>
            <div>
                <select name="groups" id="groups" /*value={selectedGroup?.id}*/ onChange={(evt) => onGroupChange(evt) }>
                    {
                        groups.map((g: ExpenseGroup) => (
                            <option key={g.id} value={JSON.stringify(g)}>{g.name}</option>
                        ))
                    }
                </select>
            </div>

            <div>
                <button
                    className="button block primary"
                    onClick={() => createCategory({ name, color, keywords, groupId: selectedGroup!.id })}
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Create'}
                </button>
            </div>

        </div>
    )
}