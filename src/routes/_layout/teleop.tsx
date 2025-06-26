import { createFileRoute } from '@tanstack/react-router'
import Map from '../../components/map'
import DrawTools from '@/components/DrawTools'

export const Route = createFileRoute('/_layout/teleop')({
  component: Teleop,
})

function Teleop() {
  return (
    <div>
             <h1 className='text-white'>Teleop</h1>
            <Map />
    </div>
  )
}
