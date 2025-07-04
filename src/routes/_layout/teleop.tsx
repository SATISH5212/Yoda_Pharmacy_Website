import CreateMission from '@/components/create-mission'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/teleop')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <CreateMission />
  </div>
}
