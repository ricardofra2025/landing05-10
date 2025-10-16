
import React from 'react';

const HeaderLogo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <img 
        src="/lovable-uploads/8d74b715-8a44-47ed-92be-4159edbfb736.png" 
        alt="Ethra" 
        className="h-12 w-auto"
      />
      <span className="text-3xl font-bold text-ethra-dark">Ethra</span>
    </div>
  );
};

export default HeaderLogo;
