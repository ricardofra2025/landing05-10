
import React, { useEffect, useState } from 'react';

const ScrollIndicator: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [showIndicator, setShowIndicator] = useState<boolean>(false);
  
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const sectionIds = Array.from(sections).map(section => section.id);
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Show indicator only after scrolling a bit
      setShowIndicator(scrollY > 200);
      
      // Find current section
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  if (!showIndicator) return null;
  
  return (
    <div className="fixed right-5 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 py-3 px-2 rounded-full bg-dizai-deep-purple/40 backdrop-blur-sm border border-dizai-light-purple/20">
      <button
        onClick={() => scrollToSection('hero')}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === 'hero' ? 'bg-dizai-neon-green w-3 h-3' : 'bg-dizai-light-purple/50 hover:bg-dizai-light-purple'}`}
        aria-label="Ir para o início"
      />
      <button
        onClick={() => scrollToSection('features')}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === 'features' ? 'bg-dizai-neon-green w-3 h-3' : 'bg-dizai-light-purple/50 hover:bg-dizai-light-purple'}`}
        aria-label="Ir para recursos"
      />
      <button
        onClick={() => scrollToSection('how-it-works')}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === 'how-it-works' ? 'bg-dizai-neon-green w-3 h-3' : 'bg-dizai-light-purple/50 hover:bg-dizai-light-purple'}`}
        aria-label="Ir para como funciona"
      />
      <button
        onClick={() => scrollToSection('testimonials')}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === 'testimonials' ? 'bg-dizai-neon-green w-3 h-3' : 'bg-dizai-light-purple/50 hover:bg-dizai-light-purple'}`}
        aria-label="Ir para depoimentos"
      />
      <button
        onClick={() => scrollToSection('pricing')}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === 'pricing' ? 'bg-dizai-neon-green w-3 h-3' : 'bg-dizai-light-purple/50 hover:bg-dizai-light-purple'}`}
        aria-label="Ir para preços"
      />
      <button
        onClick={() => scrollToSection('faq')}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === 'faq' ? 'bg-dizai-neon-green w-3 h-3' : 'bg-dizai-light-purple/50 hover:bg-dizai-light-purple'}`}
        aria-label="Ir para FAQ"
      />
    </div>
  );
};

export default ScrollIndicator;
