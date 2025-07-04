import AllRobotsPage from '@/components/RobotsData/all-robots'
import AllRobotsPage1 from '@/components/RobotsData/all-robots'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_robots')({
    component: AllRobotsPage,
})
