
import React from 'react';
import HeroSection from '@/components/HeroSection';
import EndDietsSection from '@/components/EndDietsSection';
import ThreeStepsSection from '@/components/ThreeStepsSection';
import BenefitsSection from '@/components/BenefitsSection';
import TargetAudienceSection from '@/components/TargetAudienceSection';
import Testimonials from '@/components/Testimonials';
import PricingSection from '@/components/PricingSection';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <EndDietsSection />
      <ThreeStepsSection />
      <BenefitsSection />
      <TargetAudienceSection />
      <Testimonials />
      <PricingSection />
      <Faq />
      <Footer />
    </div>
  );
};

export default Index;
