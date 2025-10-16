import React from 'react';
import { Button } from '@/components/ui/button';
import phoneWhatsapp from '@/assets/phone-whatsapp.png';

const ThreeStepsSection: React.FC = () => {
  const scrollToPlans = () => {
    const plansSection = document.getElementById('pricing');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-16 md:py-24 bg-[#8BA675] overflow-hidden">
      {/* Decorative leaves */}
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-30">
        <div className="w-full h-full bg-green-900/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-white space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              3 passos rápidos para transformar sua alimentação com a Ethra
            </h2>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-white text-[#7CB342] rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Tire uma foto do seu prato</h3>
                  <p className="text-white/90">Envie uma foto de sua refeição pelo WhatsApp em segundos</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-white text-[#7CB342] rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Receba a análise completa</h3>
                  <p className="text-white/90">Nossa IA analisa instantaneamente as informações nutricionais e você recebe tudo detalhado em uma mensagem no mesmo chat.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-white text-[#7CB342] rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Acompanhe suas metas</h3>
                  <p className="text-white/90">Receba sugestões personalizadas e acompanhe o histórico de suas refeições para alcançar seus objetivos de saúde.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right phone mockup */}
          <div className="flex justify-center">
            <img 
              src={phoneWhatsapp}
              alt="Mockup do WhatsApp mostrando análise"
              className="w-full max-w-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeStepsSection;
