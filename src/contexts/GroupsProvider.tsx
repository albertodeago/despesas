import { useContext, useEffect, useState } from "react";
import { GroupsContext, SessionContext } from ".";
import { ExpenseGroup, ExpenseGroupsApi } from "../api";

export function GroupsProvider(props: any) {
    const session = useContext(SessionContext)
    const [groups, setGroups] = useState<ExpenseGroup[]>([])

    useEffect(() => {
        if (session?.user || false) {
            ExpenseGroupsApi.fetch(session.user.id)
                .then(groups => {
                    setGroups(groups)
                    props.setLoading(false)
                })
                .catch(error => alert('Error fetching groups ' + error.message))
        }
    }, [props])

    return (
        <GroupsContext.Provider value={groups}>
            { props.children }
        </GroupsContext.Provider>
    )
}