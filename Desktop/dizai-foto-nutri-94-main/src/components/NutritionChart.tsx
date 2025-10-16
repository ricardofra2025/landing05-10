
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNutritionChart } from '@/hooks/useNutritionChart';

const chartConfig = {
  calories: {
    label: "Calorias",
    color: "#10b981",
  },
  protein: {
    label: "Proteínas",
    color: "#3b82f6",
  },
  carbs: {
    label: "Carboidratos",
    color: "#f59e0b",
  },
  fat: {
    label: "Gorduras",
    color: "#ef4444",
  },
};

const NutritionChart = () => {
  const { weeklyData, monthlyData, macroData, loading } = useNutritionChart();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Análise Nutricional
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ethra-green"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Análise Nutricional
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="weekly">Semanal</TabsTrigger>
            <TabsTrigger value="monthly">Mensal</TabsTrigger>
            <TabsTrigger value="macros">Macronutrientes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly">
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="calories" 
                    stroke="var(--color-calories)" 
                    strokeWidth={2}
                    dot={{ fill: "var(--color-calories)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="monthly">
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="calories" 
                    stroke="var(--color-calories)" 
                    strokeWidth={2}
                    dot={{ fill: "var(--color-calories)", r: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="protein" 
                    stroke="var(--color-protein)" 
                    strokeWidth={1.5}
                    dot={{ fill: "var(--color-protein)", r: 1 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="carbs" 
                    stroke="var(--color-carbs)" 
                    strokeWidth={1.5}
                    dot={{ fill: "var(--color-carbs)", r: 1 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="fat" 
                    stroke="var(--color-fat)" 
                    strokeWidth={1.5}
                    dot={{ fill: "var(--color-fat)", r: 1 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
          
          <TabsContent value="macros">
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={macroData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#10b981" />
                  <Bar dataKey="target" fill="#e5e7eb" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NutritionChart;
