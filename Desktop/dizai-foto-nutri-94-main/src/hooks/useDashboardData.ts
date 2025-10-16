
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import { TrendingUp, TrendingDown, Target, Zap } from 'lucide-react';

interface DashboardStat {
  title: string;
  value: string;
  target?: string;
  change?: string;
  icon: any;
  trend: 'up' | 'down';
  percentage: number;
  color: string;
}

export const useDashboardData = () => {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { profile } = useUserProfile();

  useEffect(() => {
    if (!user || !profile) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Buscar dados de hoje
        const today = new Date().toISOString().split('T')[0];
        
        // Buscar registros alimentares de hoje
        const { data: todayMeals } = await supabase
          .from('registros_alimentares')
          .select('calorias')
          .eq('cliente_id', user.id)
          .gte('data_hora', `${today}T00:00:00`)
          .lte('data_hora', `${today}T23:59:59`);

        // Buscar último peso registrado
        const { data: lastWeight } = await supabase
          .from('registros_peso')
          .select('peso, data_registro')
          .eq('cliente_id', user.id)
          .order('data_registro', { ascending: false })
          .limit(2);

        // Buscar peso anterior para calcular diferença
        const currentWeight = lastWeight?.[0]?.peso || 0;
        const previousWeight = lastWeight?.[1]?.peso || currentWeight;
        const weightDiff = currentWeight - previousWeight;

        // Calcular calorias totais de hoje
        const todayCalories = todayMeals?.reduce((sum, meal) => sum + (meal.calorias || 0), 0) || 0;
        const calorieGoal = profile.meta_calorias || 2000;
        const caloriePercentage = Math.min((todayCalories / calorieGoal) * 100, 100);

        // Calcular progresso para meta de peso
        const weightGoal = profile.meta_peso || currentWeight;
        const initialWeight = previousWeight;
        const weightProgress = initialWeight > 0 ? 
          Math.min(((initialWeight - currentWeight) / (initialWeight - weightGoal)) * 100, 100) : 0;

        // Calcular sequência de dias
        const streakDays = profile.sequencia_dias || 0;
        const weeklyProgress = profile.progresso_semanal || 0;

        const dashboardStats: DashboardStat[] = [
          {
            title: 'Calorias Hoje',
            value: todayCalories.toString(),
            target: calorieGoal.toString(),
            icon: Zap,
            trend: 'up',
            percentage: caloriePercentage,
            color: 'bg-green-500'
          },
          {
            title: 'Peso Atual',
            value: `${currentWeight.toFixed(1)}kg`,
            change: `${weightDiff >= 0 ? '+' : ''}${weightDiff.toFixed(1)}kg`,
            icon: weightDiff <= 0 ? TrendingDown : TrendingUp,
            trend: weightDiff <= 0 ? 'down' : 'up',
            percentage: Math.abs(weightProgress),
            color: 'bg-blue-500'
          },
          {
            title: 'Meta Semanal',
            value: `${weeklyProgress}/7`,
            target: 'dias',
            icon: Target,
            trend: 'up',
            percentage: (weeklyProgress / 7) * 100,
            color: 'bg-orange-500'
          },
          {
            title: 'Sequência',
            value: streakDays.toString(),
            target: 'dias',
            icon: TrendingUp,
            trend: 'up',
            percentage: Math.min((streakDays / 30) * 100, 100),
            color: 'bg-purple-500'
          }
        ];

        setStats(dashboardStats);
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, profile]);

  return { stats, loading };
};
