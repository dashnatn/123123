"use client"

import { useEffect } from "react"

export function ScrollAnimate() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-animate")
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return null
}
