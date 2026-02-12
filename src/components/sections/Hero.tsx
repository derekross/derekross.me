import { Button } from "@/components/ui/button";
import { ArrowDown, ExternalLink } from "lucide-react";
import { DEREK_CONTACTS } from "@/lib/derek";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();
  const goToAbout = () => {
    navigate('/about');
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background_1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Derek Ross
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Developer Relations at <a href="https://soapbox.pub" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">Soapbox</a>, building the future of decentralized social media with{" "}
            <a href="https://shakespeare.diy" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">Shakespeare</a> and{" "}
            <span className="text-purple-400 font-semibold">nostr</span>.
            Passionate about AI, vibe coding, and empowering communities through open protocols and decentralized technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              onClick={goToAbout}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
            >
              Learn More About Derek
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg font-semibold shadow-lg backdrop-blur-sm bg-black/20"
              onClick={() => window.open(`https://njump.me/${DEREK_CONTACTS.nostrAddress}`, '_blank')}
            >
              Follow on Nostr
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">20+</div>
              <div className="text-sm text-gray-300">Years in Tech</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">DevRel</div>
              <div className="text-sm text-gray-300">at Soapbox</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">∞</div>
              <div className="text-sm text-gray-300">Nostr Passion</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={goToAbout}
          aria-label="Scroll down"
          className="text-white/70 hover:text-white transition-colors"
        >
          <ArrowDown className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}