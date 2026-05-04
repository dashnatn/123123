"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { WhatsAppIcon } from "@/components/icons"
import { useBooking } from "@/components/booking-provider"

export function CtaBanner() {
  const { open } = useBooking()

  return (
    <section className="relative pb-32 pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/voda2-z0lTU53GY7vtWcIhjFJL9rJj1s7Leh.webp"
          alt="Каспийское море"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Отдых, который
            <br />
            <span className="text-primary">останется с вами</span>
          </h2>

          <p className="text-base md:text-xl text-white/80 mb-10 leading-relaxed">
            Забронируйте сейчас и подарите себе незабываемые впечатления от кавказского гостеприимства и теплого моря.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              onClick={open}
              size="lg"
              className="bg-white hover:bg-white/90 text-foreground font-bold px-8 py-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              Забронировать
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-bold px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              <a href="https://wa.me/79640506929" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <WhatsAppIcon className="w-5 h-5" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
