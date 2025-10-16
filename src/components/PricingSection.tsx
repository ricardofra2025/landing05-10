import React, { useEffect, useState } from "react";
import leafPricing1 from "@/assets/leaf-pricing-1.png";
import leafPricing2 from "@/assets/leaf-pricing-2.png";

import { getActivePlans, type Plano } from "@/lib/subscription-service";
import { formatters } from "@/lib/helpers";
import { Check } from "lucide-react";
import { Button } from "./ui/button";
import EmailCollectionModal from "./EmailCollectionModal";

const PricingSection: React.FC = () => {
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);
  const [plans, setPlans] = useState<Array<Plano>>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plano | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadPlan = async () => {
      try {
        setIsLoadingPlans(true);
        const plansResponse = await getActivePlans();
        setPlans(plansResponse);
      } catch (error) {
        console.error("Erro ao carregar planos:", error);
      } finally {
        setIsLoadingPlans(false);
      }
    };

    loadPlan();
  }, []);

  const handlePlanSelect = (plan: Plano) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <section
      id="pricing"
      className="py-16 md:py-24 bg-[#8BA675] relative overflow-hidden"
    >
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

        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {isLoadingPlans && <p>Loading plans...</p>}
          {(() => {
            if (plans.length === 3) {
              const essencial = plans.filter(
                (plan) => plan.nome_plano === "ESSENCIAL"
              );
              const outros = plans.filter(
                (plan) => plan.nome_plano !== "ESSENCIAL"
              );

              if (essencial && outros.length === 2) {
                return [
                  <PricingCard
                    key={outros[0].id}
                    plan={outros[0]}
                    onSelect={handlePlanSelect}
                  />,
                  <PricingCard
                    key={essencial[0].id}
                    plan={essencial[0]}
                    onSelect={handlePlanSelect}
                  />,
                  <PricingCard
                    key={outros[1].id}
                    plan={outros[1]}
                    onSelect={handlePlanSelect}
                  />,
                ];
              }
            }

            return plans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                onSelect={handlePlanSelect}
              />
            ));
          })()}
        </div>

        {/* Mobile - Stack all cards */}
        <div className="lg:hidden space-y-8">
          {[
            plans.find((plan) => plan.nome_plano === "Essencial"),
            ...plans.filter((plan) => plan.nome_plano !== "Essencial"),
          ].map(
            (plan) =>
              plan && (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  onSelect={handlePlanSelect}
                />
              )
          )}
        </div>
      </div>

      {/* Modal de coleta de email */}
      {selectedPlan && (
        <EmailCollectionModal
          plan={selectedPlan}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

const PricingCard = ({
  plan,
  onSelect,
}: {
  plan: Plano;
  onSelect: (plan: Plano) => void;
}) => {
  const handleBuy = () => {
    onSelect(plan);
  };
  return (
    <div className="relative">
      {plan.popular && (
        <div className="absolute -top-4 md:-top-6 left-1/2 transform -translate-x-1/2 z-20">
          <span className="bg-[#5A7D3C] text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap">
            + MAIS POPULAR
          </span>
        </div>
      )}
      <div
        className={`rounded-2xl md:rounded-3xl p-6 md:p-10 bg-white shadow-lg transition-all duration-300 ${
          plan.popular ? "mt-6 md:mt-6" : ""
        }`}
      >
        <div className="text-center mb-6 md:mb-8">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#5A7D3C]">
            {plan.nome_plano}
          </h3>
          <div className="flex items-baseline justify-center mb-3 md:mb-4">
            <span className="text-xs md:text-sm text-gray-600 mr-2">POR</span>
            <span className="text-4xl md:text-6xl font-bold text-[#5A7D3C]">
              {formatters.currency(plan.valor)}
            </span>
            <span className="text-gray-600 ml-2 text-sm md:text-base">
              /mês
            </span>
          </div>
          <p className="text-xs md:text-sm text-gray-600 px-2 md:px-3">
            {plan.descricao}
          </p>
        </div>

        <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
          {plan.features.split(",").map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start gap-2 md:gap-3">
              <Check className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-xs md:text-sm text-gray-700 italic">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Button
          size="lg"
          className="w-full bg-[#8BA675] hover:bg-[#7CA565] text-white transition-all duration-200 focus:ring-2 focus:ring-[#8BA675]/50 focus:ring-offset-2 focus:ring-offset-white active:scale-95"
          onClick={handleBuy}
        >
          {plan.action}
        </Button>
      </div>
    </div>
  );
};

export default PricingSection;
