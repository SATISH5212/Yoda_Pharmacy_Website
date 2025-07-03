import ViewFieldPathPage from '@/components/fields/viewPath'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/fields/$field_id/viewField/')({
    component: ViewFieldPathPage,
})
