"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { WhatsAppIcon } from "@/components/icons"
import { useBooking } from "@/components/booking-provider"
import { CheckCircleIcon } from "@/components/icons"

export function HeroSection() {
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
  const { open } = useBooking()

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
          setSuccess(false)
          setFormData({ name: "", phone: "", checkIn: "", checkOut: "", guests: "2", location: "" })
        }, 3000)
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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.png"
          alt="Красный деревянный домик у Каспийского моря"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width="1920"
          height="1080"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-6 border border-white/20">
                Премиальный отдых на Каспии
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Ваш идеальный отдых
              <br />
              на берегу{" "}
              <span className="text-primary relative inline-block">
                Каспия
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/50" />
              </span>
            </h1>

            <p className="text-base md:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Премиальные домики в Избербаше. Эко-стиль комплекса «Гармония» и VIP-отдых на первой линии в «Оазисе». Природа, комфорт и полная перезагрузка.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-12 justify-center lg:justify-start">
              <Button
                onClick={open}
                size="lg"
                className="bg-white hover:bg-white/90 text-foreground font-bold px-8 py-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-base w-full sm:w-auto"
              >
                Забронировать
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-bold px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 text-base w-full sm:w-auto"
              >
                <a href="#gallery">Смотреть фото</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-6 justify-center lg:justify-start flex-wrap">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-white">50м</div>
                <div className="text-sm text-white/70 font-medium">до моря в VIP-домике</div>
              </div>
              <div className="w-px bg-white/20" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-white">100%</div>
                <div className="text-sm text-white/70 font-medium">готовность к сезону</div>
              </div>
              <div className="w-px bg-white/20" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-primary">7000₽</div>
                <div className="text-sm text-white/70 font-medium">от / ночь</div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="hidden lg:block">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
              {success ? (
                <div className="py-8 text-center">
                  <CheckCircleIcon className="w-16 h-16 mx-auto mb-4 text-green-600" />
                  <p className="text-lg font-bold text-green-600">Заявка отправлена!</p>
                  <p className="text-muted-foreground mt-2">Мы свяжемся с вами в ближайшее время</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-black text-foreground mb-6">Забронируйте отдых</h3>
                  <p className="text-muted-foreground mb-6">Оставьте заявку и мы свяжемся с вами</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Ваше имя</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="Иван Иванов"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Телефон</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Локация</label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      >
                        <option value="">Не выбрано</option>
                        <option value="Гармония">Гармония</option>
                        <option value="Оазис">Оазис</option>
                      </select>
                    </div>
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
                        {[1,2,3,4,5,6,7,8].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'гость' : n < 5 ? 'гостя' : 'гостей'}</option>
                        ))}
                      </select>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-foreground hover:bg-foreground/90 text-background font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-base"
                    >
                      {loading ? "Отправка..." : "Отправить заявку"}
                    </Button>

                    <div className="text-center">
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
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
