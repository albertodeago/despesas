import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { SessionContext } from "./contexts";
import { GroupsProvider } from "./contexts/GroupsProvider";
import { CategoriesProvider } from "./contexts/CategoriesProvider";
import {
  Authentication,
  Home,
  Account,
  CreateGroup,
  CreateCategory,
  CreateExpense,
} from "./pages";
import { Nav } from "./components/Nav";
import { PrivateRoute } from "./router/PrivateRoute";
import { supabase } from "./supabaseClient";

import "./App.css";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingGroups, setLoadingGroups] = useState<boolean>(true);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const _session = supabase.auth.session();
    console.log("App::useEffect - set session", _session);
    setSession(_session);
    setLoading(false);
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("App::useEffect::onAuthStateChange - set session", session);
      setSession(session);
    });
  }, []);

  return (
    <div>
      <SessionContext.Provider value={session}>
        <GroupsProvider setLoading={setLoadingGroups}>
          <CategoriesProvider setLoading={setLoadingCategories}>
            {loading || loadingGroups || loadingCategories ? (
              <div>Loading...</div>
            ) : (
              <Router>
                <Nav />

                <Switch>
                  <Route path="/login">
                    {session ? <Redirect to="/" /> : <Authentication />}
                  </Route>
                  <PrivateRoute exact path={["/", "/home"]}>
                    <Home />
                  </PrivateRoute>
                  <PrivateRoute path="/account">
                    <Account />
                  </PrivateRoute>
                  <PrivateRoute path="/create-group">
                    <CreateGroup />
                  </PrivateRoute>
                  <PrivateRoute path="/create-category">
                    <CreateCategory />
                  </PrivateRoute>
                  <PrivateRoute path="/create-expense">
                    <CreateExpense />
                  </PrivateRoute>
                </Switch>
              </Router>
            )}
          </CategoriesProvider>
        </GroupsProvider>
      </SessionContext.Provider>
    </div>
  );
}

export default App;
