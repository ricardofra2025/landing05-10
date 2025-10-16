
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SignUpFormProps {
  onSuccess: () => void;
}

const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipo, setTipo] = useState<'cliente' | 'profissional'>('cliente');
  
  const { signUp, loading } = useAuth();
  const { toast } = useToast();

  const validateForm = () => {
    if (password.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive",
      });
      return false;
    }

    if (!nome.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe seu nome completo",
        variant: "destructive",
      });
      return false;
    }

    if (!email.trim()) {
      toast({
        title: "Email obrigatório",
        description: "Por favor, informe um email válido",
        variant: "destructive",
      });
      return false;
    }

    if (!telefone.trim()) {
      toast({
        title: "Telefone obrigatório",
        description: "Por favor, informe seu número de telefone",
        variant: "destructive",
      });
      return false;
    }

    // Validação básica de telefone (pelo menos 10 dígitos)
    const telefoneNumeros = telefone.replace(/\D/g, '');
    if (telefoneNumeros.length < 10) {
      toast({
        title: "Telefone inválido",
        description: "Por favor, informe um telefone válido com pelo menos 10 dígitos",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    console.log('=== INICIANDO PROCESSO DE CADASTRO ===');
    console.log('Dados do formulário:', { 
      email: email.trim(), 
      nome: nome.trim(), 
      telefone: telefone.trim(), 
      tipo 
    });
    
    try {
      const result = await signUp(email.trim(), password, {
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim(),
        tipo: tipo
      });
      
      if (result.error) {
        console.error('Erro retornado do signUp:', result.error);
        
        let errorMessage = "Erro ao criar conta";
        if (result.error.message.includes('User already registered')) {
          errorMessage = "Este email já está cadastrado";
        } else if (result.error.message.includes('Invalid email')) {
          errorMessage = "Email inválido";
        } else if (result.error.message.includes('Password')) {
          errorMessage = "Senha deve ter pelo menos 6 caracteres";
        }
        
        toast({
          title: "Erro no cadastro",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      console.log('✅ Processo de cadastro concluído com sucesso');
      
      toast({
        title: "Cadastro realizado!",
        description: "Verifique seu email para confirmar sua conta.",
      });
      
      // Limpar formulário apenas em caso de sucesso
      setEmail('');
      setPassword('');
      setNome('');
      setTelefone('');
      setTipo('cliente');
      
      onSuccess();
      
    } catch (error: any) {
      console.error('Erro inesperado no processo:', error);
      
      toast({
        title: "Erro inesperado",
        description: "Tente novamente em alguns instantes",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome Completo *</Label>
        <Input
          id="nome"
          type="text"
          placeholder="Seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-email">Email *</Label>
        <Input
          id="register-email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefone">Telefone *</Label>
        <Input
          id="telefone"
          type="tel"
          placeholder="(11) 99999-9999"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipo">Tipo de Conta *</Label>
        <Select 
          value={tipo} 
          onValueChange={(value: 'cliente' | 'profissional') => setTipo(value)}
          disabled={loading}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cliente">Cliente</SelectItem>
            <SelectItem value="profissional">Profissional</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="register-password">Senha *</Label>
        <div className="relative">
          <Input
            id="register-password"
            type={showPassword ? "text" : "password"}
            placeholder="Sua senha (mínimo 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
            disabled={loading}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-button hover:opacity-90"
        disabled={loading}
      >
        {loading ? 'Criando conta...' : 'Criar Conta'}
      </Button>
    </form>
  );
};

export default SignUpForm;
