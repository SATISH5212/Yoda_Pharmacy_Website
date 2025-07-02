import ViewFieldPage from '@/components/fields/viewField'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/fields/$field_id/')({
    component: ViewFieldPage,
})
