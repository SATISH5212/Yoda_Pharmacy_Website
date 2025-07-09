import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Navbar } from '../components/navbar'
import Sidebar from '@/components/sidebar'
export const Route = createFileRoute('/_layout')({
  component: Body,
})

function Body() {
  return (
    <div className='flex'>
      <div className='flex w-[70px] bg-gray-200 justify-center h-screen'><Sidebar /></div>
      <div className='flex flex-col w-full'>
        <div><Navbar /></div>
        <div><Outlet /></div>
      </div>

    </div >

  )
}
