import CreateBloom from "@/components/Bloom/Create"
import api from "@/lib/axiosInstance"
import { BloomType } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate()
  const getBloom = async () => {
    const { data } = await api.get('/bloom/all')
    return data
  }
  const bloom = useQuery({ queryKey: ['bloom'], queryFn: getBloom })

  return (
    <div className="px-3 py-6 flex items-start gap-x-10">
      <CreateBloom />
      {bloom?.data?.bloom.map((b: BloomType) => <div key={b._id} className="h-44 w-44 p-[1px] card rounded-lg card-hover cursor-pointer flex items-center justify-center text-center"

        onClick={() => {
          navigate(`/bloom/${b.name.toLowerCase().split(" ").join('-')}/${b._id}`)
        }}

      >
        <p>{b.name}</p>
      </div>)}
    </div>
  )
}

export default Dashboard