import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store'
import { login, logout } from '../features/user'

const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function Authentication() {
    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()

    return (
        <div>
            <h3>Login Page</h3>
            {user
                ? (
                    <div>
                        Hello {user.username}
                        <br />
                        <button onClick={() => dispatch(logout())}>Logout</button>
                    </div>
                )
                : (
                    <div>
                        Login please
                        <br />
                        <button onClick={() => dispatch(login({ username: 'Pippo' }))}>Login</button>
                    </div>)
            }
        </div>
    )
}