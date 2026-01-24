import { createFileRoute } from '@tanstack/react-router'
import { BucketForm } from './components/BucketForm'

export const Route = createFileRoute('/bucket/create')({
  component: BucketCreate,
})

function BucketCreate() {
  return <BucketForm />
}
