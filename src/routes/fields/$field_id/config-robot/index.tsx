import ViewFieldPage from '@/components/fields/viewField'
import ConfigRobotForm from '@/components/robots/configRobot'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/fields/$field_id/config-robot/')({
    component: ViewFieldPage,
})

