
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  UserCheck, 
  BarChart3,
  Settings
} from 'lucide-react';

const QuickActions: React.FC = () => {
  return (
    <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-600" />
          Ações Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <Button className="w-full justify-start gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90">
            <Users className="h-4 w-4" />
            Gerenciar Usuários
          </Button>
          <Button variant="outline" className="w-full justify-start gap-3">
            <UserCheck className="h-4 w-4" />
            Validar Profissionais
          </Button>
          <Button variant="outline" className="w-full justify-start gap-3">
            <BarChart3 className="h-4 w-4" />
            Gerar Relatórios
          </Button>
          <Button variant="outline" className="w-full justify-start gap-3">
            <Settings className="h-4 w-4" />
            Configurações do Sistema
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
