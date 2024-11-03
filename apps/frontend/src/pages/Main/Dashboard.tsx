import CreateBloom from "@/components/Bloom/Create"
import { Button } from "@/components/ui/button"
import api from "@/lib/axiosInstance"
import { useAuth } from "@/providers/UserProvider"
import { BloomType } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { MouseEvent } from "react";
const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const getBloom = async () => {
    const { data } = await api.get('/bloom/all')
    return data
  }
  const blooms = useQuery({ queryKey: ['bloom'], queryFn: getBloom })


  const handleTracking = (e: MouseEvent<HTMLButtonElement>, data: BloomType) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/bloom/${data.name.split(' ').join('-')}/${data._id}/tracking`, {
      state: {
        additionalData: data,
      }
    })
  }


  return (
    <div className="p-6">
      <p className="text-3xl">Hello👋🏼, &nbsp; <span className="gradient-text font-semibold">{user?.name}</span></p>
      <div className="flex items-start justify-start gap-10 flex-wrap w-full mx-0 mt-14">
        <CreateBloom />
        {blooms?.data?.bloom.map((bloom: BloomType) => <div key={bloom._id} className="h-44 w-44 p-[1px] card rounded-lg card-hover cursor-pointer flex items-center justify-center text-center relative"
          onClick={() => {
            navigate(`/bloom/${bloom.name.toLowerCase().split(" ").join('-')}/${bloom._id}`)
          }}
        >
          <p>{bloom.name}</p>
          <div className="absolute bottom-3 right-3">
            <Button className='card-hover text-[0.56rem] px-2' size={'sm'} variant={'gradient'} onClick={(e) => handleTracking(e, bloom)}>Start Tracking</Button>
          </div>

        </div>)}

      </div>
    </div>
  )
}

export default Dashboard