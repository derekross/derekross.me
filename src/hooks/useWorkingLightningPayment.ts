import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { useWebLN } from '@/hooks/useWebLN';
import { fetchLNURLPayInfo, requestLNURLPayInvoice } from '@/lib/lnurl';

interface LightningPaymentOptions {
  amount: number; // Amount in sats
  comment?: string;
  lightningAddress: string; // Lightning address like pay@derekross.me
}

export function useWorkingLightningPayment() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const webln = useWebLN();

  const sendPayment = async (options: LightningPaymentOptions) => {
    setIsLoading(true);

    try {
      // Step 1: Convert lightning address to LNURL endpoint
      const [username, domain] = options.lightningAddress.split('@');
      const lnurlUrl = `https://${domain}/.well-known/lnurlp/${username}`;

      // Step 2: Fetch LNURL-pay info
      const lnurlPayInfo = await fetchLNURLPayInfo(lnurlUrl);

      // Step 3: Convert sats to millisats and validate amount
      const amountMsats = options.amount * 1000;

      if (amountMsats < lnurlPayInfo.minSendable || amountMsats > lnurlPayInfo.maxSendable) {
        throw new Error(`Amount must be between ${lnurlPayInfo.minSendable / 1000} and ${lnurlPayInfo.maxSendable / 1000} sats`);
      }

      // Step 4: Request invoice from LNURL callback
      const invoiceResponse = await requestLNURLPayInvoice(
        lnurlPayInfo.callback,
        amountMsats,
        options.comment
      );

      // Step 5: Try WebLN payment first
      if (webln.isAvailable) {
        try {
          // Enable WebLN if not already enabled
          if (!webln.isEnabled) {
            await webln.enable();
          }

          // Send payment via WebLN
          const cleanInvoice = invoiceResponse.pr.trim();
          const paymentResult = await webln.sendPayment(cleanInvoice);

          toast({
            title: "Payment Sent! ⚡",
            description: `Successfully zapped ${options.amount} sats!`,
          });

          return paymentResult;

        } catch {
          // Fall back to external wallet
          window.open(`lightning:${invoiceResponse.pr}`, '_blank');

          toast({
            title: "Opening Lightning Wallet",
            description: `WebLN failed. Opening external wallet to pay ${options.amount} sats.`,
          });

          return;
        }
      } else {
        // No WebLN available, use external wallet
        window.open(`lightning:${invoiceResponse.pr}`, '_blank');

        toast({
          title: "Opening Lightning Wallet",
          description: `Opening external wallet to pay ${options.amount} sats.`,
        });
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive",
      });

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendPayment,
    isLoading,
    webln,
  };
}