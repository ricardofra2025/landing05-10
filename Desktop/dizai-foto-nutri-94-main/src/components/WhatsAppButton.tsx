
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps extends ButtonProps {
  showBadge?: boolean;
  buttonText?: string;
  fullWidth?: boolean;
  className?: string;
  iconOnly?: boolean;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  showBadge = false,
  buttonText = "Quero testar agora",
  fullWidth = false,
  className,
  iconOnly = false,
  ...props
}) => {
  // URL codificado da mensagem "Olá! Quero saber mais sobre a Ethra"
  const whatsappMessage = encodeURIComponent("Olá! Quero saber mais sobre a Ethra");
  const whatsappLink = `https://wa.me/555189457133?text=${whatsappMessage}`;
  
  return (
    <Button
      asChild
      className={cn(
        "bg-ethra-whatsapp hover:bg-ethra-whatsapp-dark text-white whatsapp-button relative",
        "focus:ring-2 focus:ring-ethra-green/50 focus:ring-offset-2 focus:ring-offset-white",
        "active:scale-95 transition-all duration-200",
        fullWidth ? "w-full" : "",
        iconOnly ? "p-3 min-w-12 min-h-12" : "px-6 py-5 min-h-[48px]",
        className
      )}
      {...props}
    >
      <a 
        href={whatsappLink} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label={iconOnly ? "Contato pelo WhatsApp" : buttonText}
      >
        <MessageSquare className={iconOnly ? "h-5 w-5" : "mr-2 h-5 w-5"} />
        {!iconOnly && (
          <>
            <span className="relative z-10">{buttonText}</span>
            {showBadge && (
              <Badge variant="outline" className="bg-white text-ethra-green border-none ml-1 px-2 font-medium">
                Grátis
              </Badge>
            )}
          </>
        )}
        <span className="absolute inset-0 bg-gradient-to-r from-ethra-whatsapp to-ethra-whatsapp-dark opacity-0 hover:opacity-100 transition-opacity rounded-md"></span>
      </a>
    </Button>
  );
};

export default WhatsAppButton;
