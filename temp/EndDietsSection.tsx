import React from 'react';
import personEating from '@/assets/person-eating.png';
import leaf1 from '@/assets/leaf-1.png';
import leaf2 from '@/assets/leaf-2.png';
import caloriesIcon from '@/assets/calories-icon.png';
import weightIcon from '@/assets/weight-icon.png';
import notesIcon from '@/assets/notes-icon.png';

const EndDietsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F5F5F5]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left image */}
          <div className="flex justify-center relative">
            <div className="relative">
              <img 
                src={personEating}
                alt="Pessoa preparando comida saudável"
                className="w-full max-w-md"
              />
              <img 
                src={leaf1}
                alt=""
                className="absolute -top-12 -left-12 w-32 h-32 opacity-90"
              />
              <img 
                src={leaf2}
                alt=""
                className="absolute -bottom-12 -right-12 w-28 h-28 opacity-90"
              />
            </div>
          </div>

          {/* Right content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5A7D3C]">
              O fim das dietas complicadas
            </h2>
            <p className="text-base text-gray-700">
              Já tentou seguir uma dieta e desistiu no meio do caminho porque era difícil demais?
            </p>

            {/* Feature cards */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white rounded-2xl p-5 text-center shadow-sm flex-1">
                <div className="w-14 h-14 bg-[#7CB342] rounded-full flex items-center justify-center mx-auto mb-3">
                  <img src={caloriesIcon} alt="Calories icon" className="w-7 h-7" />
                </div>
                <p className="text-xs font-semibold text-gray-800">Contar calorias<br/>manualmente</p>
              </div>

              <div className="bg-white rounded-2xl p-5 text-center shadow-sm flex-1">
                <div className="w-14 h-14 bg-[#7CB342] rounded-full flex items-center justify-center mx-auto mb-3">
                  <img src={weightIcon} alt="Weight icon" className="w-7 h-7" />
                </div>
                <p className="text-xs font-semibold text-gray-800">Pesar alimentos<br/>todos os dias</p>
              </div>

              <div className="bg-white rounded-2xl p-5 text-center shadow-sm flex-1">
                <div className="w-14 h-14 bg-[#7CB342] rounded-full flex items-center justify-center mx-auto mb-3">
                  <img src={notesIcon} alt="Notes icon" className="w-7 h-7" />
                </div>
                <p className="text-xs font-semibold text-gray-800">Anotar refeições em<br/>aplicativos chatos</p>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              Com a Ethra, nada disso é necessário! A IA faz o trabalho pesado por você e entrega informações claras e úteis, direto no seu WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EndDietsSection;
