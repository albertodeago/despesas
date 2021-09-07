import React from "react"

export interface User {
    username: string
} 

export type UserContextType = {
    user: User | null,
    updateUser: () => void
}

export const UserContext = React.createContext<UserContextType>({
    user: null,
    updateUser: () => {}
})