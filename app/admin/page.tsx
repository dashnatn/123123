"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface Booking {
  id: number
  name: string
  phone: string
  location: string | null
  checkIn: string | null
  checkOut: string | null
  guests: string | null
  createdAt: string
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, today: 0, week: 0 })

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings')
      const data = await response.json()
      setBookings(data.bookings)
      setStats(data.stats)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    const headers = ['ID', 'Имя', 'Телефон', 'Локация', 'Заезд', 'Выезд', 'Гостей', 'Дата создания']
    const rows = bookings.map(b => [
      b.id,
      b.name,
      b.phone,
      b.location || '-',
      b.checkIn || '-',
      b.checkOut || '-',
      b.guests || '-',
      new Date(b.createdAt).toLocaleString('ru-RU')
    ])

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `bookings_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-xl font-bold">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">Админ панель</h1>
            <p className="text-muted-foreground">Управление заявками на бронирование</p>
          </div>
          <Button
            onClick={exportToCSV}
            className="bg-primary hover:bg-primary/90 font-bold px-6 py-3 rounded-xl"
          >
            Экспорт в CSV
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-border">
            <div className="text-sm text-muted-foreground mb-1">Всего заявок</div>
            <div className="text-3xl font-black text-foreground">{stats.total}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-border">
            <div className="text-sm text-muted-foreground mb-1">За сегодня</div>
            <div className="text-3xl font-black text-green-600">{stats.today}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-border">
            <div className="text-sm text-muted-foreground mb-1">За неделю</div>
            <div className="text-3xl font-black text-blue-600">{stats.week}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-bold text-foreground">ID</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-foreground">Имя</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-foreground">Телефон</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-foreground">Локация</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-foreground">Заезд</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-foreground">Выезд</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-foreground">Гостей</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-foreground">Дата</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                      Заявок пока нет
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking, index) => (
                    <tr
                      key={booking.id}
                      className={`border-t border-border hover:bg-secondary/50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-secondary/20'
                      }`}
                    >
                      <td className="px-4 py-4 text-sm font-semibold text-foreground">{booking.id}</td>
                      <td className="px-4 py-4 text-sm font-medium text-foreground">{booking.name}</td>
                      <td className="px-4 py-4 text-sm">
                        <a
                          href={`tel:${booking.phone}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {booking.phone}
                        </a>
                      </td>
                      <td className="px-4 py-4 text-sm text-foreground">
                        {booking.location || <span className="text-muted-foreground">-</span>}
                      </td>
                      <td className="px-4 py-4 text-sm text-foreground">
                        {booking.checkIn ? new Date(booking.checkIn).toLocaleDateString('ru-RU') : <span className="text-muted-foreground">-</span>}
                      </td>
                      <td className="px-4 py-4 text-sm text-foreground">
                        {booking.checkOut ? new Date(booking.checkOut).toLocaleDateString('ru-RU') : <span className="text-muted-foreground">-</span>}
                      </td>
                      <td className="px-4 py-4 text-sm text-foreground">
                        {booking.guests || <span className="text-muted-foreground">-</span>}
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">
                        {new Date(booking.createdAt).toLocaleString('ru-RU', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
