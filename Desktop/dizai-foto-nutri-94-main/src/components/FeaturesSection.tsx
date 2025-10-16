
import React from 'react';
import { Camera, ChartBar, Smartphone, Lightbulb } from 'lucide-react';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description
}) => {
  return (
    <div className="glass-card-ethra rounded-xl p-5 md:p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-ethra-green hover:translate-y-[-5px] hover:shadow-ethra-glow focus-within:border-ethra-green focus-within:shadow-ethra-glow h-full">
      <div className="p-3 rounded-full bg-ethra-green/10 border border-ethra-green/30 mb-3 md:mb-4 border-glow-ethra">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-2 text-ethra-dark">{title}</h3>
      <p className="text-ethra-dark/70 text-sm md:text-base">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Camera className="h-6 w-6 md:h-8 md:w-8 text-ethra-green" />,
      title: "Foto = Análise Instantânea",
      description: "Envie uma imagem do seu prato e receba a análise nutricional em tempo real."
    },
    {
      icon: <ChartBar className="h-6 w-6 md:h-8 md:w-8 text-ethra-green" />,
      title: "Dados Precisos e Completos",
      description: "Calorias, carboidratos, proteínas e gorduras calculados com tecnologia de ponta."
    },
    {
      icon: <Lightbulb className="h-6 w-6 md:h-8 md:w-8 text-ethra-green" />,
      title: "Recomendações Inteligentes",
      description: "Sugestões personalizadas para você atingir seus objetivos de forma mais eficiente."
    },
    {
      icon: <Smartphone className="h-6 w-6 md:h-8 md:w-8 text-ethra-green" />,
      title: "Sem Downloads. Sem Fricção.",
      description: "Tudo acontece dentro do WhatsApp. Simples, seguro e direto ao ponto."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-28 px-5 md:px-8 bg-gray-50">
      <div className="text-center mb-12 md:mb-20">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-5 text-ethra-dark">
          Tecnologia que <span className="gradient-text-ethra">entende sua alimentação.</span>
        </h2>
        <p className="text-ethra-dark/70 max-w-2xl mx-auto text-sm md:text-base">
          A IA da Ethra transforma uma simples foto em dados valiosos para sua saúde — em poucos segundos e com alta precisão.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 xl:gap-10">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index} 
            icon={feature.icon} 
            title={feature.title} 
            description={feature.description} 
          />
        ))}
      </div>
      
      <div className="mt-12 md:mt-20 text-center">
        <p className="text-lg text-ethra-green italic md:text-2xl lg:text-3xl font-medium">
          "Tão simples quanto tirar uma selfie. Tão eficaz quanto uma consulta personalizada."
        </p>
      </div>
    </section>
  );
};

export default FeaturesSection;
