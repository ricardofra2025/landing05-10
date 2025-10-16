
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import DashboardBreadcrumb from '@/components/DashboardBreadcrumb';
import DashboardSidebar from '@/components/DashboardSidebar';
import ProgressOverview from '@/components/ProgressOverview';
import NutritionChart from '@/components/NutritionChart';
import RecentMeals from '@/components/RecentMeals';
import NutritionGoals from '@/components/NutritionGoals';
import LoadingScreen from '@/components/LoadingScreen';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { profile } = useUserProfile();

  if (loading) {
    return (
      <LoadingScreen 
        message="Carregando seu dashboard..."
        variant="default"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <DashboardBreadcrumb currentPage="Dashboard" />
        </div>
        
        <div className="flex gap-6">
          <aside className="hidden lg:block">
            <DashboardSidebar />
          </aside>
          
          <main className="flex-1 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-0 bg-gradient-to-r from-white to-green-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-8 bg-gradient-to-b from-ethra-green to-blue-500 rounded-full"></div>
                <h1 className="text-2xl font-bold gradient-text-ethra">
                  Bem-vindo, {profile?.nome || user?.email}!
                </h1>
              </div>
              <p className="text-muted-foreground">
                Aqui está o resumo do seu progresso nutricional hoje.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <ProgressOverview />
              </div>
              <div>
                <NutritionGoals />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NutritionChart />
              <RecentMeals />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
