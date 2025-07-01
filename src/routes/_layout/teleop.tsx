import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/teleop')({
  component: Teleop,
})

function Teleop() {
  return (
    <div>
            <h1>Tele Operation</h1>
    </div>
  )
}
