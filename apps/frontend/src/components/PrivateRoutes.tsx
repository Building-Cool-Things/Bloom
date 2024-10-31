import { Outlet } from "react-router-dom";

import Sidebar from "./SIdebar";


const PrivateRoutes = () => {
    return <div className="flex h-full">
        <Sidebar />
        <Outlet />
    </div>
}

export default PrivateRoutes