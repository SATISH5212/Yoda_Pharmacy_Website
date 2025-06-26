import { createFileRoute } from '@tanstack/react-router'
import AddRobot from '@/components/add-robot'
import AllRobots from '@/components/allRobots'

export const Route = createFileRoute('/_layout/devices')({
  component: Devices,
})


function Devices() {
  // const [show,setShow] =useState();

  return (
    <div>
      <AllRobots />
    </div>
  )
}
