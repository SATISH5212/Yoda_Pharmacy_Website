import { createFileRoute } from '@tanstack/react-router'
import AllRobots from '@/components/allRobots'


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
