
import AllRobotsPage from '@/components/robots'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_robots')({
    component: AllRobotsPage,
})
