import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_robots')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className='flex flex-row h-[95vh] bg-gray-100'>
            <div className='w-[30vw] bg-blue-100'>robot</div>
            <div><Outlet /></div>
        </div>

    )
}
