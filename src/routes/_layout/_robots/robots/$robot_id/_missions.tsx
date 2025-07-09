
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/_robots/robots/$robot_id/_missions")(
  {
    component: RouteComponent,
  }
);
function RouteComponent() {
  return (
    <div className='flex'>
      <div className='flex w-[30vw] bg-yellow-200'>mission 1</div>
      <div className='flex'><Outlet /></div>
    </div>
  )
}