import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from 'react-router-dom';
import { Authentication, Home } from "./pages"
import { UserContext, UserContextType } from './contexts/UserContext';
import './App.css';


class App extends React.Component<{}, UserContextType> {
    constructor(props: {}) {
        super(props)

        this.state = {
            user: null,
            updateUser: () => {
                console.log('update user')
                this.setState(state => ({
                    user: state.user === null
                        ? {username: 'Pippo'}
                        : null
                }))
            }
        }
    }

    render() { 
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

                <UserContext.Provider value={this.state}>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => {
                                return (
                                    this.state.user
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
                </UserContext.Provider>
            </Router>
        )
    }
}

export default App;
