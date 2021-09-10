import React, { useState, useContext } from "react"
import {
    ExpenseCategoryApi,
    ExpenseGroup, ExpenseGroupId
} from "../api"
import { SessionContext, GroupsContext } from "../contexts"

export function CreateCategory() {
    const session = useContext(SessionContext)
    const ownerId = session!.user!.id
    
    const groups = useContext(GroupsContext)
    
    const [loading, setLoading] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [selectedGroup, setSelectedGroup] = useState<ExpenseGroup>(groups[2])
    const [color, setColor] = useState<string>('')
    const [keywords, setKeywords] = useState<Array<string>>([])

    const createCategory = async(params: {name: string, keywords: Array<string>, color: string, groupId: ExpenseGroupId}) => {
        setLoading(true)
        try {
            await ExpenseCategoryApi.create(Object.assign({}, params, {ownerId, groupId: params.groupId}))
            console.log("CreateCategory::createCategory - category created")
        } catch(error: any) {
            alert('Something went wrong creating the category ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const onGroupChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const group = JSON.parse(evt.target.value) as ExpenseGroup
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
                    type="color"
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
                <label htmlFor="groups">For which group</label>
                <select name="groups" id="groups" value={JSON.stringify(selectedGroup)} onChange={(evt) => onGroupChange(evt) }>
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