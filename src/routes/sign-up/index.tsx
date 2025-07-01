import SignIn from '@/components/auth/SignUp'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sign-up/')({
    component: SignIn,
})
