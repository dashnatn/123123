"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { InstagramIcon, WhatsAppIcon, PhoneIcon, MessageIcon, MapPinIcon } from "@/components/icons"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const navLinks = [
    { label: "Локации", href: "#locations" },
    { label: "Удобства", href: "#amenities" },
    { label: "Галерея", href: "#gallery" },
    { label: "Отзывы", href: "#reviews" },
    { label: "Как добраться", href: "https://yandex.com/maps/-/CPWNY0~9" },
  ]

  return (
    <footer id="contacts" ref={ref} className="text-background py-16 mt-0" style={{ background: "#2a2118" }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="text-2xl font-black mb-4">
              <span className="text-primary">Гармония</span>
              <span className="mx-2 opacity-50">&</span>
              <span>Оазис</span>
            </div>
            <p className="text-background/70 leading-relaxed mb-6">
              Уютные домики на берегу Каспийского моря для вашего идеального отдыха.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/harmony_domiki?igsh=MXJyN2NxZm80YmU3Mw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/79640506929"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-bold text-lg mb-6">Навигация</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-bold text-lg mb-6">Контакты</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+79640506929"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors duration-300"
                >
                  <PhoneIcon className="w-5 h-5" />
                  +7 (964) 050-69-29
                </a>
              </li>
              <li>
                <a
                  href="tel:+79285948560"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors duration-300"
                >
                  <PhoneIcon className="w-5 h-5" />
                  +7 (928) 594-85-60
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/79640506929"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors duration-300"
                >
                  <MessageIcon className="w-5 h-5" />
                  Написать в WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/harmony_domiki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors duration-300"
                >
                  <InstagramIcon className="w-5 h-5" />
                  Мы в Instagram
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Addresses */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-bold text-lg mb-6">Адреса</h4>
            <div className="space-y-6">
              <div>
                <div className="font-semibold text-primary mb-2">«Гармония»</div>
                <a
                  href="https://yandex.com/maps/-/CPWNY0~9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-background/70 hover:text-background transition-colors duration-300 text-sm leading-relaxed"
                >
                  <MapPinIcon className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    Краснодарский край,
                    <br />
                    г. Избербаш, ул. Салихова, 64/1
                  </span>
                </a>
              </div>
              <div>
                <div className="font-semibold text-primary mb-2">VIP «Оазис»</div>
                <a
                  href="https://yandex.ru/maps/-/CDrAj4~E"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-background/70 hover:text-background transition-colors duration-300 text-sm leading-relaxed"
                >
                  <MapPinIcon className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    с. Первомайское,
                    <br />
                    Песчаная ул., 2/2
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-white/10 text-center"
        >
          <p className="text-background/50 text-sm">
            &copy; {new Date().getFullYear()} Гармония & Оазис. Все права защищены.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
