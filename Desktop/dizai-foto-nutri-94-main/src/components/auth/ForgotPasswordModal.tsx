
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email obrigatório",
        description: "Por favor, insira seu email para recuperar a senha.",
        variant: "destructive",
      });
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log('🔄 ForgotPasswordModal: Iniciando reset de senha para:', email.trim());
    
    try {
      const { error } = await resetPassword(email.trim());
      
      if (error) {
        console.error('❌ ForgotPasswordModal: Erro no reset:', error);
        
        // Tratamento de erros mais específico baseado na mensagem
        let errorMessage = "Ocorreu um erro ao enviar o email de recuperação.";
        let errorTitle = "Erro no envio";
        
        // Verificar diferentes tipos de erro
        if (error.message?.toLowerCase().includes('email not confirmed')) {
          errorTitle = "Email não confirmado";
          errorMessage = "Este email ainda não foi confirmado. Verifique sua caixa de entrada primeiro.";
        } else if (error.message?.toLowerCase().includes('user not found')) {
          errorTitle = "Email não encontrado";
          errorMessage = "Não encontramos uma conta com este email.";
        } else if (error.message?.toLowerCase().includes('too many requests')) {
          errorTitle = "Muitas tentativas";
          errorMessage = "Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.";
        } else if (error.message?.toLowerCase().includes('invalid email')) {
          errorTitle = "Email inválido";
          errorMessage = "Email inválido. Verifique se o formato está correto.";
        } else if (error.message?.toLowerCase().includes('network') || error.message?.toLowerCase().includes('fetch')) {
          errorTitle = "Erro de conexão";
          errorMessage = "Problema de conexão com o servidor. Verifique sua internet e tente novamente.";
        } else if (error.message?.toLowerCase().includes('invalid') && error.message?.toLowerCase().includes('url')) {
          errorTitle = "Configuração do servidor";
          errorMessage = "Problema na configuração do servidor. Entre em contato com o suporte.";
        } else {
          // Log do erro completo para debug
          console.error('❌ Erro detalhado:', {
            message: error.message,
            name: error.name,
            status: error.status
          });
          
          errorMessage = `Erro: ${error.message}`;
        }
        
        toast({
          title: errorTitle,
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        console.log('✅ ForgotPasswordModal: Email de reset enviado com sucesso');
        toast({
          title: "Email enviado!",
          description: "Verifique sua caixa de entrada e spam para instruções de recuperação de senha.",
        });
        setEmail('');
        onClose();
      }
    } catch (error: any) {
      console.error('❌ ForgotPasswordModal: Erro inesperado:', error);
      
      let errorMessage = "Erro de conexão. Verifique sua internet e tente novamente.";
      
      if (error.message?.includes('fetch')) {
        errorMessage = "Problema de conexão com o servidor. Tente novamente em alguns instantes.";
      } else if (error.name === 'TypeError') {
        errorMessage = "Erro de rede. Verifique sua conexão com a internet.";
      }
      
      toast({
        title: "Erro de conexão",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setEmail('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Recuperar Senha</DialogTitle>
          <DialogDescription>
            Digite seu email e enviaremos instruções para recuperar sua senha.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email">Email</Label>
            <Input
              id="reset-email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="bg-gradient-button hover:opacity-90"
            >
              {isLoading ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
