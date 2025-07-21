import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Zap, Loader2 } from 'lucide-react';
import { useWorkingLightningPayment } from '@/hooks/useWorkingLightningPayment';
import { cn } from '@/lib/utils';

interface ZapButtonProps {
  recipient: string; // Lightning address
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children?: React.ReactNode;
  defaultAmount?: number;
  showDialog?: boolean; // Whether to show amount/comment dialog
  onZap?: () => void; // Callback when zap is initiated
}

export function ZapButton({
  recipient,
  className,
  variant = 'outline',
  size = 'sm',
  children,
  defaultAmount = 1000,
  showDialog = true,
  onZap
}: ZapButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(defaultAmount.toString());
  const [comment, setComment] = useState('');
  const { sendPayment, isLoading } = useWorkingLightningPayment();

  const handleQuickZap = async (zapAmount: number) => {
    // Just set the amount, don't send payment yet
    setAmount(zapAmount.toString());
  };

  const handleQuickZapAndSend = async (zapAmount: number) => {
    onZap?.();
    await sendPayment({
      lightningAddress: recipient,
      amount: zapAmount,
      comment: comment || undefined,
    });
    setIsOpen(false);
  };

  const handleCustomZap = async () => {
    const zapAmount = parseInt(amount);
    if (isNaN(zapAmount) || zapAmount <= 0) {
      return;
    }

    onZap?.();
    await sendPayment({
      lightningAddress: recipient,
      amount: zapAmount,
      comment: comment || undefined,
    });
    setIsOpen(false);
  };

  const quickZapAmounts = [21, 100, 500, 1000, 5000];

  if (!showDialog) {
    // Simple zap without dialog
    return (
      <Button
        variant={variant}
        size={size}
        className={cn(
          'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none hover:from-yellow-500 hover:to-orange-600',
          className
        )}
        onClick={async () => {
          onZap?.();
          await sendPayment({
            lightningAddress: recipient,
            amount: defaultAmount,
            comment: undefined,
          });
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Zap className="h-4 w-4 mr-1" />
        )}
        {children || 'Zap ⚡'}
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(
            'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none hover:from-yellow-500 hover:to-orange-600',
            className
          )}
        >
          <Zap className="h-4 w-4 mr-1" />
          {children || 'Zap ⚡'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-500" />
            Send Lightning Payment
          </DialogTitle>
          <DialogDescription>
            Choose an amount and send a lightning payment to {recipient}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Quick Zap Buttons */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Quick Amounts</Label>
            <div className="grid grid-cols-5 gap-2">
              {quickZapAmounts.map((zapAmount) => (
                <Button
                  key={zapAmount}
                  variant={amount === zapAmount.toString() ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleQuickZap(zapAmount)}
                  disabled={isLoading}
                  className="text-xs"
                >
                  {zapAmount}
                </Button>
              ))}
            </div>
            <div className="mt-2 text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuickZapAndSend(parseInt(amount) || 1000)}
                disabled={isLoading || !amount || parseInt(amount) <= 0}
                className="text-xs text-muted-foreground"
              >
                Quick send {amount || '1000'} sats (skip comment)
              </Button>
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Custom Amount (sats)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount in sats"
              min="1"
            />
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Comment (optional)</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a message with your zap..."
              rows={3}
            />
          </div>

          {/* Send Button */}
          <Button
            onClick={handleCustomZap}
            disabled={isLoading || !amount || parseInt(amount) <= 0}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none hover:from-yellow-500 hover:to-orange-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Send {amount} sats
              </>
            )}
          </Button>

          {/* Recipient Info */}
          <div className="text-center text-sm text-muted-foreground">
            Sending to: <span className="font-mono">{recipient}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}