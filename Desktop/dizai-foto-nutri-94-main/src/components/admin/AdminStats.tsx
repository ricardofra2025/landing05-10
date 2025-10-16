
import React from 'react';
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  AlertTriangle
} from 'lucide-react';
import StatCard from './StatCard';
import { useAdminData } from '@/hooks/useAdminData';

const AdminStats: React.FC = () => {
  const { stats, loading } = useAdminData();

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="h-24 bg-gray-200 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Erro ao carregar estatísticas
      </div>
    );
  }

  const statsData = [
    {
      title: 'Total de Usuários',
      value: stats.totalUsers.toString(),
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Usuários Ativos',
      value: stats.activeUsers.toString(),
      change: `${((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}%`,
      icon: UserCheck,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Profissionais',
      value: stats.totalProfessionals.toString(),
      change: `${((stats.totalProfessionals / stats.totalUsers) * 100).toFixed(1)}%`,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Registros Alimentares',
      value: stats.totalRegistros.toString(),
      change: '+15%',
      icon: AlertTriangle,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default AdminStats;
