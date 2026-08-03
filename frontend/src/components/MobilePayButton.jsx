import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import api from '../services/api';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const stripePromise = loadStripe('pk_test_placeholder');

export default function MobilePayButton({ plan, amount, onSuccess }) {
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [stripeInstance, setStripeInstance] = useState(null);

  useEffect(() => {
    stripePromise.then(stripe => {
      setStripeInstance(stripe);
      if (!stripe) return;
      
      const pr = stripe.paymentRequest({
        country: 'FR',
        currency: 'eur',
        total: { label: `Abonnement ${plan}`, amount: amount * 100 },
        requestPayerName: true, requestPayerEmail: true, requestShipping: false
      });

      pr.canMakePayment().then(result => {
        if (result) setPaymentRequest(pr);
      });
    });
  }, [plan, amount]);

  if (!paymentRequest || !stripeInstance) {
    return (
      <button disabled className="w-full py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl flex items-center justify-center gap-2 text-[var(--color-muted)]">
        <Loader2 className="w-4 h-4 animate-spin" /> Apple / Google Pay non disponible
      </button>
    );
  }

  return (
    <Elements stripe={stripeInstance}>
      <div className="space-y-3">
        <PaymentRequestButtonElement
          options={{ paymentRequest, style: { paymentRequestButton: { theme: 'dark', height: '48px' } } }}
          onPaymentMethodReceived={async (event) => {
            try {
              toast.success('✅ Paiement réussi !');
              event.complete('success');
              onSuccess?.();
            } catch (err) {
              event.complete('fail');
              toast.error('Erreur paiement');
            }
          }}
        />
        <p className="text-xs text-center text-[var(--color-muted)]">
          Apple Pay, Google Pay, Samsung Pay
        </p>
      </div>
    </Elements>
  );
}
