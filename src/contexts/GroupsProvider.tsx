import { useContext, useEffect, useState } from "react";
import { GroupsContext, SessionContext } from ".";
import { ExpenseGroup, ExpenseGroupsApi } from "../api";

interface GroupsProviderProps {
    children: React.ReactElement,
    setLoading: (arg0: boolean) => void
}
export function GroupsProvider(props: GroupsProviderProps) {
    const session = useContext(SessionContext)
    const [groups, setGroups] = useState<ExpenseGroup[]>([])

    useEffect(() => {
        console.log("GroupsProvider::useEffect::fetching groups")
        if (session?.user || false) {
            ExpenseGroupsApi.fetch(session.user.id)
                .then(groups => {
                    setGroups(groups)
                    props.setLoading(false)
                })
                .catch(error => alert('Error fetching groups ' + error.message))
        }
    }, [session])

    return (
        <GroupsContext.Provider value={groups}>
            { props.children }
        </GroupsContext.Provider>
    )
}