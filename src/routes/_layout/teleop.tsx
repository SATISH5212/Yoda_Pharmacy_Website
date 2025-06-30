import { createFileRoute } from '@tanstack/react-router'
// import LeafletGoogle from '@/components/leafllet-google'


export const Route = createFileRoute('/_layout/teleop')({
  component: Teleop,
})

function Teleop() {
  return (
    <div>
            
             {/* <LeafletGoogle /> */}
    </div>
  )
}
