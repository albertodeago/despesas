import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

interface User {
    username: string
}
interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: { username: 'Faccia da culo' }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        logout: (state) => { state.user = null}
    }
})

export const {
    login,
    logout
} = userSlice.actions
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer