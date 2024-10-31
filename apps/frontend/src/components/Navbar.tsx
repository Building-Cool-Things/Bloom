import { Flower } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"





const Navbar = () => {
    return (
        <div className="h-[48px] px-3 py-2 flex items-center justify-between border-b border-[#2E2E2E]">
            <div className="flex items-center gap-2">
                <Flower color="#10b981"/>
                <p className="font-head font-bold text-xl">Bloom</p>
            </div>
            {
                <div className="flex items-center gap-5">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            }
        </div>
    )
}

export default Navbar