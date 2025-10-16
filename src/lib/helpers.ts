// Utilitários de formatação
export const formatters = {
  // Formatar telefone
  phone: (value: string): string => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  },

  // Formatar moeda
  currency: (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  },
};

// Validações
export const validators = {
  // Validar email
  email: (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  // Validar telefone (mínimo 10 dígitos)
  phone: (phone: string): boolean => {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regex.test(phone);
  },
};
