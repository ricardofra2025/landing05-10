
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq: React.FC = () => {
  const faqs = [
    {
      question: "Como a Ethra analisa meus alimentos sem precisar de um app?",
      answer: "Nossa IA analisa as fotos enviadas via WhatsApp e retorna informações nutricionais completas em segundos, direto na conversa."
    },
    {
      question: "Preciso pagar para usar a Ethra?",
      answer: "Oferecemos diferentes planos para atender suas necessidades. Confira nossos planos acima e escolha o ideal para você."
    },
    {
      question: "Posso mudar meu plano a qualquer momento?",
      answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento através do WhatsApp."
    },
    {
      question: "A Ethra funciona com qualquer tipo de comida?",
      answer: "Sim! Nossa IA reconhece uma ampla variedade de alimentos e pratos, desde refeições caseiras até fast food."
    },
    {
      question: "Vocês armazenam minhas informações alimentares?",
      answer: "Todas as suas informações são armazenadas de forma segura e você tem total controle sobre seus dados."
    },
    {
      question: "Como eu começo a usar?",
      answer: "É simples! Clique em qualquer botão 'Conheça os planos', escolha seu plano e comece a usar imediatamente via WhatsApp."
    },
    {
      question: "Posso usar a Ethra para acompanhar meus clientes como nutricionista?",
      answer: "Sim! Temos um plano profissional especialmente desenvolvido para nutricionistas e profissionais da saúde gerenciarem seus clientes."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#8BA675]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Perguntas Frequentes
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-xl overflow-hidden"
            >
              <AccordionTrigger className="text-left font-semibold px-6 py-5 hover:no-underline hover:opacity-90 text-[#5A7D3C]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 leading-relaxed text-gray-700">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </section>
  );
};

export default Faq;
