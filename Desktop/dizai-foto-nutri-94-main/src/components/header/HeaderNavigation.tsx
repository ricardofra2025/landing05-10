
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home,
  Users,
  BarChart3
} from 'lucide-react';

interface HeaderNavigationProps {
  profile?: {
    tipo?: 'cliente' | 'profissional' | 'admin';
  } | null;
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ profile }) => {
  const getNavigationItems = () => {
    if (!profile) return [];
    
    switch (profile.tipo) {
      case 'cliente':
        return [
          { icon: Home, label: 'Dashboard', href: '/dashboard' },
          { icon: BarChart3, label: 'Progresso', href: '/dashboard' },
        ];
      case 'profissional':
        return [
          { icon: Home, label: 'Área Profissional', href: '/professional' },
          { icon: Users, label: 'Clientes', href: '/professional' },
          { icon: BarChart3, label: 'Relatórios', href: '/professional' },
        ];
      case 'admin':
        return [
          { icon: Home, label: 'Painel Admin', href: '/admin' },
          { icon: Users, label: 'Usuários', href: '/admin/users' },
          { icon: BarChart3, label: 'Relatórios', href: '/admin/reports' },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="hidden lg:flex items-center space-x-6">
      {navigationItems.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className="flex items-center space-x-2 text-gray-600 hover:text-ethra-green transition-colors"
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default HeaderNavigation;
