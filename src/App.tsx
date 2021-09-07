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
import { ExpenseContext, ExpenseContextType, Expense } from './contexts/ExpenseContext';

import './App.css';

interface AppState {
    userState: UserContextType,
    expenseState: ExpenseContextType
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props)

        this.state = {
            userState: {
                user: { username: 'alberto.deago' },
                updateUser: () => {
                    console.log('update user')
                    this.setState(({ userState, expenseState }) => ({
                        userState: {
                            ...userState,
                            user: userState.user === null
                                ? {username: 'Pippo'}
                                : null
                        },
                        expenseState
                    }))
                },
            },
            expenseState: {
                expenseList: [],
                addExpense: (exp: Expense) => {
                    console.log('Add expense', exp)
                    this.setState(({ userState, expenseState }) => ({
                        userState,
                        expenseState: {
                            ...expenseState,
                            expenseList: expenseState.expenseList.concat([exp])
                        }
                    }))
                },
                deleteExpense: (exp: Expense) => {
                    console.log('Delete expense', exp)
                    const i = this.state.expenseState.expenseList.findIndex((e: Expense) => e.id === exp.id)
                    console.log(i)
                    this.setState(({ userState, expenseState }) => ({
                        userState,
                        expenseState: {
                            ...expenseState,
                            expenseList: expenseState.expenseList.filter(e => e.id !== exp.id)
                        }
                    }))
                },
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

                <UserContext.Provider value={this.state.userState}>
                    <ExpenseContext.Provider value={this.state.expenseState}>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => {
                                    return (
                                        this.state.userState.user
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
                    </ExpenseContext.Provider>
                </UserContext.Provider>
            </Router>
        )
    }
}

export default App;
