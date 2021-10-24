import { useContext, useEffect, useState } from "react";
import { GroupsContext, SessionContext } from ".";
import { ExpenseGroup, ExpenseGroupsApi } from "../api";

interface GroupsProviderProps {
  children: React.ReactElement;
  setLoading: (arg0: boolean) => void;
}
export function GroupsProvider(props: GroupsProviderProps) {
  const session = useContext(SessionContext);
  const [groups, setGroups] = useState<ExpenseGroup[]>([]);

  useEffect(() => {
    console.log("GroupsProvider::useEffect::fetching groups");
    if (session?.user) {
      ExpenseGroupsApi.fetch(session.user.id)
        .then((groups) => {
          const allGroupItem: ExpenseGroup = {
            id: "all-group-item",
            created_at: Date.now(),
            image_url: "",
            name: "Expenses of all groups",
            owner: session!.user!.id,
            partecipants: [session!.user!.id],
            updated_at: Date.now(),
          };

          setGroups([allGroupItem].concat(groups));
          props.setLoading(false);
        })
        .catch((error) => alert("Error fetching groups " + error.message));
    }
  }, [session]);

  return (
    <GroupsContext.Provider value={groups}>
      {props.children}
    </GroupsContext.Provider>
  );
}
