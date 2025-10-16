
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Edit } from 'lucide-react';

interface User {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  tipo: 'cliente' | 'profissional' | 'admin';
  status_conta: 'ativo' | 'inativo' | 'pausado';
  status_pagamento: 'primeira_vez' | 'teste' | 'normal' | 'assinatura' | 'pendente';
  is_active: boolean;
}

interface UserEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
  onUserUpdated: () => void;
}

const UserEditModal: React.FC<UserEditModalProps> = ({ open, onOpenChange, user, onUserUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipo: 'cliente' as 'cliente' | 'profissional' | 'admin',
    status_conta: 'ativo' as 'ativo' | 'inativo' | 'pausado',
    status_pagamento: 'primeira_vez' as 'primeira_vez' | 'teste' | 'normal' | 'assinatura' | 'pendente',
    is_active: true
  });

  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome || '',
        email: user.email || '',
        telefone: user.telefone || '',
        tipo: user.tipo,
        status_conta: user.status_conta,
        status_pagamento: user.status_pagamento,
        is_active: user.is_active
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.rpc('update_user_profile_admin', {
        user_id: user.id,
        new_nome: formData.nome,
        new_email: formData.email,
        new_telefone: formData.telefone,
        new_tipo: formData.tipo,
        new_status_conta: formData.status_conta,
        new_status_pagamento: formData.status_pagamento,
        new_is_active: formData.is_active
      });

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Usuário atualizado com sucesso!'
      });

      onUserUpdated();
    } catch (error: any) {
      console.error('Erro ao atualizar usuário:', error);
      toast({
        title: 'Erro',
        description: error.message || 'Não foi possível atualizar o usuário.',
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
            <Edit className="h-5 w-5" />
            Editar Usuário
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

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
            />
            <Label htmlFor="is_active">Usuário Ativo</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 bg-ethra-green hover:bg-ethra-green/90">
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditModal;
