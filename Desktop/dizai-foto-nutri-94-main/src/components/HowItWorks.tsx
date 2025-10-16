
import React from 'react';
import { Camera, Send, ChartBar } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Camera className="h-10 w-10 text-[#00C851]" />,
      title: "Envie uma foto do seu prato",
      description: "Tire uma foto no WhatsApp e pronto sem baixar nada, sem sair do app."
    },
    {
      icon: <Send className="h-10 w-10 text-[#00C851]" />,
      title: "Receba os dados nutricionais automaticamente",
      description: "A IA analisa sua refeição e envia calorias, macros e insights nutricionais direto no chat."
    },
    {
      icon: <ChartBar className="h-10 w-10 text-[#00C851]" />,
      title: "Acompanhe seu progresso no WhatsApp",
      description: "Veja seu histórico e progresso nutricional no próprio WhatsApp, de forma prática e organizada."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Veja como é simples usar a <span className="text-[#00C851]">Ethra</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-full shadow-sm">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl md:text-2xl font-medium text-gray-900 leading-relaxed max-w-4xl mx-auto">
            Controle nutricional sem esforço: só tire uma foto e receba tudo. Sem neuras, sem cálculos, sem complicação.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
