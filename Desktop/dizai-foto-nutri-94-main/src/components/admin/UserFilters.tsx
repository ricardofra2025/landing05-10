
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter,
  X,
  Users,
  Clock,
  CreditCard
} from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

interface UserFiltersProps {
  searchTerm: string;
  filterType: string;
  filterStatus: string;
  filterActive: string;
  filterPayment: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onActiveChange: (value: string) => void;
  onPaymentChange: (value: string) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  searchTerm,
  filterType,
  filterStatus,
  filterPayment,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onPaymentChange,
  onClearFilters,
  activeFiltersCount
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);

  useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-800">Filtros e Pesquisa</h3>
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" className="ml-2">
            {activeFiltersCount} filtro{activeFiltersCount > 1 ? 's' : ''} ativo{activeFiltersCount > 1 ? 's' : ''}
          </Badge>
        )}
      </div>

      {/* Barra de Pesquisa Principal */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Pesquisar por nome, email ou telefone..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="pl-10 pr-10 h-12 text-base border-2 border-gray-200 focus:border-ethra-green transition-colors"
          />
          {localSearchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocalSearchTerm('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          {localSearchTerm !== debouncedSearchTerm && (
            <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-ethra-green"></div>
            </div>
          )}
        </div>
      </div>

      {/* Filtros em Grid Responsivo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Filtro por Tipo */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Tipo de Usuário
          </label>
          <Select value={filterType} onValueChange={onTypeChange}>
            <SelectTrigger className="h-10 border-gray-200 focus:border-ethra-green transition-colors">
              <SelectValue placeholder="Todos os tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="cliente">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  Cliente
                </div>
              </SelectItem>
              <SelectItem value="profissional">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Profissional
                </div>
              </SelectItem>
              <SelectItem value="admin">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  Administrador
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filtro por Status da Conta */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Status da Conta
          </label>
          <Select value={filterStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="h-10 border-gray-200 focus:border-ethra-green transition-colors">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="ativo">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Ativo
                </div>
              </SelectItem>
              <SelectItem value="inativo">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  Inativo
                </div>
              </SelectItem>
              <SelectItem value="pausado">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  Pausado
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filtro por Status de Pagamento */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Status Pagamento
          </label>
          <Select value={filterPayment} onValueChange={onPaymentChange}>
            <SelectTrigger className="h-10 border-gray-200 focus:border-ethra-green transition-colors">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="primeira_vez">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  Primeira Vez
                </div>
              </SelectItem>
              <SelectItem value="teste">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  Teste
                </div>
              </SelectItem>
              <SelectItem value="normal">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Normal
                </div>
              </SelectItem>
              <SelectItem value="assinatura">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Assinatura
                </div>
              </SelectItem>
              <SelectItem value="pendente">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  Pendente
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Botão Limpar Filtros */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-transparent">.</label>
          <Button
            variant="outline"
            onClick={onClearFilters}
            disabled={activeFiltersCount === 0}
            className="h-10 w-full border-gray-200 hover:border-red-300 hover:text-red-600 transition-colors"
          >
            <X className="h-4 w-4 mr-2" />
            Limpar Filtros
          </Button>
        </div>
      </div>

      {/* Resumo dos Filtros Ativos */}
      {activeFiltersCount > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Filtros ativos:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {debouncedSearchTerm && (
                <Badge variant="secondary" className="text-xs">
                  Busca: "{debouncedSearchTerm}"
                </Badge>
              )}
              {filterType !== 'all' && (
                <Badge variant="secondary" className="text-xs">
                  Tipo: {filterType}
                </Badge>
              )}
              {filterStatus !== 'all' && (
                <Badge variant="secondary" className="text-xs">
                  Status: {filterStatus}
                </Badge>
              )}
              {filterPayment !== 'all' && (
                <Badge variant="secondary" className="text-xs">
                  Pagamento: {filterPayment}
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFilters;
