import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useNostrPublish } from "@/hooks/useNostrPublish";
import { useToast } from "@/hooks/useToast";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { DEREK_PUBKEY_HEX } from "@/lib/derek";

interface NostrDMDialogProps {
  children: React.ReactNode;
}

export function NostrDMDialog({ children }: NostrDMDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useCurrentUser();
  const { mutate: createEvent } = useNostrPublish();
  const { toast } = useToast();

  const handleSendDM = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in with your Nostr account to send a direct message.",
        variant: "destructive",
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message to send.",
        variant: "destructive",
      });
      return;
    }

    if (!user.signer.nip44) {
      toast({
        title: "Encryption Not Supported",
        description: "Your Nostr client doesn't support NIP-44 encryption. Please upgrade to a compatible client.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Encrypt the message using NIP-44
      const encryptedContent = await user.signer.nip44.encrypt(DEREK_PUBKEY_HEX, message.trim());

      // Create a NIP-17 Direct Message event
      const dmEvent = {
        kind: 14, // Direct Message (NIP-17)
        content: encryptedContent,
        tags: [
          ['p', DEREK_PUBKEY_HEX], // Recipient (hex format)
        ],
      };

      // Publish the encrypted DM
      createEvent(dmEvent, {
        onSuccess: () => {
          toast({
            title: "Message Sent!",
            description: "Your direct message has been sent to Derek Ross.",
          });
          setMessage("");
          setIsOpen(false);
        },
        onError: (error) => {
          console.error('Failed to send DM:', error);
          toast({
            title: "Failed to Send",
            description: "There was an error sending your message. Please try again.",
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      console.error('Encryption error:', error);
      toast({
        title: "Encryption Failed",
        description: "Failed to encrypt the message. Please check your Nostr client.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Send Nostr DM to Derek
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {!user ? (
            <div className="text-center py-6">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Login Required</h3>
              <p className="text-muted-foreground mb-4">
                Please log in with your Nostr account to send a direct message.
              </p>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message to Derek..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>
              
              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                <p className="text-muted-foreground">
                  <strong>🔒 Encrypted:</strong> This message will be encrypted using NIP-44 and sent as a private direct message (NIP-17) that only Derek can read.
                </p>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSendDM} 
                  disabled={isLoading || !message.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send DM
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}