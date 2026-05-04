"use client"

import { motion } from "framer-motion"
import { WaveIcon, HomeIcon, SunIcon, WifiIcon } from "@/components/icons"

const amenities = [
  {
    icon: WaveIcon,
    title: "Первая линия",
    description: "До моря от 50 до 150 метров пешком (в зависимости от выбранного объекта)."
  },
  {
    icon: HomeIcon,
    title: "Уютные домики",
    description: "Современный дизайн, свежий ремонт и все необходимое для комфортного отдыха."
  },
  {
    icon: SunIcon,
    title: "Природа и тишина",
    description: "Чистый воздух, оборудованные мангальные зоны и террасы для вечернего отдыха."
  },
  {
    icon: WifiIcon,
    title: "Wi-Fi и удобства",
    description: "Быстрый интернет, кондиционеры, парковка, полностью оборудованная кухня."
  }
]

export function AmenitiesSection() {
  return (
    <section id="amenities" className="pb-24 pt-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Комфорт, который
            <br />
            чувствуется <span className="text-primary">в деталях</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity) => {
            const IconComponent = amenity.icon
            return (
              <motion.div
                key={amenity.title}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group text-center p-8 rounded-3xl bg-secondary/50 hover:bg-white hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <IconComponent className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {amenity.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {amenity.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
