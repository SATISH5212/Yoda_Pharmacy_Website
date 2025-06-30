import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Navbar } from '../components/navbar'
import { Sidebar } from '../components/sidebar'



export const Route = createFileRoute('/_layout')({
  component:Body,
})

function Body() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden'}} className='flex h-screen'>
        <Sidebar />
        <div style={{ flex: 1, overflowY: 'auto',paddingTop:"4px",paddingRight:"5px",backgroundColor:"white" }}>
          <Outlet />
        </div>
      </div>
      
    </div>

  )
}
