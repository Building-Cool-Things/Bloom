import { LayoutGrid, Activity, LogOut } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="w-[62px] h-full px-3 py-6 flex flex-col items-center border-r border-[#2E2E2E] justify-between sticky top-0">
            <div className='flex flex-col gap-10'>
                <LayoutGrid className='cursor-pointer' />
                <Activity className='cursor-pointer' />
            </div>
            <div>
                <LogOut className='cursor-pointer' />
            </div>
        </div>
    )
}

export default Sidebar