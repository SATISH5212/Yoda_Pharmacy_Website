
import AddRobot from '@/components/robots/addRobot'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/add-robot/')({
    component: AddRobot,
})
