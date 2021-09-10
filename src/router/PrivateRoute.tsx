import { useHistory, Route, Redirect } from "react-router-dom"
import { supabase } from '../supabaseClient';


const PrivateRoute = function({children, ...rest}: any) {
    const session = supabase.auth.session()
    const history = useHistory()

    if (!(session && session.user)) {
        history.push("/login")
    }

    return (
        <Route
            {...rest}
            render={({ location }) => 
                session ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }   
        />
    )
}

export { PrivateRoute }
