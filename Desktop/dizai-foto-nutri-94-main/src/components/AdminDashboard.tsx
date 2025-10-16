
import React from 'react';
import AdminStats from './admin/AdminStats';
import RecentActivities from './admin/RecentActivities';
import QuickActions from './admin/QuickActions';

const AdminDashboard = () => {
  const recentActivities = [
    { user: 'Maria Silva', action: 'Novo cadastro', time: '2 min atrás', type: 'signup' as const },
    { user: 'Dr. João Santos', action: 'Login profissional', time: '5 min atrás', type: 'login' as const },
    { user: 'Ana Costa', action: 'Atualização de perfil', time: '12 min atrás', type: 'update' as const },
    { user: 'Carlos Lima', action: 'Reset de senha', time: '18 min atrás', type: 'reset' as const },
  ];

  return (
    <div className="space-y-6">
      <AdminStats />
      
      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivities activities={recentActivities} />
        <QuickActions />
      </div>
    </div>
  );
};

export default AdminDashboard;
