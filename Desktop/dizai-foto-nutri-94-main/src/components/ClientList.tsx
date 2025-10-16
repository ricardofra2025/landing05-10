
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, TrendingUp, Calendar, MoreHorizontal } from 'lucide-react';

interface ClientListProps {
  searchTerm: string;
}

const ClientList: React.FC<ClientListProps> = ({ searchTerm }) => {
  const clients = [
    {
      id: 1,
      name: 'Maria Silva',
      email: 'maria@email.com',
      lastActivity: '2 horas atrás',
      status: 'Ativo',
      progress: 85,
      goal: 'Perda de peso',
      startWeight: 75,
      currentWeight: 68.5,
      targetWeight: 65
    },
    {
      id: 2,
      name: 'João Santos',
      email: 'joao@email.com',
      lastActivity: '1 dia atrás',
      status: 'Ativo',
      progress: 60,
      goal: 'Ganho de massa',
      startWeight: 70,
      currentWeight: 73,
      targetWeight: 78
    },
    {
      id: 3,
      name: 'Ana Costa',
      email: 'ana@email.com',
      lastActivity: '3 dias atrás',
      status: 'Inativo',
      progress: 40,
      goal: 'Manutenção',
      startWeight: 62,
      currentWeight: 61,
      targetWeight: 62
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredClients.map((client) => (
        <Card key={client.id}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{client.name}</h3>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                  <p className="text-xs text-muted-foreground">Última atividade: {client.lastActivity}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <Badge variant={client.status === 'Ativo' ? 'default' : 'secondary'}>
                    {client.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">{client.goal}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium">{client.currentWeight}kg</p>
                  <p className="text-xs text-muted-foreground">
                    Meta: {client.targetWeight}kg
                  </p>
                  <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${client.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ClientList;
