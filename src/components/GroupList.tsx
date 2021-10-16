import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { GroupsContext, SessionContext } from "../contexts";
import { ExpenseGroup } from "../api/GroupApi";

type GroupListProps = {
  setSelectedGroup: Function;
  selectedGroup: ExpenseGroup | null;
};

export function GroupList(props: GroupListProps) {
  const session = useContext(SessionContext);
  const providedGroups = useContext(GroupsContext);
  const [groupList, setGroupList] = useState<ExpenseGroup[]>([]);

  useEffect(() => {
    // TODO: is this right here or should it be in the provider?
    const allGroupItem: ExpenseGroup = {
      id: "all-group-item",
      created_at: Date.now(),
      image_url: "",
      name: "Expenses of all groups",
      owner: session!.user!.id,
      partecipants: [session!.user!.id],
      updated_at: Date.now(),
    };
    const allGroups = [allGroupItem].concat(providedGroups);
    setGroupList(allGroups);
    props.setSelectedGroup(allGroups[0]);
  }, [session, providedGroups]);

  return (
    <div>
      <h4>Group list</h4>
      <ul>
        {groupList.map((group: ExpenseGroup) => (
          <li key={group.id} onClick={() => props.setSelectedGroup(group)}>
            {props.selectedGroup === group ? <b>{group.name}</b> : group.name}
          </li>
        ))}
        <li>
          <Link to="/create-group">Create a group</Link>
        </li>
      </ul>
    </div>
  );
}
