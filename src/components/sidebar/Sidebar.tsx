import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "./sidebar.css";
import React from "react";

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
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const onClick = () => setIsOpen(false);
  const handleStateChange = (state: { isOpen: boolean }) =>
    setIsOpen(state.isOpen);

  return (
    <Menu isOpen={isOpen} onStateChange={(state) => handleStateChange(state)}>
      <nav>
        <ul>
          <SidebarLink onClick={onClick} to="/" label="Home" />
          <SidebarLink onClick={onClick} to="login" label="Login" />
          <SidebarLink onClick={onClick} to="account" label="Account" />
        </ul>
      </nav>
    </Menu>
  );
}
