
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus } from 'lucide-react';

interface UserCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserCreated: () => void;
}

const UserCreateModal: React.FC<UserCreateModalProps> = ({ open, onOpenChange, onUserCreated }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    telefone: '',
    tipo: 'cliente' as 'cliente' | 'profissional' | 'admin',
    status_conta: 'ativo' as 'ativo' | 'inativo' | 'pausado',
    status_pagamento: 'primeira_vez' as 'primeira_vez' | 'teste' | 'normal' | 'assinatura' | 'pendente'
  });

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Criar usuário no auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            nome: formData.nome,
            tipo: formData.tipo
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Criar perfil no banco
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            nome: formData.nome,
            email: formData.email,
            telefone: formData.telefone,
            tipo: formData.tipo,
            status_conta: formData.status_conta,
            status_pagamento: formData.status_pagamento,
            is_active: true
          });

        if (profileError) throw profileError;

        toast({
          title: 'Sucesso',
          description: 'Usuário criado com sucesso!'
        });

        setFormData({
          nome: '',
          email: '',
          password: '',
          telefone: '',
          tipo: 'cliente',
          status_conta: 'ativo',
          status_pagamento: 'primeira_vez'
        });

        onUserCreated();
        onOpenChange(false);
      }
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      toast({
        title: 'Erro',
        description: error.message || 'Não foi possível criar o usuário.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Criar Novo Usuário
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
              minLength={6}
            />
          </div>

          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="tipo">Tipo de Usuário</Label>
            <Select value={formData.tipo} onValueChange={(value: any) => setFormData(prev => ({ ...prev, tipo: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cliente">Cliente</SelectItem>
                <SelectItem value="profissional">Profissional</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status_conta">Status da Conta</Label>
            <Select value={formData.status_conta} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status_conta: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
                <SelectItem value="pausado">Pausado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status_pagamento">Status de Pagamento</Label>
            <Select value={formData.status_pagamento} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status_pagamento: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primeira_vez">Primeira Vez</SelectItem>
                <SelectItem value="teste">Teste</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="assinatura">Assinatura</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 bg-ethra-green hover:bg-ethra-green/90">
              {loading ? 'Criando...' : 'Criar Usuário'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserCreateModal;
