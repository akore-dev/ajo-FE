// src/screens/AddMoneyScreen.tsx
import { useState } from "react";
import { ArrowLeft, Lock, Landmark, CreditCard } from "lucide-react";
import Shell from "../components/Shell";
import Button from "../components/Button";
import Chip from "../components/Chip";
import AmountInput from "../components/AmountInput";
import PaymentMethodRow from "../components/PaymentMethodRow";
import type { PaymentMethodId } from "../types";

interface AddMoneyScreenProps {
  onBack?: () => void;
  onContinue?: (amount: number, method: PaymentMethodId) => void;
}

const quickAmounts = [10000, 50000, 100000, 250000];

const methods: { id: PaymentMethodId; label: string; description: string; icon: React.ReactNode }[] = [
  { id: "paystack", label: "Paystack", description: "Card, bank, USSD", icon: <CreditCard size={18} /> },
  { id: "flutterwave", label: "Flutterwave", description: "Card, bank, mobile money", icon: <CreditCard size={18} /> },
  { id: "bank_transfer", label: "Bank transfer", description: "Direct bank transfer", icon: <Landmark size={18} /> },
];

export default function AddMoneyScreen({ onBack, onContinue }: AddMoneyScreenProps) {
  const [amount, setAmount] = useState(100000);
  const [method, setMethod] = useState<PaymentMethodId>("paystack");

  return (
    <Shell>
      <div className="flex flex-1 flex-col overflow-y-auto px-6 pt-8 pb-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ajo-border bg-white"
          >
            <ArrowLeft size={18} className="text-ajo-text" />
          </button>
          <h1 className="font-display text-[18px] font-semibold text-ajo-text">Add Money</h1>
        </div>

        <div className="mt-8">
          <AmountInput label="How much would you like to add?" value={amount} onChange={setAmount} />
        </div>

        <div className="mt-6">
          <h2 className="text-[13px] font-medium text-ajo-text-muted">Quick amounts</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {quickAmounts.map((qa) => (
              <Chip key={qa} selected={amount === qa} onClick={() => setAmount(qa)}>
                ₦{qa >= 1000 ? `${qa / 1000}k` : qa}
              </Chip>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-[13px] font-medium text-ajo-text-muted">Choose payment method</h2>
          <div className="mt-3 flex flex-col gap-3">
            {methods.map((m) => (
              <PaymentMethodRow
                key={m.id}
                icon={m.icon}
                label={m.label}
                description={m.description}
                selected={method === m.id}
                onClick={() => setMethod(m.id)}
              />
            ))}
          </div>
        </div>

        <Button variant="primary" className="mt-8" onClick={() => onContinue?.(amount, method)}>
          Continue
        </Button>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[12px] text-ajo-text-faint">
          <Lock size={13} />
          <span>Your payment is secured and encrypted</span>
        </div>
      </div>
    </Shell>
  );
}
