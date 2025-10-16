
-- Adicionar colunas necessárias na tabela profiles se não existirem
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;

-- Criar função para administradores poderem ver todos os perfis
CREATE OR REPLACE FUNCTION public.get_all_profiles_admin()
RETURNS TABLE (
  id UUID,
  nome TEXT,
  email TEXT,
  telefone TEXT,
  tipo user_type,
  status_conta account_status,
  status_pagamento payment_status,
  is_active BOOLEAN,
  data_criacao TIMESTAMP WITH TIME ZONE,
  last_login TIMESTAMP WITH TIME ZONE,
  avatar_url TEXT
)
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT 
    p.id,
    p.nome,
    p.email,
    p.telefone,
    p.tipo,
    p.status_conta,
    p.status_pagamento,
    p.is_active,
    p.data_criacao,
    p.last_login,
    p.avatar_url
  FROM public.profiles p
  WHERE EXISTS (
    SELECT 1 FROM public.profiles admin_profile 
    WHERE admin_profile.id = auth.uid() 
    AND admin_profile.tipo = 'admin'
  )
  ORDER BY p.data_criacao DESC;
$$;

-- Criar função para administradores atualizarem perfis
CREATE OR REPLACE FUNCTION public.update_user_profile_admin(
  user_id UUID,
  new_nome TEXT DEFAULT NULL,
  new_email TEXT DEFAULT NULL,
  new_telefone TEXT DEFAULT NULL,
  new_tipo user_type DEFAULT NULL,
  new_status_conta account_status DEFAULT NULL,
  new_status_pagamento payment_status DEFAULT NULL,
  new_is_active BOOLEAN DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE PLPGSQL
SECURITY DEFINER
AS $$
BEGIN
  -- Verificar se o usuário atual é admin
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND tipo = 'admin'
  ) THEN
    RAISE EXCEPTION 'Acesso negado. Apenas administradores podem executar esta ação.';
  END IF;

  -- Atualizar o perfil
  UPDATE public.profiles 
  SET 
    nome = COALESCE(new_nome, nome),
    email = COALESCE(new_email, email),
    telefone = COALESCE(new_telefone, telefone),
    tipo = COALESCE(new_tipo, tipo),
    status_conta = COALESCE(new_status_conta, status_conta),
    status_pagamento = COALESCE(new_status_pagamento, status_pagamento),
    is_active = COALESCE(new_is_active, is_active),
    ultima_atualizacao = NOW()
  WHERE id = user_id;

  -- Atualizar email no auth.users se fornecido
  IF new_email IS NOT NULL THEN
    UPDATE auth.users 
    SET email = new_email 
    WHERE id = user_id;
  END IF;

  RETURN TRUE;
END;
$$;

-- Criar função para administradores excluírem usuários
CREATE OR REPLACE FUNCTION public.delete_user_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE PLPGSQL
SECURITY DEFINER
AS $$
BEGIN
  -- Verificar se o usuário atual é admin
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND tipo = 'admin'
  ) THEN
    RAISE EXCEPTION 'Acesso negado. Apenas administradores podem executar esta ação.';
  END IF;

  -- Não permitir que admin delete a si mesmo
  IF user_id = auth.uid() THEN
    RAISE EXCEPTION 'Você não pode excluir sua própria conta.';
  END IF;

  -- Excluir o usuário (isso irá cascatear para o perfil)
  DELETE FROM auth.users WHERE id = user_id;

  RETURN TRUE;
END;
$$;

-- Criar função para buscar usuários com filtros
CREATE OR REPLACE FUNCTION public.search_users_admin(
  search_term TEXT DEFAULT NULL,
  filter_tipo user_type DEFAULT NULL,
  filter_status account_status DEFAULT NULL,
  filter_active BOOLEAN DEFAULT NULL,
  limit_count INTEGER DEFAULT 50,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  nome TEXT,
  email TEXT,
  telefone TEXT,
  tipo user_type,
  status_conta account_status,
  status_pagamento payment_status,
  is_active BOOLEAN,
  data_criacao TIMESTAMP WITH TIME ZONE,
  last_login TIMESTAMP WITH TIME ZONE,
  avatar_url TEXT,
  total_count BIGINT
)
LANGUAGE SQL
SECURITY DEFINER
AS $$
  WITH filtered_profiles AS (
    SELECT 
      p.id,
      p.nome,
      p.email,
      p.telefone,
      p.tipo,
      p.status_conta,
      p.status_pagamento,
      p.is_active,
      p.data_criacao,
      p.last_login,
      p.avatar_url
    FROM public.profiles p
    WHERE EXISTS (
      SELECT 1 FROM public.profiles admin_profile 
      WHERE admin_profile.id = auth.uid() 
      AND admin_profile.tipo = 'admin'
    )
    AND (
      search_term IS NULL OR 
      p.nome ILIKE '%' || search_term || '%' OR 
      p.email ILIKE '%' || search_term || '%'
    )
    AND (filter_tipo IS NULL OR p.tipo = filter_tipo)
    AND (filter_status IS NULL OR p.status_conta = filter_status)
    AND (filter_active IS NULL OR p.is_active = filter_active)
  ),
  total AS (
    SELECT COUNT(*) as count FROM filtered_profiles
  )
  SELECT 
    fp.*,
    t.count as total_count
  FROM filtered_profiles fp
  CROSS JOIN total t
  ORDER BY fp.data_criacao DESC
  LIMIT limit_count
  OFFSET offset_count;
$$;
