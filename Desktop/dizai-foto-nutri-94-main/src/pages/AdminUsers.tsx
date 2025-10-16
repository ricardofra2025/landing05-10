
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import DashboardBreadcrumb from '@/components/DashboardBreadcrumb';
import AdminSidebar from '@/components/AdminSidebar';
import LoadingScreen from '@/components/LoadingScreen';
import UserManagement from '@/components/admin/UserManagement';
import AdminStats from '@/components/admin/AdminStats';
import { Navigate } from 'react-router-dom';

const AdminUsers = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();

  if (authLoading || profileLoading) {
    return (
      <LoadingScreen 
        message="Carregando usuários..."
        variant="admin"
      />
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (profile && profile.tipo !== 'admin') {
    const redirectPath = profile.tipo === 'profissional' ? '/professional' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  if (!profile) {
    return (
      <LoadingScreen 
        message="Verificando permissões..."
        variant="admin"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <DashboardBreadcrumb 
            currentPage="Usuários" 
            items={[{ label: 'Admin', href: '/admin' }]}
          />
        </div>
        
        <div className="flex gap-6">
          <aside className="hidden lg:block">
            <AdminSidebar />
          </aside>
          
          <main className="flex-1 space-y-6">
            {/* Cards de Estatísticas */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">
                Visão Geral dos Usuários
              </h2>
              <AdminStats />
            </div>
            
            {/* Gerenciamento de Usuários */}
            <UserManagement />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
