import FieldsPage from '@/components/fields'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/all-fields')({
    component: FieldsPage,
})
