
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useUserProfile';

interface NutritionGoal {
  name: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

export const useNutritionGoals = () => {
  const [goals, setGoals] = useState<NutritionGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { profile } = useUserProfile();

  useEffect(() => {
    if (!user || !profile) return;

    const fetchNutritionData = async () => {
      try {
        setLoading(true);

        const today = new Date().toISOString().split('T')[0];
        
        // Buscar registros alimentares de hoje
        const { data: todayMeals } = await supabase
          .from('registros_alimentares')
          .select('calorias, proteinas, carboidratos, gorduras')
          .eq('cliente_id', user.id)
          .gte('data_hora', `${today}T00:00:00`)
          .lte('data_hora', `${today}T23:59:59`);

        // Buscar registros de água de hoje
        const { data: todayWater } = await supabase
          .from('registros_agua')
          .select('quantidade_ml')
          .eq('cliente_id', user.id)
          .gte('data_hora', `${today}T00:00:00`)
          .lte('data_hora', `${today}T23:59:59`);

        // Calcular totais do dia
        const totalCalories = todayMeals?.reduce((sum, meal) => sum + (meal.calorias || 0), 0) || 0;
        const totalProtein = todayMeals?.reduce((sum, meal) => sum + (meal.proteinas || 0), 0) || 0;
        const totalCarbs = todayMeals?.reduce((sum, meal) => sum + (meal.carboidratos || 0), 0) || 0;
        const totalFat = todayMeals?.reduce((sum, meal) => sum + (meal.gorduras || 0), 0) || 0;
        const totalWater = todayWater?.reduce((sum, water) => sum + (water.quantidade_ml || 0), 0) || 0;

        // Definir metas baseadas no perfil ou valores padrão
        const calorieGoal = profile.meta_calorias || 2000;
        const waterGoal = profile.meta_agua_ml || 2500;
        
        // Calcular metas de macronutrientes baseadas nas calorias
        const proteinGoal = (calorieGoal * 0.25) / 4; // 25% das calorias, 4 cal/g
        const carbGoal = (calorieGoal * 0.45) / 4; // 45% das calorias, 4 cal/g
        const fatGoal = (calorieGoal * 0.30) / 9; // 30% das calorias, 9 cal/g

        const nutritionGoals: NutritionGoal[] = [
          {
            name: 'Calorias',
            current: totalCalories,
            target: calorieGoal,
            unit: 'kcal',
            color: 'bg-blue-500'
          },
          {
            name: 'Proteínas',
            current: totalProtein,
            target: proteinGoal,
            unit: 'g',
            color: 'bg-green-500'
          },
          {
            name: 'Carboidratos',
            current: totalCarbs,
            target: carbGoal,
            unit: 'g',
            color: 'bg-yellow-500'
          },
          {
            name: 'Gorduras',
            current: totalFat,
            target: fatGoal,
            unit: 'g',
            color: 'bg-red-500'
          },
          {
            name: 'Água',
            current: totalWater / 1000, // Converter para litros
            target: waterGoal / 1000,
            unit: 'L',
            color: 'bg-cyan-500'
          }
        ];

        setGoals(nutritionGoals);
      } catch (error) {
        console.error('Erro ao buscar dados nutricionais:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNutritionData();
  }, [user, profile]);

  return { goals, loading };
};
