import { Flower } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useAuth } from "@/providers/UserProvider"
import { useNavigate } from "react-router-dom"





const Navbar = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    return (
        <div className="h-[48px] px-16 py-2 flex items-center justify-between border-b border-[#2E2E2E] sticky top-0">
            <div className="flex items-center gap-2" onClick={() => navigate('/')}>
                <Flower className="stroke-lime-500" />
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