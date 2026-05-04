"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const galleryImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/harmony1-AC3f80njYam3uHMDUelq9y18UXkXog.png",
    alt: "Деревянный домик Гармония",
    category: "Гармония"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oasis3-EADYs2DTfEaX0oGEuxGzMwIh2AU0o4.png",
    alt: "Интерьер VIP-домика Оазис",
    category: "Оазис"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/harmony6-4KglDJ02HFFFLWU5FSJan81WAf7aux.png",
    alt: "Домики Гармония с террасой",
    category: "Гармония"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oasis2-nrL20fO6C4fY09Po2pr7MzJrh378ut.png",
    alt: "Семейный отдых с мангалом",
    category: "Оазис"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/harmony2-eZWN8BLBBJ3Hro3Uu310TvvfCFXJ6Q.png",
    alt: "Спальня мансарда Гармония",
    category: "Гармония"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oasis1-ZCf89I3MGo0Y1a8sotuKo5L4pxDwFd.png",
    alt: "Территория Оазис",
    category: "Оазис"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/harmony5-wFReB83kl1lAppe3kwIbCf0ND3hqfB.png",
    alt: "Гостиная Гармония",
    category: "Гармония"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/harmonby4-JuJ5SSWaEqqUgIIclfQaaqWBk5JDCG.png",
    alt: "Кухня Гармония",
    category: "Гармония"
  },
]

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "Гармония" | "Оазис">("all")

  const filteredImages = filter === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter)

  return (
    <section id="gallery" className="pb-24 pt-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Фото <span className="text-primary">галерея</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-8">Посмотрите, где вы будете отдыхать</p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {(["all", "Гармония", "Оазис"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  filter === cat
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-white text-foreground hover:bg-secondary"
                }`}
              >
                {cat === "all" ? "Все" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.src}
              layout
              whileHover={{ scale: 1.03, zIndex: 10 }}
              onClick={() => setSelectedImage(image.src)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={`${index % 5 === 0 ? "aspect-square" : "aspect-[4/3]"}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  {image.category}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
        >
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selectedImage}
            alt="Увеличенное фото"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl"
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl hover:bg-white/30 transition-colors"
            aria-label="Закрыть"
          >
            ×
          </button>
        </motion.div>
      )}
    </section>
  )
}
