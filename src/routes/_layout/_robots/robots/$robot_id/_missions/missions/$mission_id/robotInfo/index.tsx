import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
    '/_layout/_robots/robots/$robot_id/_missions/missions/$mission_id/robotInfo/',
)({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            Hello
            It was powerful robot used in coconut fields
        </div>
    )
}
