
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { 
  Home,
  Users,
  BarChart3,
  Camera,
  TrendingUp,
  Target,
  Calendar,
  User,
  Settings,
  Bell,
  UserCheck,
  FileText,
  Shield
} from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { profile } = useUserProfile();

  const getNavigationItems = () => {
    if (!profile) return [];
    
    switch (profile.tipo) {
      case 'cliente':
        return [
          { icon: Home, label: 'Dashboard', href: '/dashboard' },
          { icon: Camera, label: 'Nova Foto', href: '/dashboard/photo' },
          { icon: TrendingUp, label: 'Progresso', href: '/dashboard/progress' },
          { icon: Target, label: 'Metas', href: '/dashboard/goals' },
          { icon: Calendar, label: 'Agenda', href: '/dashboard/schedule' },
          { icon: User, label: 'Perfil', href: '/dashboard/profile' },
          { icon: Bell, label: 'Notificações', href: '/dashboard/notifications' },
          { icon: Settings, label: 'Configurações', href: '/dashboard/settings' },
        ];
      case 'profissional':
        return [
          { icon: Home, label: 'Área Profissional', href: '/professional' },
          { icon: Users, label: 'Clientes', href: '/professional/clients' },
          { icon: FileText, label: 'Relatórios', href: '/professional/reports' },
          { icon: Calendar, label: 'Agenda', href: '/professional/schedule' },
          { icon: UserCheck, label: 'Perfil Profissional', href: '/professional/profile' },
          { icon: Settings, label: 'Configurações', href: '/professional/settings' },
        ];
      case 'admin':
        return [
          { icon: Home, label: 'Painel Admin', href: '/admin' },
          { icon: Users, label: 'Usuários', href: '/admin/users' },
          { icon: UserCheck, label: 'Profissionais', href: '/admin/professionals' },
          { icon: BarChart3, label: 'Relatórios', href: '/admin/reports' },
          { icon: Shield, label: 'Sistema', href: '/admin/system' },
          { icon: Settings, label: 'Configurações', href: '/admin/settings' },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center",
              profile?.tipo === 'admin' ? "bg-gradient-to-br from-purple-500 to-red-500" :
              profile?.tipo === 'profissional' ? "bg-gradient-to-br from-blue-500 to-green-500" :
              "bg-gradient-to-br from-green-500 to-blue-500"
            )}>
              <span className="text-white font-bold text-sm">DA</span>
            </div>
            DizAi
          </SheetTitle>
        </SheetHeader>
        
        <nav className="mt-6 space-y-2">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              onClick={onClose}
            >
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-11"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
