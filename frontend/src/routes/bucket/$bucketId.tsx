import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bucket/$bucketId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bucket/$id"!</div>
}
