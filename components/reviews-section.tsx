"use client"

import { motion } from "framer-motion"
import { StarIcon, MapIcon, ArrowRightIcon } from "@/components/icons"

const reviews = [
  {
    rating: 5,
    text: "Идеальное место для перезагрузки. Снимали деревянный домик в Гармонии — пахнет деревом, все новенькое, до пляжа пешком пара минут. Спасибо Шарабазану за гостеприимство!",
    author: "Руслан",
    location: "Москва",
    date: "Август 2024"
  },
  {
    rating: 5,
    text: "Отдыхали в домике Оазис прямо на берегу. Это просто сказка! Просыпаешься под шум волн, до воды буквально 50 метров. Сервис на высшем уровне.",
    author: "Амина",
    location: "Махачкала",
    date: "Июль 2024"
  },
  {
    rating: 5,
    text: "Тишина, чистый воздух, отличная мангальная зона. Все продумано до мелочей: от посуды до белоснежного белья. Обязательно вернемся еще раз.",
    author: "Дмитрий",
    location: "Санкт-Петербург",
    date: "Сентябрь 2024"
  },
  {
    rating: 5,
    text: "Отличное место для семейного отдыха! Дети были в восторге от близости к морю. Домик очень уютный, есть все необходимое. Хозяева очень гостеприимные.",
    author: "Екатерина",
    location: "Казань",
    date: "Август 2024"
  }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-primary" : "text-border"}`}
          filled={i < rating}
        />
      ))}
    </div>
  )
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="pt-8 pb-0 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 text-center md:text-left animate-on-scroll">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
              Что говорят <span className="text-primary">наши гости</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">Реальные отзывы от реальных людей</p>
          </div>
          <motion.a
            href="https://yandex.com/maps/-/CPWNY0~9"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
            className="hidden md:flex items-center gap-2 text-primary font-bold mt-4 md:mt-0 hover:underline"
          >
            Смотреть все отзывы
            <ArrowRightIcon className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.01 }}
              className={`bg-secondary/30 rounded-3xl p-6 md:p-8 hover:bg-white hover:shadow-xl transition-all duration-500 animate-on-scroll scroll-animate-delay-${index % 2 + 1}`}
            >
              <StarRating rating={review.rating} />
              
              <p className="text-foreground mt-4 mb-6 leading-relaxed text-base md:text-lg">
                {`"${review.text}"`}
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">
                    {review.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-foreground">{review.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {review.location} &bull; {review.date}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Yandex Maps Link */}
        <div className="mt-12 text-center">
          <a
            href="https://yandex.com/maps/-/CPWNY0~9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-foreground text-background font-bold px-8 py-4 rounded-full hover:bg-foreground/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            <MapIcon className="w-5 h-5" />
            Еще отзывы на Яндекс Картах
          </a>
        </div>
      </div>
    </section>
  )
}
