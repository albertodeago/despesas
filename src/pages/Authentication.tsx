import { UserContext } from "../contexts/UserContext";

export function Authentication() {
    return (
        <UserContext.Consumer>
            {({user, updateUser}) => (
                <div>
                    <h3>Login Page</h3>
                    <div>current user: {user && user.username || "no user"}</div>
                    <button onClick={() => updateUser()}>Login</button>
                </div>
            )}
        </UserContext.Consumer>
        
    )
}