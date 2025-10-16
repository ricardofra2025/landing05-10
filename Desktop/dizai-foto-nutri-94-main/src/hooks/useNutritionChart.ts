
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useUserProfile';

interface WeeklyData {
  day: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MonthlyData {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meals: number;
}

interface MacroData {
  name: string;
  value: number;
  target: number;
  color: string;
}

export const useNutritionChart = () => {
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [macroData, setMacroData] = useState<MacroData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { profile } = useUserProfile();

  useEffect(() => {
    if (!user || !profile) return;

    const fetchChartData = async () => {
      try {
        setLoading(true);

        // Buscar dados dos últimos 7 dias
        const today = new Date();
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 6);

        // Buscar dados dos últimos 30 dias para o gráfico mensal
        const monthAgo = new Date(today);
        monthAgo.setDate(today.getDate() - 29);

        const { data: weekMeals } = await supabase
          .from('registros_alimentares')
          .select('data_hora, calorias, proteinas, carboidratos, gorduras')
          .eq('cliente_id', user.id)
          .gte('data_hora', weekAgo.toISOString())
          .lte('data_hora', today.toISOString())
          .order('data_hora', { ascending: true });

        const { data: monthMeals } = await supabase
          .from('registros_alimentares')
          .select('data_hora, calorias, proteinas, carboidratos, gorduras')
          .eq('cliente_id', user.id)
          .gte('data_hora', monthAgo.toISOString())
          .lte('data_hora', today.toISOString())
          .order('data_hora', { ascending: true });

        // Processar dados semanais
        const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        const weeklyChartData: WeeklyData[] = [];

        for (let i = 0; i < 7; i++) {
          const currentDate = new Date(weekAgo);
          currentDate.setDate(weekAgo.getDate() + i);
          const dateStr = currentDate.toISOString().split('T')[0];
          
          const dayMeals = weekMeals?.filter(meal => 
            meal.data_hora.startsWith(dateStr)
          ) || [];

          const dayTotals = dayMeals.reduce((acc, meal) => ({
            calories: acc.calories + (meal.calorias || 0),
            protein: acc.protein + (meal.proteinas || 0),
            carbs: acc.carbs + (meal.carboidratos || 0),
            fat: acc.fat + (meal.gorduras || 0)
          }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

          weeklyChartData.push({
            day: weekDays[currentDate.getDay()],
            ...dayTotals
          });
        }

        // Processar dados mensais (últimos 30 dias)
        const monthlyChartData: MonthlyData[] = [];

        for (let i = 0; i < 30; i++) {
          const currentDate = new Date(monthAgo);
          currentDate.setDate(monthAgo.getDate() + i);
          const dateStr = currentDate.toISOString().split('T')[0];
          
          const dayMeals = monthMeals?.filter(meal => 
            meal.data_hora.startsWith(dateStr)
          ) || [];

          const dayTotals = dayMeals.reduce((acc, meal) => ({
            calories: acc.calories + (meal.calorias || 0),
            protein: acc.protein + (meal.proteinas || 0),
            carbs: acc.carbs + (meal.carboidratos || 0),
            fat: acc.fat + (meal.gorduras || 0)
          }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

          monthlyChartData.push({
            date: `${currentDate.getDate()}/${currentDate.getMonth() + 1}`,
            calories: dayTotals.calories,
            protein: dayTotals.protein,
            carbs: dayTotals.carbs,
            fat: dayTotals.fat,
            meals: dayMeals.length
          });
        }

        // Buscar dados de hoje para macronutrientes
        const todayStr = today.toISOString().split('T')[0];
        const todayMeals = weekMeals?.filter(meal => 
          meal.data_hora.startsWith(todayStr)
        ) || [];

        const todayTotals = todayMeals.reduce((acc, meal) => ({
          protein: acc.protein + (meal.proteinas || 0),
          carbs: acc.carbs + (meal.carboidratos || 0),
          fat: acc.fat + (meal.gorduras || 0)
        }), { protein: 0, carbs: 0, fat: 0 });

        // Calcular metas de macronutrientes
        const calorieGoal = profile.meta_calorias || 2000;
        const proteinGoal = (calorieGoal * 0.25) / 4;
        const carbGoal = (calorieGoal * 0.45) / 4;
        const fatGoal = (calorieGoal * 0.30) / 9;

        const macroChartData: MacroData[] = [
          {
            name: 'Proteínas',
            value: todayTotals.protein,
            target: proteinGoal,
            color: '#10b981'
          },
          {
            name: 'Carboidratos',
            value: todayTotals.carbs,
            target: carbGoal,
            color: '#3b82f6'
          },
          {
            name: 'Gorduras',
            value: todayTotals.fat,
            target: fatGoal,
            color: '#f59e0b'
          }
        ];

        setWeeklyData(weeklyChartData);
        setMonthlyData(monthlyChartData);
        setMacroData(macroChartData);
      } catch (error) {
        console.error('Erro ao buscar dados do gráfico:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [user, profile]);

  return { weeklyData, monthlyData, macroData, loading };
};
