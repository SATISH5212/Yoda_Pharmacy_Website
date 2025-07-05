import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_layout/_robots/robots/$robot_id/_missions/missions/$mission_id/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='flex '>
      <div className='flex w-[35vw] bg-sky-200'>Robot INfo</div>
      <div className='flex'><Outlet /></div>
    </div>
  )
}