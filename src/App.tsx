import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from 'react-router-dom';
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { RootState } from './app/store'
import { Authentication, Home } from "./pages"
import './App.css';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

function App() {
    const user = useAppSelector(state => state.user.user)

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="login">Login</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => {
                        return (
                            user
                                ? <Redirect to="/home" />
                                : <Redirect to="/login" />
                        )
                    }}
                />
                
                <Route exact path="/home">
                    <Home />
                </Route>
                <Route exact path="/login">
                    <Authentication />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;
