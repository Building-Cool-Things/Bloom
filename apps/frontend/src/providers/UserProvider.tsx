import React, { Dispatch, SetStateAction, useContext, useState } from "react"

interface User {
     _id: string,
     name: string,
     email: string,
     provider: string,
     avatar: string,
     verified: boolean,
     createdAt: Date,
     updatedAt: Date,


}


interface UserContextType {
     user: User | null,
     setUser: Dispatch<SetStateAction<User | null>>
}
interface ProviderProps {
     children?: React.ReactNode
}

const UserContext = React.createContext<UserContextType | null>(null);


export const UserProvider: React.FC<ProviderProps> = ({ children }) => {
     const [user, setUser] = useState<User | null>(null)

     return (
          <UserContext.Provider value={{ user, setUser }}>
               {children}
          </UserContext.Provider>
     )
}



// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
     const state = useContext(UserContext)
     if (!state) throw new Error('State is undefined');
     return state;
}

