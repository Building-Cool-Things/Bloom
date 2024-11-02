
import { Button } from '@/components/ui/button';
import api from '@/lib/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import formatTime from '@/utils/formateTime';

const Bloom = () => {
  const navigate = useNavigate()
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['check-user'],
    queryFn: async () => {
      const { data } = await api.get(`/bloom/${id}`)
      return data
    },

  })
  console.log('data', data)

  const handleTracking = () => {
    navigate('tracking', {
      state: {
        additionalData: data?.bloom,
      }
    })
  }

  return (
    <div className='w-full h-full p-6'>

      <div className='flex items-center justify-between mb-14'>
        <p className='font-head font-semibold text-3xl'>{data?.bloom?.name}</p>
        <Button className='card-hover' size={'sm'} variant={'gradient'} onClick={handleTracking}>Start Tracking</Button>
      </div>
      <div className='grid grid-cols-[6fr_6fr] gap-20  h-52'>
        <div className=' p-[1px] bg-gradient-to-r from-lime-500 to-emerald-500 rounded-lg'>
          <div className='rounded-lg p-4 card h-full'>
            <p className='text-white text-lg'>Make today count. Complete your daily goal!</p>
            <div className='flex justify-between'>
              <div>
                <p>Daily Commitment</p>
                <p className='text-2xl '>{formatTime(data?.bloom?.dailytimeGoal)}</p>
              </div>
              <CircularProgressbar
                value={100}
                text={`${70} %`}
                circleRatio={0.7} /* Make the circle only 0.7 of the full diameter */
                styles={{
                  trail: {
                    strokeLinecap: 'round',
                    transform: 'rotate(-126deg)',
                    transformOrigin: 'center center',
                    stroke: '#2E2E2E'
                  },
                  path: {
                    strokeLinecap: 'round',
                    transform: 'rotate(-126deg)',
                    transformOrigin: 'center center',
                    stroke: '#A1D6B2',
                  },
                  text: {
                    fill: '#ddd',
                  },
                }}
                strokeWidth={4.5}
              />
            </div>

          </div>
        </div>
        <div className='rounded-lg p-4  flex flex-col items-center justify-center gap-4 cursor-pointer card h-full'>

        </div>

      </div>
    </div>
  )
}

export default Bloom