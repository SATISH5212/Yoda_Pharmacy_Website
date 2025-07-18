import ViewFieldPage from '@/components/fields/viewField'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/fields/$field_id/viewField/')({
    component: ViewFieldPage,
})
