
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface LoadingScreenProps {
  message?: string;
  subMessage?: string;
  variant?: 'default' | 'auth' | 'admin' | 'professional';
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Carregando...", 
  subMessage,
  variant = 'default'
}) => {
  const getGradientClasses = () => {
    switch (variant) {
      case 'auth':
        return 'bg-gradient-to-br from-green-50 to-blue-50';
      case 'admin':
        return 'bg-gradient-to-br from-purple-50 to-blue-50';
      case 'professional':
        return 'bg-gradient-to-br from-blue-50 to-green-50';
      default:
        return 'bg-gradient-to-br from-green-50 to-blue-50';
    }
  };

  const getSpinnerClasses = () => {
    switch (variant) {
      case 'admin':
        return 'border-purple-500 border-t-transparent';
      case 'professional':
        return 'border-blue-500 border-t-transparent';
      default:
        return 'border-dizai-brand-green border-t-transparent';
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${getGradientClasses()}`}>
      <Card className="w-96 shadow-lg border-0">
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-4 ${getSpinnerClasses()} mx-auto mb-4`}></div>
            <p className="text-muted-foreground font-medium">{message}</p>
            {subMessage && (
              <p className="text-xs text-muted-foreground mt-2">{subMessage}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingScreen;
