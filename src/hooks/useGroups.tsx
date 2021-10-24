import { useState, useContext } from "react";
import { ExpenseGroup } from "../api";
import { GroupsContext } from "../contexts";

export const useGroups = function () {
  const groups = useContext(GroupsContext);
  const [selectedGroup, setSelectedGroup] = useState<ExpenseGroup>(groups[0]);

  if (!groups || groups.length === 0) {
    throw new Error("No groups inside useGroup hook, something is wrong");
  }

  if (!selectedGroup) {
    throw new Error(
      "No selected group inside useGroup hook, something is wrong"
    );
  }

  return { groups, selectedGroup, setSelectedGroup };
};
