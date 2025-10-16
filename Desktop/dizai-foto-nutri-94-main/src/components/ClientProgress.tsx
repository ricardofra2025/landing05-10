
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Users, Target } from 'lucide-react';

const progressData = [
  { week: 'Sem 1', maria: 75, joao: 70, ana: 62 },
  { week: 'Sem 2', maria: 74.2, joao: 70.5, ana: 61.8 },
  { week: 'Sem 3', maria: 73.1, joao: 71.2, ana: 61.5 },
  { week: 'Sem 4', maria: 72.5, joao: 72.1, ana: 61.2 },
  { week: 'Sem 5', maria: 71.8, joao: 72.8, ana: 61.0 },
  { week: 'Sem 6', maria: 70.9, joao: 73.2, ana: 61.0 },
  { week: 'Sem 7', maria: 70.1, joao: 73.8, ana: 61.1 },
  { week: 'Sem 8', maria: 69.2, joao: 74.1, ana: 61.0 },
];

const chartConfig = {
  maria: {
    label: "Maria Silva",
    color: "#10b981",
  },
  joao: {
    label: "João Santos",
    color: "#3b82f6",
  },
  ana: {
    label: "Ana Costa",
    color: "#f59e0b",
  },
};

const ClientProgress = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+2 este mês</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meta Atingida</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-muted-foreground">+5% vs mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2.1kg</div>
            <p className="text-xs text-muted-foreground">Perda média semanal</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Evolução dos Clientes</CardTitle>
            <Select defaultValue="weight">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weight">Peso</SelectItem>
                <SelectItem value="calories">Calorias</SelectItem>
                <SelectItem value="adherence">Aderência</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="maria" 
                  stroke="var(--color-maria)" 
                  strokeWidth={2}
                  dot={{ fill: "var(--color-maria)" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="joao" 
                  stroke="var(--color-joao)" 
                  strokeWidth={2}
                  dot={{ fill: "var(--color-joao)" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="ana" 
                  stroke="var(--color-ana)" 
                  strokeWidth={2}
                  dot={{ fill: "var(--color-ana)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientProgress;
