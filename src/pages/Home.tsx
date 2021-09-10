import { useContext, useState } from "react"
import { SessionContext } from "../contexts"
import { GroupList } from "../components/GroupList"
import { ExpenseList } from "../components/ExpenseList"
import { CategoryList } from "../components/CategoryList"


export function Home() {
    const session = useContext(SessionContext)

    const [selectedGroup, setSelectedGroup] = useState(null)

    return (
        <div>
            <h3>Hi {session?.user?.id}</h3>
            <GroupList
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
            />
            {selectedGroup
                ? 
                (
                    <div>
                        <CategoryList
                            selectedGroup={selectedGroup}
                        />
                        <ExpenseList
                            selectedGroup={selectedGroup}
                        />
                    </div>
                )
                : <div></div>
            }
        </div>
    )
}