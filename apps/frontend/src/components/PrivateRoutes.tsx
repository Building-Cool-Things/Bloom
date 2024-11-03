import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "./SIdebar";
import { ScrollArea } from "./ui/scroll-area";
import { useAuth } from "@/providers/UserProvider";
import { useEffect } from "react";


const PrivateRoutes = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    console.log('user')


    useEffect(() => {
        if (!user) {
            navigate('/check')
        }
    }, [user])
    if (user) {
        return <div className="flex h-full overflow-hidden">
            <Sidebar />
            <ScrollArea className="w-full h-full">
                <Outlet />
            </ScrollArea>

        </div>
    }

}

export default PrivateRoutes