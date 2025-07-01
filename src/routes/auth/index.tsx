import LoginPage from '@/components/auth';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/')({
  component: LoginPage,
})
