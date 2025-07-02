import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
    '/_layout/_robots/robots/$robot_id/_missions/missions/$mission_id/',
)({
    component: RouteComponent,
})

function RouteComponent() {
    return <div></div>
}
