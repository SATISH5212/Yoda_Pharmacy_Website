import ConfigMissionPage from '@/components/missions/configMission'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
    '/_layout/fields/$field_id/config-mission/',
)({
    component: ConfigMissionPage,
})

