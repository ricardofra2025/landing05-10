
import React from 'react';
import { Play, MessageSquare, Camera, BarChart3, Target, TrendingUp } from 'lucide-react';

const DemoSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-5 md:px-8 bg-gradient-to-br from-gray-50 to-green-50 relative overflow-hidden">
      <div className="container mx-auto">
        {/* Apelo Emocional */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6">
            🍔 PARE DE SOFRER COM DIETAS
          </div>
          
          <h2 
            className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-gray-900 tracking-tight mb-6"
            style={{ 
              wordBreak: 'keep-all',
              hyphens: 'none',
              textWrap: 'balance',
              fontWeight: '500'
            }}
          >
            Já cansou de contar calorias, pesar comida ou seguir{' '}
            <span className="text-red-500 font-semibold">dietas que não funcionam?</span>
          </h2>
          
          <p 
            className="text-gray-600 text-base md:text-lg font-light leading-relaxed max-w-3xl mx-auto mb-8"
            style={{ 
              wordBreak: 'keep-all',
              hyphens: 'none'
            }}
          >
            A Ethra faz isso por você. De forma{' '}
            <span className="text-[#00C851] font-medium">leve, automática e personalizada</span>, 
            direto no seu WhatsApp.
          </p>
        </div>

        {/* Demonstração com Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          {/* Imagem do celular à esquerda */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Imagem do celular com a análise */}
              <div className="max-w-sm w-full">
                <img 
                  src="/lovable-uploads/9695ae8d-d965-4cc0-968b-ea7a1facb5c2.png"
                  alt="Tela do aplicativo Ethra mostrando análise nutricional completa"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#00C851] opacity-10 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500 opacity-10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Steps do processo à direita */}
          <div className="space-y-8">
            <h3 
              className="text-xl md:text-2xl font-medium text-gray-900 mb-8"
              style={{ fontWeight: '500' }}
            >
              Como funciona em 3 passos simples:
            </h3>
            
            <div className="space-y-6">
              {/* Passo 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#00C851] rounded-full flex items-center justify-center flex-shrink-0">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">1. Tire uma foto</h4>
                  <p className="text-gray-600 text-sm">Envie a imagem da sua refeição pelo WhatsApp</p>
                </div>
              </div>

              {/* Passo 2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">2. Receba a análise</h4>
                  <p className="text-gray-600 text-sm">Nossa IA identifica e calcula todos os nutrientes</p>
                </div>
              </div>

              {/* Passo 3 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">3. Acompanhe seu progresso</h4>
                  <p className="text-gray-600 text-sm">Veja seu histórico e evolução nutricional</p>
                </div>
              </div>
            </div>

            {/* CTA Button simulando play */}
            <div className="pt-4">
              <button className="flex items-center gap-3 bg-white border-2 border-[#00C851] text-[#00C851] px-6 py-3 rounded-full font-medium hover:bg-[#00C851] hover:text-white transition-all duration-300 group">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Ver demonstração completa
              </button>
            </div>
          </div>
        </div>

        {/* Apelo Lógico - Como funciona em etapas completas */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 
              className="text-2xl md:text-3xl font-medium text-gray-900 mb-4"
              style={{ fontWeight: '500' }}
            >
              Escolha o plano ideal e comece a evoluir
            </h3>
            <p className="text-gray-600 text-lg">
              Processo completo em 5 etapas simples para transformar sua alimentação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Etapa 1 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#00C851] rounded-full flex items-center justify-center mx-auto">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">1. Envie uma foto do prato</h4>
                <p className="text-gray-600 text-sm">Tire uma foto da sua refeição e envie pelo WhatsApp</p>
              </div>
            </div>

            {/* Etapa 2 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">2. Receba a análise nutricional</h4>
                <p className="text-gray-600 text-sm">Nossa IA calcula calorias, proteínas e todos os nutrientes</p>
              </div>
            </div>

            {/* Etapa 3 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">3. Veja seu progresso com relatórios semanais</h4>
                <p className="text-gray-600 text-sm">Acompanhe sua evolução com relatórios detalhados</p>
              </div>
            </div>

            {/* Etapa 4 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">4. Receba sugestões personalizadas</h4>
                <p className="text-gray-600 text-sm">Dicas customizadas baseadas nos seus objetivos</p>
              </div>
            </div>

            {/* Etapa 5 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">5. Comece a evoluir</h4>
                <p className="text-gray-600 text-sm">Transforme seus hábitos e alcance seus objetivos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
