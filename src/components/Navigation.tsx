import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { LoginArea } from "@/components/auth/LoginArea";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DEREK_CONTACTS } from "@/lib/derek";
import { ZapButton } from "@/components/ZapButton";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { href: "#about", label: "About", route: "/" },
    { href: "#why-nostr", label: "Why Nostr", route: "/" },
    { href: "#guides", label: "Guides", route: "/" },
    { href: "#services", label: "Services", route: "/" },
    { href: "#events", label: "Events", route: "/" },
    { href: "#media", label: "Media", route: "/" },
    { href: "#contact", label: "Contact", route: "/" },
  ];

  const handleNavigation = (item: typeof navItems[0]) => {
    if (item.href.startsWith('#')) {
      // Section navigation
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(item.href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // Route navigation
      navigate(item.href);
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              Derek Ross
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavigation(item)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LoginArea className="max-w-40" />

            {/* Zap Button */}
            <ZapButton
              recipient={DEREK_CONTACTS.lightning}
              size="sm"
              className="hidden sm:flex items-center space-x-2"
            >
              Zap Derek
            </ZapButton>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item)}
                      className="text-left text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="pt-4 border-t">
                    <ZapButton
                      recipient={DEREK_CONTACTS.lightning}
                      className="w-full"
                      onZap={() => setIsOpen(false)}
                    >
                      Zap Derek ⚡️
                    </ZapButton>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}