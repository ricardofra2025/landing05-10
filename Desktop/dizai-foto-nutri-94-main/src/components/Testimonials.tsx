import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      content: "A Ethra mudou minha relação com a comida. Agora sei exatamente o que estou consumindo sem aplicativos complicados.",
      name: "Mariana Silva",
      role: "Perdeu 15kg em 6 meses"
    },
    {
      content: "Como profissional ocupado, ter análise nutricional precisa diretamente no WhatsApp fez toda a diferença na minha dieta.",
      name: "Ricardo Oliveira",
      role: "Empresário, 42 anos"
    },
    {
      content: "A Ethra me ajudou a entender meus hábitos alimentares. As dicas personalizadas são sempre relevantes para o meu objetivo.",
      name: "Camila Santos",
      role: "Professora, 35 anos"
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          O que nossos usuários dizem
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#7CB342] transition-all hover:shadow-lg"
            >
              <div className="text-6xl text-[#7CB342] mb-4">"</div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {testimonial.content}
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
