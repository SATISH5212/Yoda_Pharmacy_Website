import { createFileRoute } from '@tanstack/react-router'
import Map from '@/components/map'

export const Route = createFileRoute('/homepage')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
        <Map />
    </div>
}
