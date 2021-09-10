import { useState, useContext } from "react"
import { useHistory } from "react-router"
import { ExpenseGroupsApi } from "../api"
import { SessionContext, UserId } from "../contexts"

export function CreateGroup() {
    const session = useContext(SessionContext)
    const ownerId = session!.user!.id
    const history = useHistory()
    const [loading, setLoading] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [partecipants, setPartecipants] = useState<Array<UserId>>([ownerId])

    const createGroup = async(params: {name: string, partecipants: Array<UserId>}) => {
        setLoading(true)
        try {
            const newGroup = ExpenseGroupsApi.create(Object.assign({}, params, {owner: ownerId}))
            console.log("Group created")
            // history.push("/") TODO: redirect to the group detail page
        } catch(error: any) {
            alert('Something went wrong creating the group ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h3>Create a group</h3>

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
                <label htmlFor="partecipants">Partecipants</label>
                <input
                    id="partecipants"
                    type="text"
                    disabled
                    value={partecipants}
                    // onChange={(e) => setPartecipants(e.target.value)}
                />
            </div>

            <div>
                <button
                    className="button block primary"
                    onClick={() => createGroup({ name, partecipants })}
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Create'}
                </button>
            </div>

        </div>
    )
}