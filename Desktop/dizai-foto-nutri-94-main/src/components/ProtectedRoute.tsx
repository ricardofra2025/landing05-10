
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Navigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'cliente' | 'profissional' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredUserType }) => {
  const { user, loading: authLoading, session } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();

  console.log('🔍 ProtectedRoute: Estado atual:', {
    authLoading,
    profileLoading,
    hasUser: !!user,
    hasSession: !!session,
    profileType: profile?.tipo,
    requiredUserType,
    currentPath: window.location.pathname
  });

  // Mostrar loading apenas se realmente estiver carregando
  if (authLoading || profileLoading) {
    const variant = requiredUserType === 'admin' ? 'admin' : 
                   requiredUserType === 'profissional' ? 'professional' : 'auth';
    
    console.log('⏳ ProtectedRoute: Mostrando loading screen');
    return (
      <LoadingScreen 
        message="Carregando sua conta..."
        subMessage="Verificando permissões"
        variant={variant}
      />
    );
  }

  // Verificar se não há usuário ou sessão
  if (!user || !session) {
    console.log('🚫 ProtectedRoute: Sem usuário/sessão, redirecionando para auth');
    return <Navigate to="/auth" replace />;
  }

  // Se ainda não temos profile mas temos user, aguardar um pouco mais
  if (!profile) {
    console.log('⏳ ProtectedRoute: Profile ainda não carregado, aguardando...');
    const variant = requiredUserType === 'admin' ? 'admin' : 
                   requiredUserType === 'profissional' ? 'professional' : 'auth';
    
    return (
      <LoadingScreen 
        message="Carregando perfil..."
        subMessage="Verificando permissões"
        variant={variant}
      />
    );
  }

  // Verificar tipo de usuário se especificado
  if (requiredUserType && profile) {
    if (profile.tipo !== requiredUserType) {
      console.log(`🚫 ProtectedRoute: Tipo incorreto (${profile.tipo} != ${requiredUserType}), redirecionando`);
      // Redirecionar para a página apropriada baseada no tipo do usuário
      const redirectPath = profile.tipo === 'admin' ? '/admin' : 
                          profile.tipo === 'profissional' ? '/professional' : '/dashboard';
      return <Navigate to={redirectPath} replace />;
    }
  }

  console.log('✅ ProtectedRoute: Acesso permitido, renderizando children');
  return <>{children}</>;
};

export default ProtectedRoute;
