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
    setGroupList(providedGroups);
    props.setSelectedGroup(providedGroups[0]);
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
