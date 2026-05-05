"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UsersIcon, BedIcon, WaveIcon, MapPinIcon, ArrowRightIcon } from "@/components/icons"
import { useBooking } from "@/components/booking-provider"

const locations = [
  {
    id: "harmony",
    badge: "Хит",
    badgeColor: "bg-primary",
    name: "Комплекс «Гармония»",
    subtitle: "Эко-домики",
    description: "Уютные деревянные домики в экостиле. Идеально для семейного отдыха с детьми.",
    guests: "до 6 гостей",
    bedrooms: "4 спальни",
    distance: "150 м до моря",
    price: "6 990",
    address: "Избербаш, ул. Салихова, 64/1",
    mapLink: "https://yandex.com/maps/-/CPWNY0~9",
    images: [
      "/images/harmony1.png",
      "/images/harmony2.png", 
      "/images/harmony3.png",
      "/images/harmony4.png",
    ]
  },
  {
    id: "oasis",
    badge: "Премиум",
    badgeColor: "bg-primary",
    name: "VIP-домик «Оазис»",
    subtitle: "Первая линия",
    description: "Шикарный дом прямо на первой линии. Просыпайтесь под шум волн!",
    guests: "2-8 гостей",
    bedrooms: "5 спален",
    distance: "50 м до моря",
    price: "9 990",
    address: "с. Первомайское, Песчаная ул., 2/2",
    mapLink: "https://yandex.ru/maps/-/CDrAj4~E",
    images: [
      "/images/oasis1.png",
      "/images/oasis2.png",
      "/images/oasis3.png",
    ]
  }
]

function LocationCard({ location, index }: { location: typeof locations[0]; index: number }) {
  const [currentImage, setCurrentImage] = useState(0)
  const { open } = useBooking()

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-on-scroll">
      {/* Image Gallery */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          key={currentImage}
          src={location.images[currentImage]}
          alt={location.name}
          className="w-full h-full object-cover"
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          width="600"
          height="450"
        />
        
        {/* Preload next images */}
        {location.images.slice(1, 3).map((src, idx) => (
          <link key={idx} rel="preload" href={src} as="image" />
        ))}
        
        {/* Badge */}
        <div className={`absolute top-4 left-4 ${location.badgeColor} text-primary-foreground text-xs font-bold px-4 py-2 rounded-full shadow-lg`}>
          {location.badge}
        </div>

        {/* Image Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {location.images.slice(0, 5).map((_, imgIndex) => (
            <button
              key={imgIndex}
              onClick={() => setCurrentImage(imgIndex)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentImage === imgIndex
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Фото ${imgIndex + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentImage((prev) => (prev === 0 ? location.images.length - 1 : prev - 1))}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg"
          aria-label="Предыдущее фото"
        >
          <span className="text-foreground font-bold">&#8249;</span>
        </button>
        <button
          onClick={() => setCurrentImage((prev) => (prev === location.images.length - 1 ? 0 : prev + 1))}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg"
          aria-label="Следующее фото"
        >
          <span className="text-foreground font-bold">&#8250;</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="mb-4">
          <h3 className="text-2xl font-black text-foreground mb-1">{location.name}</h3>
          <p className="text-primary font-semibold">{location.subtitle}</p>
        </div>

        <p className="text-muted-foreground mb-6 leading-relaxed">{location.description}</p>

        {/* Features */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2 bg-secondary/70 px-4 py-2 rounded-full">
            <UsersIcon className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold text-foreground">{location.guests}</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary/70 px-4 py-2 rounded-full">
            <BedIcon className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold text-foreground">{location.bedrooms}</span>
          </div>
          <div className="flex items-center gap-2 bg-primary/15 px-4 py-2 rounded-full">
            <WaveIcon className="w-4 h-4 text-primary" />
            <span className="font-bold text-primary">{location.distance}</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="pt-6 border-t border-border space-y-4">
          <div className="text-center sm:text-left">
            <span className="text-sm text-muted-foreground">от</span>
            <div className="text-3xl sm:text-4xl font-black text-foreground">
              {location.price} <span className="text-lg font-bold">₽</span>
              <span className="text-sm font-medium text-muted-foreground"> / ночь</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              variant="outline"
              className="rounded-full px-4 py-5 font-semibold hover:bg-secondary transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              <a href={location.mapLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <MapPinIcon className="w-4 h-4" />
                На карте
              </a>
            </Button>
            <Button
              onClick={open}
              className="bg-primary hover:bg-primary/90 rounded-full px-6 py-5 font-bold transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              Забронировать
            </Button>
          </div>
        </div>

        {/* Address */}
        <p className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
          <MapPinIcon className="w-3 h-3" />
          {location.address}
        </p>
      </div>
    </div>
  )
}

export function LocationsSection() {
  return (
    <section id="locations" className="pb-24 pt-8" style={{ background: "#f5f0e8" }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 text-center md:text-left animate-on-scroll">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
              Выберите <span className="text-primary">свой домик</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">Два уникальных предложения для вашего отдыха</p>
          </div>
          <motion.a
            href="#gallery"
            whileHover={{ x: 5 }}
            className="hidden md:flex items-center gap-2 text-primary font-bold mt-4 md:mt-0 hover:underline"
          >
            Смотреть все фото
            <ArrowRightIcon className="w-4 h-4" />
          </motion.a>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <LocationCard key={location.id} location={location} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
