import chatScreen from '@/components/chatscreen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: chatScreen,
})

