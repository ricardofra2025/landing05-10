
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  LayoutDashboard, 
  Camera, 
  TrendingUp, 
  Target, 
  Calendar,
  User,
  Settings,
  Bell,
  Users,
  UserCheck,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserProfile } from '@/hooks/useUserProfile';

const DashboardSidebar = () => {
  const location = useLocation();
  const { profile } = useUserProfile();
  
  // Menus baseados no tipo de usuário
  const getMenuItems = () => {
    if (profile?.tipo === 'profissional') {
      return [
        {
          title: 'Visão Geral',
          href: '/professional',
          icon: LayoutDashboard,
          active: location.pathname === '/professional'
        },
        {
          title: 'Meus Clientes',
          href: '/professional/clients',
          icon: Users,
          active: location.pathname === '/professional/clients'
        },
        {
          title: 'Relatórios',
          href: '/professional/reports',
          icon: FileText,
          active: location.pathname === '/professional/reports'
        },
        {
          title: 'Agenda',
          href: '/professional/schedule',
          icon: Calendar,
          active: location.pathname === '/professional/schedule'
        },
        {
          title: 'Perfil Profissional',
          href: '/professional/profile',
          icon: UserCheck,
          active: location.pathname === '/professional/profile'
        },
        {
          title: 'Configurações',
          href: '/professional/settings',
          icon: Settings,
          active: location.pathname === '/professional/settings'
        }
      ];
    }

    // Menu padrão para clientes
    return [
      {
        title: 'Visão Geral',
        href: '/dashboard',
        icon: LayoutDashboard,
        active: location.pathname === '/dashboard'
      },
      {
        title: 'Nova Foto',
        href: '/dashboard/photo',
        icon: Camera,
        active: location.pathname === '/dashboard/photo'
      },
      {
        title: 'Progresso',
        href: '/dashboard/progress',
        icon: TrendingUp,
        active: location.pathname === '/dashboard/progress'
      },
      {
        title: 'Metas',
        href: '/dashboard/goals',
        icon: Target,
        active: location.pathname === '/dashboard/goals'
      },
      {
        title: 'Agenda',
        href: '/dashboard/schedule',
        icon: Calendar,
        active: location.pathname === '/dashboard/schedule'
      },
      {
        title: 'Perfil',
        href: '/dashboard/profile',
        icon: User,
        active: location.pathname === '/dashboard/profile'
      },
      {
        title: 'Notificações',
        href: '/dashboard/notifications',
        icon: Bell,
        active: location.pathname === '/dashboard/notifications'
      },
      {
        title: 'Configurações',
        href: '/dashboard/settings',
        icon: Settings,
        active: location.pathname === '/dashboard/settings'
      }
    ];
  };

  const menuItems = getMenuItems();

  return (
    <Card className="w-64 h-fit p-4 space-y-2 shadow-lg border-0 bg-white/95 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6 px-2">
        <div className="w-2 h-8 bg-gradient-to-b from-dizai-brand-green to-blue-500 rounded-full"></div>
        <h3 className="font-semibold text-lg gradient-text">
          {profile?.tipo === 'profissional' ? 'Área Profissional' : 'Menu Principal'}
        </h3>
      </div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link key={item.href} to={item.href}>
            <Button
              variant={item.active ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-11 font-medium transition-all duration-200",
                item.active 
                  ? "bg-gradient-to-r from-dizai-brand-green to-blue-500 text-white shadow-md hover:shadow-lg" 
                  : "hover:bg-green-50 hover:text-dizai-brand-green"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Button>
          </Link>
        ))}
      </nav>
    </Card>
  );
};

export default DashboardSidebar;
