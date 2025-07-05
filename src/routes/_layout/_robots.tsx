import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_robots')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex flex-row h-[90vh]'>
      <div className='flex w-[30vw] bg-gray-200'>Robot 1</div>
      <div className='flex'><Outlet /></div>
    </div>
  )
}
