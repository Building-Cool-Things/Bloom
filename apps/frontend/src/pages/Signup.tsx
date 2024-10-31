import Google from "@/icons/Google"
import { Flower } from "lucide-react"

const Signup = () => {
    return (
        <div className="flex w-full h-full items-center justify-center  ">
            <div className="shadow-lg rounded-lg min-w-30 max-w-30 px-10 py-14 flex flex-col items-center  card">
                <Flower color="#10b981" size={40} />
                <p className="font-head font-bold text-[32px]">Sign-in to <span className="gradient-text">Bloom</span></p>
                <p className="text-sm mt-[4px] text-[#bbb]">We’ll check if you have an account, and help create one if you don’t.</p>

                <div className="w-full py-2 rounded-md flex items-center justify-center  gap-3 mt-12 cursor-pointer bg-white card-hover" onClick={()=>{
                    window.open(`${import.meta.env.VITE_API_URL}/api/v1/user/auth/google`,'_self')
                }}>
                    <Google />
                    <p className="font-semibold tracking-wide text-black">Continue with Google</p>
                </div>
            </div>
        </div>
    )
}

export default Signup