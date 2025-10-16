
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface User {
  id: string;
  nome: string;
  email: string;
  tipo: 'cliente' | 'profissional' | 'admin';
}

interface UserDeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
  onUserDeleted: () => void;
}

const UserDeleteModal: React.FC<UserDeleteModalProps> = ({ open, onOpenChange, user, onUserDeleted }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    setLoading(true);

    try {
      const { error } = await supabase.rpc('delete_user_admin', {
        user_id: user.id
      });

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Usuário excluído com sucesso!'
      });

      onUserDeleted();
    } catch (error: any) {
      console.error('Erro ao excluir usuário:', error);
      toast({
        title: 'Erro',
        description: error.message || 'Não foi possível excluir o usuário.',
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
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Confirmar Exclusão
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Atenção:</strong> Esta ação não pode ser desfeita. Todos os dados relacionados a este usuário serão permanentemente removidos do sistema.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm">
              Você está prestes a excluir o seguinte usuário:
            </p>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">{user.nome}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">Tipo: {user.tipo}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              className="flex-1"
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleDelete} 
              disabled={loading} 
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              {loading ? 'Excluindo...' : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir Usuário
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDeleteModal;
