import { NextResponse } from 'next/server'
import { saveBooking } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const { name, phone, checkIn, checkOut, guests, location } = await request.json()

    console.log('Получена заявка:', { name, phone, location })

    try {
      saveBooking({ name, phone, location, checkIn, checkOut, guests })
      console.log('Заявка сохранена в БД')
    } catch (dbError) {
      console.error('Ошибка БД:', dbError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
