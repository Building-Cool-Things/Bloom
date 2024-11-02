
import api from "@/lib/axiosInstance";
import { useAuth } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckUser = () => {
    const navigate = useNavigate()
    const { setUser } = useAuth()
    const { data, error, isLoading } = useQuery({
        queryKey: ['check-user'],
        queryFn: async () => {
            const { data } = await api.get('/user/check')
            return data
        },

    })
    console.log('data', data)
    useEffect(() => {
        if (!isLoading && !error && data) {
            console.log('user', data)
            setUser(data?.user);
            navigate('/dashboard')
        } else if (!isLoading && !data) {
            navigate('/sign-in')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center flex-col">
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-flower"
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,   // Loops the animation indefinitely
                        repeatDelay: 0.05,  // 50ms delay between each rotation
                        duration: 2         // Adjust the duration as needed for speed
                    }}
                >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" />
                    <path d="M12 7.5V9" />
                    <path d="M7.5 12H9" />
                    <path d="M16.5 12H15" />
                    <path d="M12 16.5V15" />
                    <path d="m8 8 1.88 1.88" />
                    <path d="M14.12 9.88 16 8" />
                    <path d="m8 16 1.88-1.88" />
                    <path d="M14.12 14.12 16 16" />
                </motion.svg>
                <p>Loading...</p>
            </div>
        )
    } else {
        return null
    }



}

export default CheckUser