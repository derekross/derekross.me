import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Zap, Heart } from "lucide-react";
import { DEREK_CONTACTS } from "@/lib/derek";
import { useDerekApplications } from "@/hooks/useDerekApplications";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: applications } = useDerekApplications();

  // Get the most recent applications (limit to 4 for footer)
  const recentApplications = applications?.slice(0, 4) || [];

  // Static fallback projects if no applications are loaded
  const staticProjects = [
    { name: "Nostr Plebs", href: "https://nostrplebs.com", external: true },
    { name: "Nostr Nests", href: "https://nostrnests.com", external: true },
    { name: "Nostr Elites", href: "https://nostrelites.org", external: true },
    { name: "Grow Nostr", href: "https://grownostr.org", external: true }
  ];

  // Use applications if available, otherwise fall back to static projects
  const projectLinks = recentApplications.length > 0 
    ? recentApplications.map(app => ({
        name: app.displayName || app.name,
        href: app.web || '#',
        external: true
      }))
    : staticProjects;

  const footerLinks = [
    {
      title: "About",
      links: [
        { name: "Background", href: "/background" },
        { name: "Speaking Events", href: "#events" },
        { name: "Media Appearances", href: "#media" },
        { name: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Nostr",
      links: [
        { name: "Why Nostr", href: "#why-nostr" },
        { name: "Nostr Guides", href: "#guides" },
        { name: "Services", href: "#services" },
        { name: "NostrApps.com", href: "https://nostrapps.com", external: true }
      ]
    },
    {
      title: "Projects",
      links: projectLinks
    }
  ];

  const handleLinkClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank');
    } else if (href.startsWith('/')) {
      // Route navigation
      window.location.href = href;
    } else {
      // Section navigation
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Derek Ross</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Technical evangelist for nostr, passionate about decentralization, 
              censorship resistance, and empowering users through open protocols.
            </p>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open(`https://njump.me/${DEREK_CONTACTS.nostrAddress}`, '_blank')}
              >
                Follow on Nostr
                <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => handleLinkClick(link.href, link.external)}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center"
                    >
                      {link.name}
                      {link.external && <ExternalLink className="ml-1 h-3 w-3" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>&copy; {currentYear} Derek Ross. All rights reserved.</span>
            <span>•</span>
            <button
              onClick={() => window.open(`https://njump.me/${DEREK_CONTACTS.nostrAddress}`, '_blank')}
              className="hover:text-foreground transition-colors flex items-center"
            >
              Follow Derek on Nostr
              <ExternalLink className="ml-1 h-3 w-3" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Zap Button */}
            <Button
              variant="outline"
              size="sm"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none hover:from-yellow-500 hover:to-orange-600"
              onClick={() => {
                const zapButton = document.createElement('button');
                zapButton.setAttribute('data-npub', DEREK_CONTACTS.npub);
                zapButton.setAttribute('data-relays', DEREK_CONTACTS.relays.join(','));
                zapButton.click();
              }}
            >
              <Zap className="h-4 w-4 mr-1" />
              Zap Derek ⚡️
            </Button>

            {/* MKStack Credit */}
            <div className="text-xs text-muted-foreground flex items-center">
              <span>Vibed with</span>
              <Heart className="h-3 w-3 mx-1 text-red-500" />
              <button
                onClick={() => window.open('https://soapbox.pub/mkstack', '_blank')}
                className="hover:text-foreground transition-colors underline"
              >
                MKStack
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}