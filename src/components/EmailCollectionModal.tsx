import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { saveTempSubscription } from "@/lib/subscription-service";
import { formatters, validators } from "@/lib/helpers";
import type { Plano } from "@/lib/subscription-service";

interface EmailCollectionModalProps {
  plan: Plano;
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailCollectionModal({
  plan,
  isOpen,
  onClose,
}: EmailCollectionModalProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validação de email
    if (!email || !validators.email(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    // Validação de telefone
    if (!phone || !validators.phone(phone)) {
      setError("Por favor, insira um telefone válido com DDD.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await saveTempSubscription({
        email: email.trim().toLowerCase(),
        telefone: phone.replace(/\D/g, ""), // Envia só os números
        plano_id: plan.id,
        checkout_link: plan.checkout_signature_link,
      });

      if (result.success) {
        window.location.href = plan.checkout_signature_link;
      } else {
        setError("Erro ao processar a solicitação.");
      }
    } catch (error) {
      console.error("Erro ao criar assinatura temporária:", error);
      setError("Erro ao processar a solicitação. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Finalizar Assinatura</DialogTitle>
          <DialogDescription>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium text-gray-900">{plan.nome_plano}</p>
              <p className="text-green-600 font-semibold">
                {formatters.currency(plan.valor)}
                {plan.periodo}
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email para cobrança *
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Este email será usado para enviar as cobranças e recibos.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Telefone *
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(formatters.phone(e.target.value))}
                required
                disabled={isLoading}
                className="w-full"
                maxLength={15}
              />
              <p className="text-xs text-gray-500">
                Usado para contato sobre a assinatura.
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-sm text-blue-800">
            <p>
              <strong>🔄 Assinatura Recorrente:</strong>
            </p>
            <p>
              Você será redirecionado para o Mercado Pago para finalizar sua
              assinatura mensal.
            </p>
          </div>

          {/* w-full bg-[#8BA675] hover:bg-[#7CA565] text-white transition-all duration-200 focus:ring-2 focus:ring-[#8BA675]/50 focus:ring-offset-2 focus:ring-offset-white active:scale-95 */}

          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="w-full bg-[#8BA675] hover:bg-[#7CA565] text-white transition-all duration-200 focus:ring-2 focus:ring-[#8BA675]/50 focus:ring-offset-2 focus:ring-offset-white active:scale-95"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processando...
              </div>
            ) : (
              "Continuar para Pagamento"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
