
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useProfileValidation = () => {
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const validateProfile = async (userId: string) => {
    try {
      setIsValidating(true);
      
      console.log('🔍 Validando perfil para usuário:', userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id, nome, tipo, telefone')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Erro na validação do perfil:', error);
        return { exists: false, profile: null, error };
      }

      const exists = !!data;
      console.log(exists ? '✅ Perfil válido encontrado' : '❌ Perfil não encontrado');
      
      return { exists, profile: data, error: null };
      
    } catch (error: any) {
      console.error('Erro inesperado na validação:', error);
      return { exists: false, profile: null, error };
    } finally {
      setIsValidating(false);
    }
  };

  const createFallbackProfile = async (userId: string, userData: any) => {
    try {
      console.log('🔄 Criando perfil via fallback para:', userId);
      
      const profileData = {
        id: userId,
        nome: userData.nome || 'Usuário',
        telefone: userData.telefone || null,
        tipo: userData.tipo || 'cliente'
      };

      const { data, error } = await supabase
        .from('profiles')
        .insert(profileData)
        .select()
        .single();

      if (error) {
        console.error('❌ Erro no fallback:', error);
        toast({
          title: "Erro na criação do perfil",
          description: "Não foi possível criar o perfil do usuário",
          variant: "destructive",
        });
        return { success: false, profile: null };
      }

      console.log('✅ Perfil criado via fallback:', data);
      toast({
        title: "Perfil criado!",
        description: "Dados do usuário foram salvos com sucesso",
      });
      
      return { success: true, profile: data };
      
    } catch (error: any) {
      console.error('Erro inesperado no fallback:', error);
      return { success: false, profile: null };
    }
  };

  return {
    validateProfile,
    createFallbackProfile,
    isValidating
  };
};
