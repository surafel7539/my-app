import { events } from '@/lib/contants'

export async function GET() {
  return Response.json(events)
}
