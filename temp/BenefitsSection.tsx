import React from 'react';
import { Clock, Heart, Award, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BenefitsSection: React.FC = () => {
  const scrollToPlans = () => {
    const plansSection = document.getElementById('pricing');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    {
      icon: Clock,
      title: 'Controle Inteligente',
      description: 'Saiba exatamente o que está comendo, sem esforço'
    },
    {
      icon: Heart,
      title: 'Sugestões Personalizadas',
      description: 'Dicas exclusivas para equilibrar sua alimentação'
    },
    {
      icon: Award,
      title: 'Relatórios Claros',
      description: 'Veja sua evolução de forma visual e prática'
    },
    {
      icon: TrendingUp,
      title: 'Praticidade Total',
      description: 'Funciona direto no WhatsApp'
    },
    {
      icon: Target,
      title: 'Tecnologia Segura',
      description: 'Suas informações são protegidas'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#E8E8E8]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#5A7D3C] text-center mb-12">
          O que você ganha com a Ethra
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-[#7CB342] rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-sm">{benefit.title}</h3>
              <p className="text-xs text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={scrollToPlans}
            className="bg-[#7CB342] hover:bg-[#689F38] text-white text-sm md:text-base px-8 py-4 rounded-full font-semibold uppercase"
          >
            Começar Agora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
