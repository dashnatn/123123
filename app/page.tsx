import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AmenitiesSection } from "@/components/amenities-section"
import { LocationsSection } from "@/components/locations-section"
import { GallerySection } from "@/components/gallery-section"
import { CtaBanner } from "@/components/cta-banner"
import { ReviewsSection } from "@/components/reviews-section"
import { Footer } from "@/components/footer"
import { MobileBookingButton } from "@/components/mobile-booking-button"
import { WaveDivider } from "@/components/wave-divider"

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <HeroSection />
      {/* hero (dark) → amenities (white) */}
      <WaveDivider fromColor="#000000" toColor="#ffffff" />
      <AmenitiesSection />
      {/* amenities (white) → locations (secondary/30 ≈ warm cream) */}
      <WaveDivider fromColor="#ffffff" toColor="#f5f0e8" />
      <LocationsSection />
      {/* locations (cream) → gallery (white) */}
      <WaveDivider fromColor="#f5f0e8" toColor="#ffffff" />
      <GallerySection />
      {/* gallery (white) → cta (dark photo) */}
      <WaveDivider fromColor="#ffffff" toColor="#111111" />
      <CtaBanner />
      {/* cta (dark) → reviews (white) */}
      <WaveDivider fromColor="#111111" toColor="#ffffff" />
      <ReviewsSection />
      {/* reviews (white) → footer (foreground dark) */}
      <WaveDivider fromColor="#ffffff" toColor="#2a2118" />
      <Footer />
      <MobileBookingButton />
    </main>
  )
}
