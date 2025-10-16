import React from 'react';
import PaymentButton from '@/components/PaymentButton';
import leafPricing1 from '@/assets/leaf-pricing-1.png';
import leafPricing2 from '@/assets/leaf-pricing-2.png';

const PricingSection: React.FC = () => {
  const plans = [
    {
      name: 'PREMIUM',
      price: '37,90',
      description: 'Para famílias e casais que querem evoluir juntos',
      features: [
        '3 acessos compartilhados',
        'Histórico completo',
        'Relatórios mensais',
        'Suporte prioritário'
      ],
      buttonText: 'ASSINAR PREMIUM',
      highlighted: false,
      paymentUrl: 'https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=84fc9f166f614ad58a41c791e520d85f'
    },
    {
      name: 'ESSENCIAL',
      price: '19,90',
      description: 'Ideal para quem busca praticidade no dia a dia',
      features: [
        'Histórico de 30 dias',
        'IA com sugestões personalizadas',
        'Suporte via WhatsApp'
      ],
      buttonText: 'COMEÇAR COM ESSENCIAL',
      highlighted: true,
      badge: '+ MAIS POPULAR',
      paymentUrl: 'https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=4b302fff415347b7a55537c8dc520f86'
    },
    {
      name: 'PROFISSIONAL',
      price: '99,90',
      description: 'Feito para nutricionistas e profissionais da saúde',
      features: [
        'Gestão de até 10 clientes',
        'Painel de gestão completo',
        'Integração via API',
        'Suporte técnico dedicado'
      ],
      buttonText: 'QUERO O PROFISSIONAL',
      highlighted: false,
      paymentUrl: 'https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=78d365b843bd410fa74115eea80b902e'
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#8BA675] relative overflow-hidden">
      {/* Decorative leaves - hidden on mobile to avoid clutter */}
      <img 
        src={leafPricing1}
        alt=""
        className="hidden md:block absolute top-8 left-8 w-32 h-32 md:w-48 md:h-48 opacity-80"
      />
      <img 
        src={leafPricing2}
        alt=""
        className="hidden md:block absolute bottom-8 right-8 w-24 h-24 md:w-40 md:h-40 opacity-80"
      />
      <img 
        src={leafPricing1}
        alt=""
        className="hidden lg:block absolute top-1/2 right-16 w-28 h-28 md:w-36 md:h-36 opacity-70"
      />
      <img 
        src={leafPricing2}
        alt=""
        className="hidden lg:block absolute bottom-1/3 left-16 w-20 h-20 md:w-32 md:h-32 opacity-70"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-12 md:mb-16">
          Planos para cada necessidade
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto items-start">
          {plans.map((plan, index) => (
            <div key={index} className="relative">
              {plan.badge && (
                <div className="absolute -top-4 md:-top-6 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-[#5A7D3C] text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}
              <div
                className={`rounded-2xl md:rounded-3xl p-6 md:p-10 bg-white shadow-lg transition-all duration-300 ${
                  plan.highlighted ? 'mt-6 md:mt-6' : ''
                }`}
              >
                <div className="text-center mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#5A7D3C]">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-3 md:mb-4">
                    <span className="text-xs md:text-sm text-gray-600 mr-2">POR</span>
                    <span className="text-4xl md:text-6xl font-bold text-[#5A7D3C]">{plan.price}</span>
                    <span className="text-gray-600 ml-2 text-sm md:text-base">/mês</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 px-2 md:px-3">
                    {plan.description}
                  </p>
                </div>
                
                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 md:gap-3">
                      <span className="text-gray-500 text-sm md:text-base mt-0.5 md:mt-1">//</span>
                      <span className="text-xs md:text-sm text-gray-700 italic">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <PaymentButton
                  buttonText={plan.buttonText}
                  fullWidth
                  paymentUrl={plan.paymentUrl}
                  className="text-xs md:text-sm py-3 md:py-4"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
