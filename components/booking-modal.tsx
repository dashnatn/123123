"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { WhatsAppIcon, PhoneIcon, CheckCircleIcon, ClipboardIcon } from "@/components/icons"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    location: ""
  })

  const handleClose = () => {
    onClose()
    setShowForm(false)
    setSuccess(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const lastSubmit = localStorage.getItem('lastBookingSubmit')
    if (lastSubmit) {
      const timeDiff = Date.now() - parseInt(lastSubmit)
      const minutesLeft = Math.ceil((20 * 60 * 1000 - timeDiff) / 60000)
      if (timeDiff < 20 * 60 * 1000) {
        alert(`⏰ Вы уже отправляли заявку. Попробуйте через ${minutesLeft} мин.`)
        return
      }
    }

    setLoading(true)

    try {
      const response = await fetch('/api/send-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        localStorage.setItem('lastBookingSubmit', Date.now().toString())
        alert('✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.')
        setSuccess(true)
        setTimeout(() => {
          handleClose()
          setFormData({ name: "", phone: "", checkIn: "", checkOut: "", guests: "2", location: "" })
        }, 2000)
      } else {
        alert('❌ Ошибка отправки. Попробуйте позже или позвоните нам.')
      }
    } catch (error) {
      console.error(error)
      alert('❌ Ошибка отправки. Попробуйте позже или позвоните нам.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-foreground">
                {success ? "Готово!" : showForm ? "Оставьте заявку" : "Связаться с нами"}
              </h3>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center text-foreground text-2xl transition-colors"
              >
                ×
              </button>
            </div>

            {success ? (
              <div className="py-8 text-center">
                <CheckCircleIcon className="w-16 h-16 mx-auto mb-4 text-green-600" />
                <p className="text-lg font-bold text-green-600">Заявка отправлена!</p>
                <p className="text-muted-foreground mt-2">Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : !showForm ? (
              <>
                <p className="text-muted-foreground mb-6">Выберите удобный способ связи</p>

                <div className="space-y-3">
                  <Button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <ClipboardIcon className="w-5 h-5" />
                    Оставить заявку
                  </Button>

                  <Button
                    asChild
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-green-500/50"
                  >
                    <a href="https://wa.me/79640506929" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3">
                      <WhatsAppIcon className="w-5 h-5" />
                      Написать в WhatsApp
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-2 border-border hover:bg-blue-50 hover:border-blue-400 font-bold py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md"
                  >
                    <a href="tel:+79640506929" className="flex flex-col items-center justify-center gap-1">
                      <div className="flex items-center gap-2">
                        <PhoneIcon className="w-5 h-5" />
                        <span>Позвонить</span>
                      </div>
                      <span className="text-sm text-muted-foreground">+7 (964) 050-69-29</span>
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-2 border-border hover:bg-blue-50 hover:border-blue-400 font-bold py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md"
                  >
                    <a href="tel:+79285948560" className="flex flex-col items-center justify-center gap-1">
                      <div className="flex items-center gap-2">
                        <PhoneIcon className="w-5 h-5" />
                        <span>Позвонить (доп.)</span>
                      </div>
                      <span className="text-sm text-muted-foreground">+7 (928) 594-85-60</span>
                    </a>
                  </Button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Ваше имя</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Телефон</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Локация</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  >
                    <option value="">Не выбрано</option>
                    <option value="Гармония">Гармония</option>
                    <option value="Оазис">Оазис</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Заезд</label>
                    <input
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Выезд</label>
                    <input
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Гостей</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  >
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'гость' : n < 5 ? 'гостя' : 'гостей'}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-6 rounded-xl"
                  >
                    Назад
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-primary hover:bg-primary/90 py-6 rounded-xl"
                  >
                    {loading ? "Отправка..." : "Отправить"}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function useBookingModal() {
  const [isOpen, setIsOpen] = useState(false)
  
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }
}
