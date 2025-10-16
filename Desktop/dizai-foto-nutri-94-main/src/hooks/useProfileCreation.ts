
import { supabase } from '@/integrations/supabase/client';

export const useProfileCreation = () => {
  const ensureProfileExists = async (userId: string, userData: any) => {
    try {
      console.log('🔍 Verificando se perfil existe para user:', userId);
      console.log('📋 Dados recebidos para criação:', userData);
      
      // Verificar se o perfil já existe
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('id, nome, email, telefone, tipo')
        .eq('id', userId)
        .maybeSingle();

      if (checkError) {
        console.error('❌ Erro ao verificar perfil existente:', checkError);
        return false;
      }

      if (existingProfile) {
        console.log('✅ Perfil já existe:', existingProfile);
        return true;
      }

      console.log('🔄 Perfil não encontrado, criando via fallback...');
      
      // Preparar dados do perfil com validação
      const profileData = {
        id: userId,
        nome: userData?.nome?.trim() || 'Usuário',
        email: userData?.email?.trim() || null,
        telefone: userData?.telefone?.trim() || null,
        tipo: userData?.tipo || 'cliente'
      };

      console.log('📝 Dados preparados para inserção:', profileData);

      // Validar campos obrigatórios
      if (!profileData.nome || profileData.nome === '') {
        console.error('❌ Nome é obrigatório mas está vazio');
        return false;
      }

      if (!profileData.telefone || profileData.telefone === '') {
        console.error('❌ Telefone é obrigatório mas está vazio');
        return false;
      }

      const { data: insertedProfile, error: insertError } = await supabase
        .from('profiles')
        .insert(profileData)
        .select()
        .single();

      if (insertError) {
        console.error('❌ Erro no fallback de criação de perfil:', insertError);
        return false;
      }

      console.log('✅ Perfil criado com sucesso via fallback:', insertedProfile);
      
      // Verificar se todos os dados foram salvos corretamente
      if (insertedProfile) {
        console.log('🔍 Verificação final dos dados salvos:');
        console.log('  - ID:', insertedProfile.id);
        console.log('  - Nome:', insertedProfile.nome);
        console.log('  - Email:', insertedProfile.email);
        console.log('  - Telefone:', insertedProfile.telefone);
        console.log('  - Tipo:', insertedProfile.tipo);
        
        // Validar se todos os campos obrigatórios foram salvos
        const missingFields = [];
        if (!insertedProfile.nome) missingFields.push('nome');
        if (!insertedProfile.telefone) missingFields.push('telefone');
        if (!insertedProfile.tipo) missingFields.push('tipo');
        
        if (missingFields.length > 0) {
          console.error('❌ Campos obrigatórios não foram salvos:', missingFields);
          return false;
        }
        
        console.log('✅ Todos os dados obrigatórios foram salvos corretamente');
      }
      
      return true;
      
    } catch (error: any) {
      console.error('❌ Erro inesperado no fallback:', error);
      return false;
    }
  };

  return { ensureProfileExists };
};
