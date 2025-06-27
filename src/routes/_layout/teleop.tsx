import { createFileRoute } from '@tanstack/react-router'
import AllRobots from '@/components/RobotsData/all-robots'


export const Route = createFileRoute('/_layout/teleop')({
  component: Teleop,
})

function Teleop() {
  return (
    <div>
             <h1>Teleop</h1>
            {/* <AllRobots /> */}
    </div>
  )
}
