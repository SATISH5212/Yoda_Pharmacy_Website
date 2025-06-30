import { createFileRoute } from '@tanstack/react-router'
import AuthPage from '../components/authpage'
import Map from '@/components/map'

export const Route = createFileRoute('/')({
  component:Index,
})

function Index() {
  return (
    
      <div > 
         <AuthPage />
      </div>


  )
}
