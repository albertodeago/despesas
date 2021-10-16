import { Link } from "react-router-dom";

export function Nav() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="login">Login</Link>
          </li>
          <li>
            <Link to="account">Account</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
