
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  LogOut, 
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface HeaderUserMenuProps {
  user: SupabaseUser;
  profile?: {
    nome?: string;
    tipo?: 'cliente' | 'profissional' | 'admin';
  } | null;
  onSignOut: () => void;
}

const HeaderUserMenu: React.FC<HeaderUserMenuProps> = ({ user, profile, onSignOut }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white">
              {profile?.nome ? getInitials(profile.nome) : 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{profile?.nome || 'Usuário'}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user.email}
            </p>
            {profile?.tipo && (
              <span className={cn(
                "text-xs px-2 py-1 rounded-full w-fit",
                profile.tipo === 'admin' ? "bg-purple-100 text-purple-700" :
                profile.tipo === 'profissional' ? "bg-blue-100 text-blue-700" :
                "bg-green-100 text-green-700"
              )}>
                {profile.tipo === 'cliente' ? 'Cliente' :
                 profile.tipo === 'profissional' ? 'Profissional' : 'Admin'}
              </span>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderUserMenu;
