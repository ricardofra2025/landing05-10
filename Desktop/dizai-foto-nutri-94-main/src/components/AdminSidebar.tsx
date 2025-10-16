
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  Settings,
  Shield,
  UserCheck,
  BarChart3,
  Database
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      title: 'Visão Geral',
      href: '/admin',
      icon: LayoutDashboard,
      active: location.pathname === '/admin'
    },
    {
      title: 'Usuários',
      href: '/admin/users',
      icon: Users,
      active: location.pathname === '/admin/users'
    },
    {
      title: 'Profissionais',
      href: '/admin/professionals',
      icon: UserCheck,
      active: location.pathname === '/admin/professionals'
    },
    {
      title: 'Relatórios',
      href: '/admin/reports',
      icon: BarChart3,
      active: location.pathname === '/admin/reports'
    },
    {
      title: 'Sistema',
      href: '/admin/system',
      icon: Database,
      active: location.pathname === '/admin/system'
    },
    {
      title: 'Configurações',
      href: '/admin/settings',
      icon: Settings,
      active: location.pathname === '/admin/settings'
    }
  ];

  return (
    <Card className="w-64 h-fit p-4 space-y-2 shadow-lg border-0 bg-white/95 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-red-500 rounded-lg">
          <Shield className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-semibold text-lg bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
          Administração
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
                  ? "bg-gradient-to-r from-purple-600 to-red-500 text-white shadow-md hover:shadow-lg" 
                  : "hover:bg-purple-50 hover:text-purple-600"
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

export default AdminSidebar;
