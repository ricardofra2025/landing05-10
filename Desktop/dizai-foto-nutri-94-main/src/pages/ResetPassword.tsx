
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useAuth();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const checkResetSession = async () => {
      console.log('🔍 ResetPassword - Verificando sessão para reset de senha');
      console.log('🌐 URL atual:', window.location.href);
      console.log('🔗 Hash atual:', window.location.hash);
      
      // Verificar se há tokens na URL (formato hash)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      const tokenType = hashParams.get('token_type');
      const type = hashParams.get('type');

      console.log('🔗 Tokens detectados na URL:', {
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken,
        tokenType,
        type,
        accessTokenLength: accessToken?.length || 0,
        refreshTokenLength: refreshToken?.length || 0
      });

      // Se há tokens na URL e é do tipo recovery, processar
      if (accessToken && refreshToken && type === 'recovery') {
        console.log('📧 Tokens de recovery encontrados, processando...');
        
        try {
          // Definir a sessão usando os tokens da URL
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          if (error) {
            console.error('❌ Erro ao definir sessão:', error);
            toast({
              title: "Link inválido",
              description: "O link de reset pode ter expirado. Solicite um novo.",
              variant: "destructive",
            });
            setIsValidSession(false);
          } else {
            console.log('✅ Sessão de reset definida com sucesso');
            console.log('👤 Usuário da sessão:', data.user?.email);
            setIsValidSession(true);
            
            // Limpar a URL dos parâmetros
            window.history.replaceState({}, document.title, '/reset-password');
            
            toast({
              title: "Pronto para redefinir",
              description: "Agora você pode definir sua nova senha.",
            });
          }
        } catch (error) {
          console.error('❌ Erro inesperado ao processar tokens:', error);
          setIsValidSession(false);
          toast({
            title: "Erro no processamento",
            description: "Houve um problema ao processar o link. Tente solicitar um novo.",
            variant: "destructive",
          });
        }
      } 
      // Se há sessão ativa normal, verificar se é válida para reset
      else if (session?.user) {
        console.log('✅ Sessão ativa encontrada:', session.user.email);
        setIsValidSession(true);
        
        toast({
          title: "Pronto para redefinir",
          description: "Agora você pode definir sua nova senha.",
        });
      } 
      // Nenhuma sessão válida encontrada
      else {
        console.log('❌ Nenhuma sessão válida para reset encontrada');
        console.log('🔍 Situação atual:');
        console.log('  - Tokens na URL:', { accessToken: !!accessToken, refreshToken: !!refreshToken, type });
        console.log('  - Sessão ativa:', !!session);
        
        setIsValidSession(false);
        
        toast({
          title: "Sessão inválida",
          description: "Você precisa clicar no link do email para redefinir sua senha.",
          variant: "destructive",
        });
      }

      setIsCheckingSession(false);
    };

    checkResetSession();
  }, [session, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "As senhas digitadas não são iguais.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log('🔐 Tentando atualizar senha...');
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        console.error('❌ Erro ao atualizar senha:', error);
        toast({
          title: "Erro",
          description: error.message || "Não foi possível atualizar a senha.",
          variant: "destructive",
        });
      } else {
        console.log('✅ Senha atualizada com sucesso');
        
        toast({
          title: "Senha atualizada!",
          description: "Sua senha foi alterada com sucesso. Redirecionando para o login...",
        });

        // Aguardar um pouco e redirecionar para auth
        setTimeout(() => {
          window.location.href = '/auth';
        }, 2000);
      }
    } catch (error: any) {
      console.error('❌ Erro inesperado:', error);
      toast({
        title: "Erro inesperado",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-dizai-brand-green border-t-transparent mx-auto mb-4"></div>
              <p className="text-muted-foreground font-medium">Validando sessão...</p>
              <p className="text-xs text-muted-foreground mt-2">Processando link de recuperação</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isValidSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-600">
              Link Inválido ou Expirado
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Para redefinir sua senha, você precisa clicar no link enviado por email.
            </p>
            <p className="text-sm text-muted-foreground">
              Se você já clicou no link e ainda vê esta mensagem, o link pode ter expirado.
            </p>
            <Button 
              onClick={() => navigate('/auth')}
              className="w-full bg-gradient-button hover:opacity-90"
            >
              Voltar ao Login
            </Button>
            <div className="text-center mt-4">
              <p className="text-xs text-muted-foreground">
                Na página de login, use "Esqueceu sua senha?" para solicitar um novo link.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold gradient-text">
              Redefinir Senha
            </CardTitle>
            <p className="text-muted-foreground">
              Digite sua nova senha abaixo
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nova Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua nova senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua nova senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
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
                disabled={isLoading}
              >
                {isLoading ? 'Atualizando...' : 'Atualizar Senha'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
