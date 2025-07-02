import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/_robots/robots/$robot_id/_missions/missions/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div></div>
}
