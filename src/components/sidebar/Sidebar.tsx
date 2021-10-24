import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "./sidebar.css";

import { useGroups } from "../../hooks";

interface SidebarLinkProps {
  onClick: () => void;
  to: string;
  label: string;
}
const SidebarLink: React.FC<SidebarLinkProps> = function ({
  onClick,
  to,
  label,
}) {
  return (
    <li onClick={onClick}>
      <Link to={to}>{label}</Link>
    </li>
  );
};

export function Sidebar() {
  const { groups, selectedGroup, setSelectedGroup } = useGroups();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const onClick = () => setIsOpen(false);
  const handleStateChange = (state: { isOpen: boolean }) =>
    setIsOpen(state.isOpen);

  return (
    <Menu isOpen={isOpen} onStateChange={(state) => handleStateChange(state)}>
      <nav>
        <ul>
          <SidebarLink onClick={onClick} to="account" label="Account" />
          <SidebarLink onClick={onClick} to="/" label="Home" />
          {groups.map((g) => (
            <li key={g.id} onClick={() => setSelectedGroup(g)}>
              {selectedGroup.id === g.id ? <b>{g.name}</b> : g.name}
            </li>
          ))}
        </ul>
      </nav>
    </Menu>
  );
}
