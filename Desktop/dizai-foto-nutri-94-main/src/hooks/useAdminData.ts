
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from './useUserProfile';
import { useToast } from '@/hooks/use-toast';

interface AdminStats {
  totalUsers: number;
  totalClients: number;
  totalProfessionals: number;
  totalRegistros: number;
  activeUsers: number;
}

export const useAdminData = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useUserProfile();
  const { toast } = useToast();

  const fetchAdminStats = async () => {
    if (!isAdmin()) {
      setLoading(false);
      return;
    }

    try {
      // Buscar estatísticas gerais
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('tipo, status_conta');

      if (profilesError) throw profilesError;

      const totalUsers = profiles?.length || 0;
      const totalClients = profiles?.filter(p => p.tipo === 'cliente').length || 0;
      const totalProfessionals = profiles?.filter(p => p.tipo === 'profissional').length || 0;
      const activeUsers = profiles?.filter(p => p.status_conta === 'ativo').length || 0;

      // Buscar total de registros alimentares
      const { count: registrosCount } = await supabase
        .from('registros_alimentares')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalUsers,
        totalClients,
        totalProfessionals,
        totalRegistros: registrosCount || 0,
        activeUsers
      });

    } catch (error) {
      console.error('Erro ao buscar dados admin:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar as estatísticas administrativas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    if (!isAdmin()) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('data_criacao', { ascending: false });

      if (error) throw error;
      setAllUsers(data || []);
    } catch (error) {
      console.error('Erro ao buscar todos os usuários:', error);
    }
  };

  const updateUserStatus = async (userId: string, status: 'ativo' | 'inativo' | 'pausado') => {
    if (!isAdmin()) return false;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status_conta: status })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Status atualizado",
        description: "Status do usuário foi alterado com sucesso",
      });

      // Atualizar dados locais
      await fetchAllUsers();
      await fetchAdminStats();
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível alterar o status do usuário",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    if (isAdmin()) {
      fetchAdminStats();
      fetchAllUsers();
    }
  }, [isAdmin]);

  return {
    stats,
    allUsers,
    loading,
    updateUserStatus,
    refetchData: () => {
      fetchAdminStats();
      fetchAllUsers();
    }
  };
};
