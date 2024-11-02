import { Flower } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useAuth } from "@/providers/UserProvider"





const Navbar = () => {
    const { user } = useAuth()
    return (
        <div className="h-[48px] px-3 py-2 flex items-center justify-between border-b border-[#2E2E2E] sticky top-0">
            <div className="flex items-center gap-2">
                <Flower color="#10b981" />
                <p className="font-head font-bold text-xl">Bloom</p>
            </div>
            {
                <div className="flex items-center gap-5">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="text-black">{user?.name[0]}</AvatarFallback>
                    </Avatar>
                </div>
            }
        </div>
    )
}

export default Navbar