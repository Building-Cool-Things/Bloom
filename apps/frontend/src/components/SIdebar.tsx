import { useAuth } from '@/providers/UserProvider';
import { LayoutGrid, Activity, LogOut } from 'lucide-react';
import { NavLink } from "react-router-dom";
const Sidebar = () => {
    const { logoutMutation } = useAuth()
    return (
        <div className="w-[62px] h-full px-3 py-6 flex flex-col items-center border-r border-[#2E2E2E] justify-between sticky top-0">
            <div className='flex flex-col gap-10'>

                <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active-route" : ""
                    }
                >
                    <LayoutGrid className='cursor-pointer' />
                </NavLink>
                <NavLink
                    to="/analytics"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active-route " : ""
                    }
                >
                    <Activity className='cursor-pointer' />
                </NavLink>


            </div>
            <div>
                <LogOut className='cursor-pointer' onClick={() => {
                    logoutMutation.mutate()
                }} />
            </div>
        </div>
    )
}

export default Sidebar