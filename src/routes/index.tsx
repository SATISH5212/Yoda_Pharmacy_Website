import { createFileRoute } from '@tanstack/react-router'

import { authMiddleware } from '@/lib/helpers/middleware'
import { LoginPage } from '@/components/auth'

export const Route = createFileRoute('/')({
  component: LoginPage,
  beforeLoad: authMiddleware
})

