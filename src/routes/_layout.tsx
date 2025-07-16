import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Navbar } from '../components/navbar'
import Sidebar from '@/components/sidebar'
export const Route = createFileRoute('/_layout')({
  component: Body,
})

function Body() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[70px] bg-gray-200 flex justify-center">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full">
        <div className="shrink-0">
          <Navbar />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>


  )
}
