
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import DashboardBreadcrumb from '@/components/DashboardBreadcrumb';
import AdminSidebar from '@/components/AdminSidebar';
import AdminDashboard from '@/components/AdminDashboard';
import LoadingScreen from '@/components/LoadingScreen';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();

  console.log('🔍 Admin: Estado atual:', {
    authLoading,
    profileLoading,
    hasUser: !!user,
    profileType: profile?.tipo,
    currentPath: window.location.pathname
  });

  // Mostrar loading apenas se realmente estiver carregando
  if (authLoading || profileLoading) {
    console.log('⏳ Admin: Mostrando loading screen');
    return (
      <LoadingScreen 
        message="Carregando painel administrativo..."
        variant="admin"
      />
    );
  }

  // Verificar se não há usuário logado
  if (!user) {
    console.log('🚫 Admin: Usuário não logado, redirecionando para auth');
    return <Navigate to="/auth" replace />;
  }

  // Verificar se não é admin
  if (profile && profile.tipo !== 'admin') {
    console.log('🚫 Admin: Usuário não é admin, redirecionando para dashboard');
    const redirectPath = profile.tipo === 'profissional' ? '/professional' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  // Se ainda não temos o profile carregado, mas temos user, aguardar um pouco mais
  if (!profile) {
    console.log('⏳ Admin: Profile ainda não carregado, aguardando...');
    return (
      <LoadingScreen 
        message="Verificando permissões..."
        variant="admin"
      />
    );
  }

  console.log('✅ Admin: Renderizando página admin normalmente');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <DashboardBreadcrumb currentPage="Painel Administrativo" />
        </div>
        
        <div className="flex gap-6">
          <aside className="hidden lg:block">
            <AdminSidebar />
          </aside>
          
          <main className="flex-1 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-0 bg-gradient-to-r from-white to-purple-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Painel Administrativo
                </h1>
              </div>
              <p className="text-muted-foreground">
                Gerencie usuários, monitore o sistema e configure funcionalidades da plataforma.
              </p>
            </div>
            
            <AdminDashboard />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
