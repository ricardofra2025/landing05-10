import React from 'react';
import coupleLookingPhone from '@/assets/couple-looking-phone.png';
import leaf3 from '@/assets/leaf-3.png';
import leaf4 from '@/assets/leaf-4.png';

const TargetAudienceSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#8BA675] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left image with decorative leaves */}
          <div className="flex justify-center lg:justify-start relative">
            <div className="relative w-full max-w-lg">
              <img 
                src={coupleLookingPhone}
                alt="Casal feliz com comida saudável"
                className="w-full h-auto relative z-10"
              />
              <img 
                src={leaf3}
                alt=""
                className="absolute -top-16 -left-16 w-40 h-40 opacity-90 z-0"
              />
              <img 
                src={leaf4}
                alt=""
                className="absolute -bottom-12 -right-12 w-32 h-32 opacity-90 z-0"
              />
            </div>
          </div>

          {/* Right content */}
          <div className="text-white space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              A Ethra foi criada para pessoas como você!
            </h2>

            <ul className="space-y-3 text-base md:text-lg">
              <li className="flex items-start gap-3">
                <span className="text-xl mt-1">//</span>
                <span className="italic">Pessoas que querem emagrecer <strong>com saúde</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl mt-1">//</span>
                <span className="italic">Famílias que desejam criar hábitos saudáveis juntos.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl mt-1">//</span>
                <span className="italic">Quem já tentou várias dietas e não conseguiu manter.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl mt-1">//</span>
                <span className="italic">Profissionais de saúde que precisam <strong>automatizar atendimentos</strong>.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
