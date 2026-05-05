"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useBooking } from "@/components/booking-provider"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { open } = useBooking()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Объекты", href: "#locations" },
    { label: "Удобства", href: "#amenities" },
    { label: "Галерея", href: "#gallery" },
    { label: "Отзывы", href: "#reviews" },
    { label: "Как добраться", href: "#contacts" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/98 backdrop-blur-xl shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Desktop: three-column centered layout */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] items-center gap-8">
          {/* Logo — left */}
          <a
            href="#"
            className="flex items-center gap-2 justify-self-start"
          >
            <div className={`text-xl md:text-2xl font-black tracking-tight transition-colors duration-300 ${
              isScrolled ? "text-foreground" : "text-white"
            }`}>
              <span className="text-primary">Гармония</span>
              <span className="mx-2 opacity-40">&</span>
              <span>Оазис</span>
            </div>
          </a>

          {/* Nav — center */}
          <nav className="flex items-center justify-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`font-semibold text-sm uppercase tracking-wide transition-all duration-300 hover:text-primary relative group ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA — right */}
          <div className="justify-self-end">
            <Button
              onClick={open}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Забронировать
            </Button>
          </div>
        </div>

        {/* Mobile: logo + burger */}
        <div className="flex lg:hidden items-center justify-between">
          <a
            href="#"
          >
            <div className={`text-xl font-black tracking-tight transition-colors duration-300 ${
              isScrolled ? "text-foreground" : "text-white"
            }`}>
              <span className="text-primary">Гармония</span>
              <span className="mx-2 opacity-40">&</span>
              <span>Оазис</span>
            </div>
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/97 backdrop-blur-xl shadow-xl overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col items-center gap-4 text-center">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-bold text-lg text-foreground hover:text-primary transition-colors py-2 border-b border-border/50 w-full text-center"
                >
                  {item.label}
                </a>
              ))}
              <Button
                onClick={open}
                className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5 rounded-full w-full"
              >
                Забронировать
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
