import React from "react";

const Success: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-white">
      <div className="bg-green-100 p-8 rounded-lg shadow-md flex flex-col items-center">
        <img
          src="/imagens/Logomarca.png"
          alt="Pagamento aprovado"
          className="h-16 mb-4"
        />
        <h1 className="text-2xl font-bold text-green-700 mb-2">
          Pagamento realizado com sucesso!
        </h1>
        <p className="text-gray-600 mt-2">
          Obrigado por sua compra. Em breve você receberá um e-mail com os
          detalhes.
        </p>
      </div>
    </div>
  );
};

export default Success;
