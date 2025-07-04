import AllRobotsPage from '@/components/RobotsData/all-robots'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/_layout/settings')({
  component: AllRobotsPage,
})
