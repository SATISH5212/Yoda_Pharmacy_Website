import RobotDetals from '@/components/robots/RobotDetails/robotDetails'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_robots')({
  component: RobotDetals,
})
