
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  UserCheck, 
  UserX, 
  Trash2, 
  X,
  Download,
  Edit
} from 'lucide-react';

interface BulkActionsProps {
  selectedUsers: string[];
  onClearSelection: () => void;
  onBulkActivate: () => void;
  onBulkDeactivate: () => void;
  onBulkDelete: () => void;
  onBulkExport: () => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedUsers,
  onClearSelection,
  onBulkActivate,
  onBulkDeactivate,
  onBulkDelete,
  onBulkExport
}) => {
  if (selectedUsers.length === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {selectedUsers.length} usuário{selectedUsers.length > 1 ? 's' : ''} selecionado{selectedUsers.length > 1 ? 's' : ''}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkActivate}
            className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300 hover:text-green-700"
          >
            <UserCheck className="h-4 w-4" />
            Ativar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkDeactivate}
            className="flex items-center gap-2 hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-700"
          >
            <UserX className="h-4 w-4" />
            Desativar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkExport}
            className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
          >
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkDelete}
            className="flex items-center gap-2 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;
