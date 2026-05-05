import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
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

    // Отправка на почту
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      })

      const mailOptions = {
        from: `"Гармония & Оазис" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: `🏠 Новая заявка - ${location || 'Не указано'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #d4a574;">🏠 Новая заявка на бронирование</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background: #f5f5f5;">
                <td style="padding: 12px; border: 1px solid #ddd;"><strong>Имя:</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd;"><strong>Телефон:</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;"><a href="tel:${phone}">${phone}</a></td>
              </tr>
              <tr style="background: #f5f5f5;">
                <td style="padding: 12px; border: 1px solid #ddd;"><strong>Локация:</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;">${location || 'Не указана'}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd;"><strong>Заезд:</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;">${checkIn || 'Не указана'}</td>
              </tr>
              <tr style="background: #f5f5f5;">
                <td style="padding: 12px; border: 1px solid #ddd;"><strong>Выезд:</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;">${checkOut || 'Не указана'}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd;"><strong>Гостей:</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;">${guests || 'Не указано'}</td>
              </tr>
            </table>
            <p style="margin-top: 20px; color: #666;">Заявка отправлена с сайта</p>
          </div>
        `,
      }

      await transporter.sendMail(mailOptions).catch(err => console.log('Email error:', err))
      console.log('Письмо отправлено')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
