"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { WhatsAppIcon, PhoneIcon } from "@/components/icons"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2"
  })

  const handleClose = () => {
    onClose()
    setShowForm(false)
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
                {showForm ? "Заполните форму" : "Связаться с нами"}
              </h3>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center text-foreground text-2xl transition-colors"
              >
                ×
              </button>
            </div>

            {!showForm ? (
              <>
                <p className="text-muted-foreground mb-6">Выберите удобный способ связи</p>

                <div className="space-y-3">
                  <Button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Заполнить форму
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
              <>
                <p className="text-muted-foreground mb-6">Выберите даты и мы свяжемся с вами</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Дата заезда</label>
                    <input
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Дата выезда</label>
                    <input
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Количество гостей</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    >
                      <option value="1">1 гость</option>
                      <option value="2">2 гостя</option>
                      <option value="3">3 гостя</option>
                      <option value="4">4 гостя</option>
                      <option value="5">5 гостей</option>
                      <option value="6">6 гостей</option>
                      <option value="7">7 гостей</option>
                      <option value="8">8 гостей</option>
                    </select>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-foreground hover:bg-foreground/90 text-background font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-base"
                  >
                    <a href="tel:+79640506929">Забронировать</a>
                  </Button>

                  <Button
                    onClick={() => setShowForm(false)}
                    variant="outline"
                    className="w-full border-2 border-border hover:bg-secondary font-semibold py-4 rounded-xl transition-all"
                  >
                    Назад
                  </Button>

                  <div className="text-center pt-2">
                    <span className="text-muted-foreground text-sm">или написать в </span>
                    <a
                      href="https://wa.me/79640506929"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 font-bold text-sm hover:underline inline-flex items-center gap-1"
                    >
                      WhatsApp
                      <WhatsAppIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </>
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
