"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { PhoneIcon, MessageIcon, ChevronDownIcon } from "@/components/icons"

export function MobileBookingButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          {/* Options popup */}
          <AnimatePresence>
            {showOptions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-t-3xl shadow-2xl p-6 border-t border-border"
              >
                <div className="space-y-3">
                  <a
                    href="tel:+79640506929"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <PhoneIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground">Позвонить</div>
                      <div className="text-sm text-muted-foreground">+7 (964) 050-69-29</div>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/79640506929"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground">WhatsApp</div>
                      <div className="text-sm text-muted-foreground">Написать сообщение</div>
                    </div>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <div className="bg-white/95 backdrop-blur-xl p-4 shadow-2xl border-t border-border">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-2xl shadow-lg transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <PhoneIcon className="w-5 h-5" />
              Забронировать
              <motion.span
                animate={{ rotate: showOptions ? 180 : 0 }}
                className="ml-2"
              >
                <ChevronDownIcon className="w-5 h-5" />
              </motion.span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
