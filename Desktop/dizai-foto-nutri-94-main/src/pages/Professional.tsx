
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import DashboardBreadcrumb from '@/components/DashboardBreadcrumb';
import DashboardSidebar from '@/components/DashboardSidebar';
import ProfessionalDashboard from '@/components/ProfessionalDashboard';
import LoadingScreen from '@/components/LoadingScreen';

const Professional = () => {
  const { user, loading } = useAuth();
  const { profile } = useUserProfile();

  if (loading) {
    return (
      <LoadingScreen 
        message="Carregando área profissional..."
        variant="professional"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <DashboardBreadcrumb currentPage="Área Profissional" />
        </div>
        
        <div className="flex gap-6">
          <aside className="hidden lg:block">
            <DashboardSidebar />
          </aside>
          
          <main className="flex-1 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-0 bg-gradient-to-r from-white to-blue-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-dizai-brand-green rounded-full"></div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-dizai-brand-green bg-clip-text text-transparent">
                  Bem-vindo, {profile?.nome || user?.email}!
                </h1>
              </div>
              <p className="text-muted-foreground">
                Gerencie seus clientes e acompanhe o progresso deles de forma eficiente.
              </p>
            </div>
            
            <ProfessionalDashboard />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Professional;
