import { createFileRoute } from '@tanstack/react-router'
import AllRobots from '@/components/allRobots'
import AddRobot from '@/components/add-robot'


export const Route = createFileRoute('/_layout/settings')({
  component: Settings,
})

function Settings() {
  return (
    <div>
          <AllRobots/>
    </div>
  )
}
