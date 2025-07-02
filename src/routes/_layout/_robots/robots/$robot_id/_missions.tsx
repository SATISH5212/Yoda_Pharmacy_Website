import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/_robots/robots/$robot_id/_missions")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='flex flex-row h-[95vh] bg-gray-100'>
      <div className='w-[30vw] bg-yellow-100'>missions</div>
      <div><Outlet /></div>
    </div>

  )
}