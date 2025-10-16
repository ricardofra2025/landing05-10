import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentButtonProps extends ButtonProps {
  buttonText?: string;
  fullWidth?: boolean;
  className?: string;
  paymentUrl: string;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  buttonText = "Assinar agora",
  fullWidth = false,
  className,
  paymentUrl,
  ...props
}) => {
  return (
    <Button
      asChild
      className={cn(
        "bg-[#8BA675] hover:bg-[#7CA565] text-white transition-all duration-200",
        "focus:ring-2 focus:ring-[#8BA675]/50 focus:ring-offset-2 focus:ring-offset-white",
        "active:scale-95",
        fullWidth ? "w-full" : "",
        className
      )}
      {...props}
    >
      <a 
        href={paymentUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label={buttonText}
      >
        <CreditCard className="mr-2 h-5 w-5" />
        <span className="relative z-10">{buttonText}</span>
      </a>
    </Button>
  );
};

export default PaymentButton;
