
import React from 'react';

const TransformSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-5 md:px-8 bg-white relative overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Conteúdo de texto à esquerda */}
          <div className="space-y-6">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-gray-900 tracking-tight"
              style={{ 
                wordBreak: 'keep-all',
                hyphens: 'none',
                textWrap: 'balance',
                fontWeight: '500'
              }}
            >
              Transforme sua{' '}
              <span className="text-[#00C851] bg-gradient-to-r from-[#00C851] to-[#00b348] bg-clip-text text-transparent font-semibold">
                alimentação
              </span>{' '}
              com tecnologia e simplicidade
            </h2>
            
            <p 
              className="text-gray-500 text-base md:text-lg font-light leading-relaxed"
              style={{ 
                wordBreak: 'keep-all',
                hyphens: 'none'
              }}
            >
              De forma simples, eficaz e sem complicações.
            </p>
            
            <p 
              className="text-gray-600 text-base md:text-lg font-light leading-relaxed"
              style={{ 
                wordBreak: 'keep-all',
                hyphens: 'none'
              }}
            >
              Com a Ethra, uma simples foto vira uma análise completa{' '}
              <span className="text-[#00C851] font-medium">precisa, rápida e prática</span>, 
              direto no seu WhatsApp.
            </p>

            {/* Indicadores nutricionais */}
            <div className="flex gap-4 pt-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#00C851] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  27g
                </div>
                <span className="text-xs text-gray-500 mt-1 font-medium">Prot.</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  250
                </div>
                <span className="text-xs text-gray-500 mt-1 font-medium">Cal.</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  10g
                </div>
                <span className="text-xs text-gray-500 mt-1 font-medium">Fat.</span>
              </div>
            </div>
          </div>

          {/* Imagem do prato à direita */}
          <div className="flex justify-center lg:justify-end relative">
            <div className="relative">
              {/* Círculo decorativo verde */}
              <div className="absolute -top-8 -right-8 w-80 h-80 bg-[#00C851] opacity-10 rounded-full"></div>
              <div className="absolute -top-4 -right-4 w-72 h-72 border-2 border-[#00C851] opacity-20 rounded-full"></div>
              
              {/* Imagem do prato */}
              <div className="relative z-10 w-full max-w-md">
                <img 
                  src="/lovable-uploads/2dadf702-d061-4b54-a93b-d4763f355471.png"
                  alt="Prato com bife grelhado, salada e batatas"
                  className="w-full h-auto object-contain rounded-full shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformSection;
