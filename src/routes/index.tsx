import MainScreen from '@/components/mainScreen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: MainScreen,
})

