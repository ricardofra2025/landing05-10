
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#7CB342] py-8">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-white text-sm">
            Ethra 2025 - todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
