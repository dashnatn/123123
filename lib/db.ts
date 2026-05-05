import Database from 'better-sqlite3'
import path from 'path'

let db: Database.Database | null = null

function getDb() {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'bookings.db')
    db = new Database(dbPath)
  }
  return db
}

function initDb() {
  const db = getDb()
  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      location TEXT,
      checkIn TEXT,
      checkOut TEXT,
      guests TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

export function saveBooking(data: {
  name: string
  phone: string
  location?: string
  checkIn?: string
  checkOut?: string
  guests?: string
}) {
  const db = getDb()
  initDb()
  const stmt = db.prepare(`
    INSERT INTO bookings (name, phone, location, checkIn, checkOut, guests)
    VALUES (?, ?, ?, ?, ?, ?)
  `)
  return stmt.run(data.name, data.phone, data.location, data.checkIn, data.checkOut, data.guests)
}

export function getAllBookings() {
  const db = getDb()
  initDb()
  const stmt = db.prepare('SELECT * FROM bookings ORDER BY createdAt DESC')
  return stmt.all()
}

export function getBookingsCount() {
  const db = getDb()
  initDb()
  const stmt = db.prepare('SELECT COUNT(*) as count FROM bookings')
  return stmt.get() as { count: number }
}
