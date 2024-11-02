import { Outlet } from "react-router-dom";

import Sidebar from "./SIdebar";
import { ScrollArea } from "./ui/scroll-area";


const PrivateRoutes = () => {
    return <div className="flex h-full overflow-hidden">
        <Sidebar />
        <ScrollArea className="w-full h-full">
            <Outlet />
        </ScrollArea>

    </div>
}

export default PrivateRoutes