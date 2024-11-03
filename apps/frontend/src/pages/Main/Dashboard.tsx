import CreateBloom from "@/components/Bloom/Create"
import api from "@/lib/axiosInstance"
import { useAuth } from "@/providers/UserProvider"
import { BloomType } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const getBloom = async () => {
    const { data } = await api.get('/bloom/all')
    return data
  }
  const blooms = useQuery({ queryKey: ['bloom'], queryFn: getBloom })

  return (
    <div className="p-6">
      <p className="text-3xl">Hello👋🏼, &nbsp; <span className="gradient-text font-semibold">{user?.name}</span></p>
      <div className="flex items-start justify-start gap-10 flex-wrap w-full mx-0 mt-14">
        <CreateBloom />
        {blooms?.data?.bloom.map((bloom: BloomType) => <div key={bloom._id} className="h-44 w-44 p-[1px] card rounded-lg card-hover cursor-pointer flex items-center justify-center text-center"
          onClick={() => {
            navigate(`/bloom/${bloom.name.toLowerCase().split(" ").join('-')}/${bloom._id}`)
          }}
        >
          <p>{bloom.name}</p>
        </div>)}

      </div>
    </div>
  )
}

export default Dashboard