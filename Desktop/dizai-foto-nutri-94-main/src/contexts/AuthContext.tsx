import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { useProfileCreation } from '@/hooks/useProfileCreation';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Função para limpeza completa de sessão
const clearAllStorageData = () => {
  console.log('🧹 Limpando todos os dados de sessão...');
  
  try {
    // Limpar localStorage
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.includes('supabase') || key.includes('auth') || key.includes('session')) {
        localStorage.removeItem(key);
        console.log(`🗑️ Removido do localStorage: ${key}`);
      }
    });
    
    // Limpar sessionStorage
    const sessionKeys = Object.keys(sessionStorage);
    sessionKeys.forEach(key => {
      if (key.includes('supabase') || key.includes('auth') || key.includes('session')) {
        sessionStorage.removeItem(key);
        console.log(`🗑️ Removido do sessionStorage: ${key}`);
      }
    });
    
    console.log('✅ Limpeza de storage concluída');
  } catch (error) {
    console.error('❌ Erro na limpeza de storage:', error);
  }
};

// Singleton para evitar múltiplas inicializações
let authProviderInstance: any = null;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const { redirectUserByType } = useAuthRedirect();
  const { ensureProfileExists } = useProfileCreation();

  const handleAuthRedirect = useCallback(async (userId: string) => {
    if (!userId || !initialized) return;
    
    const currentPath = window.location.pathname;
    const isAlreadyInMainPage = ['/dashboard', '/professional', '/admin'].includes(currentPath);
    
    // Se estamos em reset-password, não redirecionar imediatamente
    if (currentPath === '/reset-password') {
      console.log('🔄 Usuário está em reset-password, aguardando...');
      return;
    }
    
    if (!isAlreadyInMainPage) {
      console.log('🔄 Redirecionando usuário baseado no tipo...');
      
      // Debounce o redirecionamento para evitar chamadas múltiplas
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
      
      const timer = setTimeout(() => {
        redirectUserByType(userId);
      }, 300);
      
      setRedirectTimer(timer);
    } else {
      console.log('✅ Usuário já está na página correta:', currentPath);
    }
  }, [redirectUserByType, initialized, redirectTimer]);

  useEffect(() => {
    // Evitar múltiplas inicializações usando singleton
    if (authProviderInstance) {
      console.log('⚠️ AuthProvider já inicializado, reutilizando instância');
      return;
    }

    console.log('🚀 AuthProvider inicializando uma única vez...');
    authProviderInstance = true;
    
    let isMounted = true;
    let authSubscription: any = null;

    const initializeAuth = async () => {
      try {
        // Configurar listener ANTES de verificar sessão
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, currentSession) => {
            if (!isMounted) return;
            
            console.log('📡 Auth state changed:', {
              event,
              userEmail: currentSession?.user?.email,
              currentPath: window.location.pathname
            });
            
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            setLoading(false);

            // Apenas redirecionar em SIGNED_IN se não estivermos em reset-password
            if (event === 'SIGNED_IN' && currentSession?.user) {
              const currentPath = window.location.pathname;
              if (currentPath !== '/reset-password') {
                console.log('✅ Login detectado, preparando redirecionamento...');
                setTimeout(() => {
                  handleAuthRedirect(currentSession.user.id);
                }, 1000); // Delay maior para evitar conflitos
              } else {
                console.log('🔄 Login em reset-password detectado, não redirecionando');
              }
            }

            // Reset em logout com limpeza completa
            if (event === 'SIGNED_OUT') {
              if (redirectTimer) {
                clearTimeout(redirectTimer);
                setRedirectTimer(null);
              }
              console.log('👋 Logout detectado, executando limpeza completa...');
              
              // Garantir que realmente limpe o estado
              setUser(null);
              setSession(null);
              
              // Limpeza completa de storage
              clearAllStorageData();
              
              // Redirecionar apenas se não estivermos já na home ou em páginas públicas
              const currentPath = window.location.pathname;
              const publicPaths = ['/', '/auth', '/reset-password'];
              if (!publicPaths.includes(currentPath)) {
                console.log('🔄 Redirecionando para home após logout...');
                window.location.href = '/';
              }
            }
          }
        );

        authSubscription = subscription;

        // Verificar sessão existente
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (isMounted) {
          console.log('🔍 Sessão existente encontrada:', {
            hasSession: !!currentSession,
            userEmail: currentSession?.user?.email,
            currentPath: window.location.pathname
          });
          
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          setLoading(false);
          setInitialized(true);
        }

      } catch (error) {
        console.error('Erro na inicialização do auth:', error);
        if (isMounted) {
          setLoading(false);
          setInitialized(true);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
      // Reset singleton na limpeza
      authProviderInstance = null;
    };
  }, []); // Dependências vazias para executar apenas uma vez

  const signUp = useCallback(async (email: string, password: string, userData?: any) => {
    try {
      setLoading(true);
      const redirectUrl = `${window.location.origin}/`;
      
      console.log('=== INICIANDO SIGNUP DETALHADO ===');
      console.log('📧 Email:', email);
      console.log('📋 UserData recebido:', userData);
      
      // Validar dados obrigatórios antes de enviar
      if (!userData?.nome?.trim()) {
        console.error('❌ Nome é obrigatório mas não foi fornecido');
        toast({
          title: "Erro no cadastro",
          description: "Nome é obrigatório",
          variant: "destructive",
        });
        return { error: new Error('Nome é obrigatório') };
      }
      
      if (!userData?.telefone?.trim()) {
        console.error('❌ Telefone é obrigatório mas não foi fornecido');
        toast({
          title: "Erro no cadastro",
          description: "Telefone é obrigatório",
          variant: "destructive",
        });
        return { error: new Error('Telefone é obrigatório') };
      }
      
      const metaData = {
        nome: userData?.nome?.trim() || email.split('@')[0],
        email: email.trim(),
        telefone: userData?.telefone?.trim() || '',
        tipo: userData?.tipo || 'cliente'
      };
      
      console.log('📝 MetaData preparado para envio:', metaData);
      
      // Validação final dos metadados
      console.log('🔍 Validação final dos dados:');
      console.log('  ✅ Nome:', metaData.nome);
      console.log('  ✅ Email:', metaData.email);
      console.log('  ✅ Telefone:', metaData.telefone);
      console.log('  ✅ Tipo:', metaData.tipo);
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: metaData
        }
      });

      console.log('📡 Resposta do Supabase signUp:', { 
        userData: data?.user ? {
          id: data.user.id,
          email: data.user.email,
          metadata: data.user.user_metadata
        } : null,
        error 
      });

      if (error) {
        console.error('❌ Erro no signUp:', error);
        toast({
          title: "Erro no cadastro",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      if (data?.user) {
        console.log('✅ Usuário criado no Supabase:', data.user.id);
        console.log('📋 Metadados salvos no usuário:', data.user.user_metadata);
        
        // Aguardar um pouco para o trigger processar
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('🔄 Iniciando criação/verificação do perfil...');
        const profileCreated = await ensureProfileExists(data.user.id, metaData);
        
        if (!profileCreated) {
          console.warn('⚠️ Falha na criação do perfil via fallback');
          toast({
            title: "Conta criada com aviso",
            description: "Conta criada, mas houve problema na criação do perfil. Contate o suporte se necessário.",
            variant: "destructive",
          });
        } else {
          console.log('✅ Perfil criado/verificado com sucesso');
          toast({
            title: "Cadastro realizado!",
            description: "Verifique seu email para confirmar sua conta.",
          });
        }
      }

      return { error };
    } catch (error: any) {
      console.error('❌ Erro inesperado no signup:', error);
      toast({
        title: "Erro no cadastro",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  }, [toast, ensureProfileExists]);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Erro no login",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      if (data?.user) {
        toast({
          title: "Login realizado!",
          description: "Redirecionando...",
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      console.log('🔄 Iniciando processo de logout...');
      
      // Limpar timers e estado local primeiro
      if (redirectTimer) {
        clearTimeout(redirectTimer);
        setRedirectTimer(null);
      }
      
      // Limpeza ANTES do signOut para garantir limpeza completa
      clearAllStorageData();
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ Erro no logout:', error);
        toast({
          title: "Erro no logout",
          description: error.message,
          variant: "destructive",
        });
      } else {
        console.log('✅ Logout realizado com sucesso');
        toast({
          title: "Logout realizado",
          description: "Você foi desconectado com sucesso.",
        });
      }
    } catch (error: any) {
      console.error('❌ Erro inesperado no logout:', error);
      toast({
        title: "Erro no logout",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast, redirectTimer]);

  const resetPassword = useCallback(async (email: string) => {
    try {
      console.log('🔄 AuthContext: Iniciando reset de senha para:', email);
      
      // Usar a URL correta do projeto atual
      const redirectUrl = 'https://dizai-foto-nutri-94.lovable.app/reset-password';
      
      console.log('🔗 URL de redirecionamento configurada:', redirectUrl);

      // Teste de conectividade com o Supabase antes do reset
      try {
        console.log('🔍 Testando conectividade com Supabase...');
        const { data: healthCheck, error: healthError } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
        if (healthError) {
          console.error('❌ Erro na conectividade:', healthError);
          throw new Error('Problema de conexão com o servidor. Tente novamente.');
        }
        console.log('✅ Conectividade com Supabase OK');
      } catch (connectError: any) {
        console.error('❌ Problema de conectividade com Supabase:', connectError);
        return { error: new Error('Problema de conexão com o servidor. Tente novamente.') };
      }

      console.log('📧 Enviando email de reset via Supabase...');
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      console.log('📡 Resposta do Supabase resetPasswordForEmail:', { data, error });

      if (error) {
        console.error('❌ Erro no reset:', error);
        console.error('❌ Detalhes do erro:', {
          message: error.message,
          name: error.name,
          status: error.status
        });
        
        // Não exibir toast aqui, deixar para o componente tratar
        return { error };
      } else {
        console.log('✅ Email de reset enviado com sucesso');
        console.log('📧 Email enviado para:', email);
        console.log('🔗 Com redirecionamento para:', redirectUrl);
        
        // Não exibir toast aqui, deixar para o componente tratar
        return { error: null };
      }
    } catch (error: any) {
      console.error('❌ Erro inesperado no reset:', error);
      console.error('❌ Tipo do erro:', typeof error);
      console.error('❌ Nome do erro:', error.name);
      console.error('❌ Stack:', error.stack);
      return { error };
    }
  }, []);

  const value = useMemo(() => ({
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }), [user, session, loading, signUp, signIn, signOut, resetPassword]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
