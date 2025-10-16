import { supabase } from "./supabase";

export interface Plano {
  id: string;
  nome_plano: string;
  valor: number;
  descricao: string;
  features: string;
  checkout_plano_id: string;
  popular: boolean;
  periodo: string;
  checkout_signature_link: string;
  action: string;
}

export interface SaveTempSubscription {
  email: string;
  telefone: string;
  plano_id: string;
  checkout_link: string;
}

export interface CreatePreapprovalResponse {
  success: boolean;
}

/**
 * Busca todos os planos ativos disponíveis
 */
export async function getActivePlans(planName?: string): Promise<Array<Plano>> {
  try {
    const { data, error } = await supabase.functions.invoke<Array<Plano>>(
      "get-active-plans"
    );

    if (error) {
      throw new Error(`Erro ao buscar planos: ${error.message}`);
    }

    // Se um nome de plano específico foi fornecido, filtrar
    if (planName && data) {
      return data.filter(
        (plan) => plan.nome_plano.toUpperCase() === planName.toUpperCase()
      );
    }

    return data || [];
  } catch (error) {
    console.log(error);
    console.error("Erro ao buscar planos ativos:", error);
    throw error;
  }
}

/**
 * Cria uma assinatura temporária no Supabase
 */
export async function saveTempSubscription(
  subscriptionData: SaveTempSubscription
): Promise<CreatePreapprovalResponse> {
  try {
    const { data, error } =
      await supabase.functions.invoke<CreatePreapprovalResponse>(
        "save-temp-subscription",
        {
          body: { ...subscriptionData },
        }
      );

    if (error) {
      throw new Error(`Erro ao criar assinatura temporaria: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Erro ao criar assinatura temporaria:", error);
    throw error;
  }
}
