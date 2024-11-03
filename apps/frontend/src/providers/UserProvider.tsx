import api from "@/lib/axiosInstance";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React, { Dispatch, SetStateAction, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";

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
     setUser: Dispatch<SetStateAction<User | null>>,
     logoutMutation: UseMutationResult<AxiosResponse<unknown, unknown>, Error, void, unknown>
}
interface ProviderProps {
     children?: React.ReactNode
}

const UserContext = React.createContext<UserContextType | null>(null);


export const UserProvider: React.FC<ProviderProps> = ({ children }) => {
     const navigate = useNavigate()
     const [user, setUser] = useState<User | null>(null)

     const logoutMutation = useMutation({
          mutationFn: () => {
               return api.post(`/user/logout`)
          },
          onSuccess: () => {
               setUser(null)
               navigate('/sign-in')
          }
     })
     return (
          <UserContext.Provider value={{ user, setUser, logoutMutation }}>
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

