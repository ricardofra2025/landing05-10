
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import SignUpForm from '@/components/auth/SignUpForm';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // O redirecionamento será feito automaticamente pelo AuthContext
      console.log('Usuário já logado, aguardando redirecionamento...');
    }
  }, [user]);

  const handleSignUpSuccess = () => {
    setActiveTab('login');
  };

  return (
    <AuthLayout
      title={activeTab === 'login' ? 'Entrar no DizAi' : 'Criar Conta'}
      description={
        activeTab === 'login' 
          ? 'Acesse sua conta para continuar' 
          : 'Junte-se a nós e transforme sua alimentação'
      }
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Cadastro</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        
        <TabsContent value="register">
          <SignUpForm onSuccess={handleSignUpSuccess} />
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
};

export default Auth;
