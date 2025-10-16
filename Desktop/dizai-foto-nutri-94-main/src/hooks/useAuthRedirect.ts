
import { supabase } from '@/integrations/supabase/client';

export const useAuthRedirect = () => {
  const redirectUserByType = async (userId: string) => {
    if (!userId) {
      console.warn('⚠️ UserId não fornecido para redirecionamento');
      return;
    }

    try {
      console.log('🔍 Buscando perfil do usuário:', userId);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('tipo')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('❌ Erro ao buscar perfil:', error);
        // Redirecionar para dashboard como fallback
        window.location.href = '/dashboard';
        return;
      }

      if (profile) {
        console.log('✅ Perfil encontrado, tipo:', profile.tipo);
        
        const currentPath = window.location.pathname;
        let targetPath = '/dashboard';

        switch (profile.tipo) {
          case 'admin':
            targetPath = '/admin';
            break;
          case 'profissional':
            targetPath = '/professional';
            break;
          case 'cliente':
          default:
            targetPath = '/dashboard';
            break;
        }

        // Só navegar se não estivermos já na página correta
        if (currentPath !== targetPath) {
          console.log(`🚀 Navegando de ${currentPath} para ${targetPath}`);
          window.location.href = targetPath;
        } else {
          console.log(`✅ Já estamos na página correta: ${currentPath}`);
        }
      } else {
        console.log('⚠️ Perfil não encontrado, redirecionando para dashboard');
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('❌ Erro inesperado ao buscar perfil:', error);
      window.location.href = '/dashboard';
    }
  };

  return { redirectUserByType };
};
