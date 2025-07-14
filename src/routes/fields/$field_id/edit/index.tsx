import addFieldPage from '@/components/fields/addField'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/fields/$field_id/edit/')({
    component: addFieldPage,
})
    