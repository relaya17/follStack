// @ts-ignore
import { useState } from 'react'
// @ts-ignore
import { Hero } from '@/components/Hero'
// @ts-ignore
import { Features } from '@/components/Features'
// @ts-ignore
import { LearningModules } from '@/components/LearningModules'
// @ts-ignore
import { Testimonials } from '@/components/Testimonials'
// @ts-ignore
import { CTA } from '@/components/CTA'
// @ts-ignore
import { AdvancedFeatures } from '@/components/AdvancedFeatures'

export default function HomePage() {
  const [isAdvancedFeaturesOpen, setIsAdvancedFeaturesOpen] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        דלג לתוכן הראשי
      </a>
      
      <Hero onOpenAdvancedFeatures={() => setIsAdvancedFeaturesOpen(true)} />
      
      <section id="main-content" className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <Features />
        </div>
      </section>
      
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <LearningModules />
        </div>
      </section>
      
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <Testimonials />
        </div>
      </section>
      
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <CTA />
        </div>
      </section>

      {/* Advanced Features Modal */}
      <AdvancedFeatures 
        isOpen={isAdvancedFeaturesOpen} 
        onClose={() => setIsAdvancedFeaturesOpen(false)} 
      />
    </div>
  )
}
