
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Meal {
  time: string;
  name: string;
  description: string;
  calories: number;
  status: 'completed' | 'pending';
}

export const useRecentMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchTodayMeals = async () => {
      try {
        setLoading(true);

        const today = new Date().toISOString().split('T')[0];
        
        const { data: todayMeals } = await supabase
          .from('registros_alimentares')
          .select('data_hora, descricao, calorias, tipo_refeicao')
          .eq('cliente_id', user.id)
          .gte('data_hora', `${today}T00:00:00`)
          .lte('data_hora', `${today}T23:59:59`)
          .order('data_hora', { ascending: true });

        // Definir horários padrão das refeições
        const mealTimes = [
          { time: '08:00', name: 'Café da Manhã', defaultCalories: 300 },
          { time: '12:30', name: 'Almoço', defaultCalories: 500 },
          { time: '15:30', name: 'Lanche', defaultCalories: 150 },
          { time: '19:00', name: 'Jantar', defaultCalories: 450 }
        ];

        const mealsData: Meal[] = mealTimes.map(mealTime => {
          // Procurar refeição registrada para este horário/tipo
          const registeredMeal = todayMeals?.find(meal => {
            const mealHour = new Date(meal.data_hora).getHours();
            const timeHour = parseInt(mealTime.time.split(':')[0]);
            
            // Considerar uma margem de 2 horas para cada refeição
            return Math.abs(mealHour - timeHour) <= 2;
          });

          if (registeredMeal) {
            return {
              time: mealTime.time,
              name: mealTime.name,
              description: registeredMeal.descricao || 'Refeição registrada',
              calories: registeredMeal.calorias || 0,
              status: 'completed' as const
            };
          } else {
            return {
              time: mealTime.time,
              name: mealTime.name,
              description: 'Não registrado',
              calories: 0,
              status: 'pending' as const
            };
          }
        });

        setMeals(mealsData);
      } catch (error) {
        console.error('Erro ao buscar refeições:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayMeals();
  }, [user]);

  return { meals, loading };
};
