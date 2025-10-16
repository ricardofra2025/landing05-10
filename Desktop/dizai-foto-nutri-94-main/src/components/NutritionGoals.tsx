
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target } from 'lucide-react';
import { useNutritionGoals } from '@/hooks/useNutritionGoals';

const NutritionGoals = () => {
  const { goals, loading } = useNutritionGoals();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Metas Diárias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-2 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Metas Diárias
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal, index) => {
            const percentage = Math.min((goal.current / goal.target) * 100, 100);
            const isOverTarget = goal.current > goal.target;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{goal.name}</span>
                  <span className={`text-sm ${isOverTarget ? 'text-red-600' : 'text-muted-foreground'}`}>
                    {goal.current}{goal.unit} / {goal.target}{goal.unit}
                  </span>
                </div>
                <Progress 
                  value={percentage} 
                  className={`h-2 ${isOverTarget ? 'bg-red-100' : ''}`}
                />
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">
                    {percentage.toFixed(0)}% da meta
                  </span>
                  {isOverTarget && (
                    <span className="text-red-600 font-medium">
                      +{(goal.current - goal.target).toFixed(1)}{goal.unit}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionGoals;
