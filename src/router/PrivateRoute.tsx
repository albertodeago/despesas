import { useHistory, Route, Redirect } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Sidebar } from "../components/sidebar";

const PrivateRoute = function ({ children, ...rest }: any) {
  const session = supabase.auth.session();
  const history = useHistory();

  if (!(session && session.user)) {
    history.push("/login");
  }

  return (
    <>
      <Sidebar />
      <Route
        {...rest}
        render={({ location }) =>
          session ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    </>
  );
};

export { PrivateRoute };
