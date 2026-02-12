import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown } from "lucide-react";
import { LoginArea } from "@/components/auth/LoginArea";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DEREK_CONTACTS } from "@/lib/derek";
import { ZapButton } from "@/components/ZapButton";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const navLinkClass = "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2";

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
          <div className="hidden md:flex items-center space-x-1">
            {/* About - standalone */}
            <button
              onClick={() => navigate('/about')}
              className={navLinkClass}
            >
              About
            </button>

            {/* Blog - standalone */}
            <button
              onClick={() => navigate('/blog')}
              className={navLinkClass}
            >
              Blog
            </button>

            {/* Learn dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(navLinkClass, "flex items-center gap-1")}>
                Learn
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => navigate('/whynostr')} className="cursor-pointer">
                  <div>
                    <div className="font-medium">Why Nostr</div>
                    <p className="text-xs text-muted-foreground">The case for decentralization</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/guides')} className="cursor-pointer">
                  <div>
                    <div className="font-medium">Guides</div>
                    <p className="text-xs text-muted-foreground">Tutorials and how-tos</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Connect dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(navLinkClass, "flex items-center gap-1")}>
                Connect
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => navigate('/services')} className="cursor-pointer">
                  <div>
                    <div className="font-medium">Services</div>
                    <p className="text-xs text-muted-foreground">Consulting and speaking</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/events')} className="cursor-pointer">
                  <div>
                    <div className="font-medium">Events</div>
                    <p className="text-xs text-muted-foreground">Upcoming appearances</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/media')} className="cursor-pointer">
                  <div>
                    <div className="font-medium">Media</div>
                    <p className="text-xs text-muted-foreground">Podcasts and interviews</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/contact')} className="cursor-pointer">
                  <div>
                    <div className="font-medium">Contact</div>
                    <p className="text-xs text-muted-foreground">Get in touch</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                <Button variant="ghost" size="sm" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-2 mt-8">
                  {/* About */}
                  <button
                    onClick={() => handleNavigation('/about')}
                    className="text-left text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    About
                  </button>

                  {/* Blog */}
                  <button
                    onClick={() => handleNavigation('/blog')}
                    className="text-left text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    Blog
                  </button>

                  {/* Learn - Collapsible */}
                  <Collapsible open={learnOpen} onOpenChange={setLearnOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2">
                      Learn
                      <ChevronDown className={cn("h-4 w-4 transition-transform", learnOpen && "rotate-180")} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-2 mt-2">
                      <button
                        onClick={() => handleNavigation('/whynostr')}
                        className="block text-left text-base text-muted-foreground hover:text-foreground transition-colors py-1"
                      >
                        Why Nostr
                      </button>
                      <button
                        onClick={() => handleNavigation('/guides')}
                        className="block text-left text-base text-muted-foreground hover:text-foreground transition-colors py-1"
                      >
                        Guides
                      </button>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Connect - Collapsible */}
                  <Collapsible open={connectOpen} onOpenChange={setConnectOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2">
                      Connect
                      <ChevronDown className={cn("h-4 w-4 transition-transform", connectOpen && "rotate-180")} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-2 mt-2">
                      <button
                        onClick={() => handleNavigation('/services')}
                        className="block text-left text-base text-muted-foreground hover:text-foreground transition-colors py-1"
                      >
                        Services
                      </button>
                      <button
                        onClick={() => handleNavigation('/events')}
                        className="block text-left text-base text-muted-foreground hover:text-foreground transition-colors py-1"
                      >
                        Events
                      </button>
                      <button
                        onClick={() => handleNavigation('/media')}
                        className="block text-left text-base text-muted-foreground hover:text-foreground transition-colors py-1"
                      >
                        Media
                      </button>
                      <button
                        onClick={() => handleNavigation('/contact')}
                        className="block text-left text-base text-muted-foreground hover:text-foreground transition-colors py-1"
                      >
                        Contact
                      </button>
                    </CollapsibleContent>
                  </Collapsible>

                  <div className="pt-4 border-t">
                    <ZapButton
                      recipient={DEREK_CONTACTS.lightning}
                      className="w-full"
                      onZap={() => setIsOpen(false)}
                    >
                      Zap Derek
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
