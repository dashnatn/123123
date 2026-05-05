import { NextResponse } from 'next/server'
import { getAllBookings } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const bookings = getAllBookings()
    
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

    const stats = {
      total: bookings.length,
      today: bookings.filter((b: any) => new Date(b.createdAt) >= today).length,
      week: bookings.filter((b: any) => new Date(b.createdAt) >= weekAgo).length
    }

    return NextResponse.json({ bookings, stats })
  } catch (error) {
    console.error('Get bookings error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
