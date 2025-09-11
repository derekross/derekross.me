import { useSeoMeta } from '@unhead/react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Users, Smartphone, Briefcase, Heart, Presentation } from 'lucide-react';

const BackgroundPage = () => {
  useSeoMeta({
    title: 'Background - Derek Ross',
    description: 'Learn about Derek Ross\'s background in technology, community building, and his journey to becoming a leading advocate for the Nostr protocol.',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Derek's Background</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A journey through technology, community building, and the pursuit of decentralized communication
            </p>
          </header>

          {/* Hero Image */}
          <div className="mb-12">
            <img
              src="/derek-bitcoin-2025.jpg"
              alt="Derek Ross"
              className="w-full max-w-4xl mx-auto rounded-lg shadow-lg object-cover h-64 md:h-96"
            />
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Introduction */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Community Building Pioneer</h2>
                    <p className="text-muted-foreground">Leading the way in decentralized digital communities</p>
                  </div>
                </div>
                <p className="text-base leading-relaxed mb-4">
                  Derek Ross is a trailblazer in online community building, leading the way in the decentralized digital age.
                  Driven by a passion for creating meaningful virtual connections, Derek is a known figure in using nostr to
                  bring people together worldwide and grow nostr adoption.
                </p>
                <p className="text-base leading-relaxed">
                  Derek's expertise in online community dynamics and his commitment to fostering spaces where voices are heard
                  and relationships thrive make him a crucial player in today's digital world. In a time when connections are
                  more important than ever, Derek is a leading force in guiding us towards a more connected and decentralized future.
                </p>
              </CardContent>
            </Card>

            {/* Technology Experience */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Two Decades in Technology</h2>
                    <p className="text-muted-foreground">Extensive experience across IT systems and infrastructure</p>
                  </div>
                </div>
                <p className="text-base leading-relaxed mb-4">
                  With over 20 years in Information Technology, Derek has seen and shaped the evolution of online communities.
                  Outside of speaking engagements, Derek continues to work in Information Technology, where he excels in
                  systems administration, network engineering, and various other IT roles.
                </p>
                <p className="text-base leading-relaxed">
                  For the last decade, he has managed ERP student information systems, bringing his deep technical expertise
                  to educational technology infrastructure.
                </p>
              </CardContent>
            </Card>

            {/* Google+ and Android Community */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Android Community Leadership</h2>
                    <p className="text-muted-foreground">Building massive communities and transitioning to journalism</p>
                  </div>
                </div>
                <p className="text-base leading-relaxed mb-4">
                  Derek first made his mark with Google+ by building a thriving Android user community with over 4 million
                  members and 2 million followers on his personal profile. This experience taught him the power of authentic
                  community engagement and the importance of fostering genuine connections.
                </p>
                <p className="text-base leading-relaxed">
                  He then transitioned into online journalism, covering smartphone news and providing in-depth reviews for
                  Phandroid, one of the oldest Android news sites. This role allowed him to combine his technical expertise
                  with his passion for communication and community building.
                </p>
              </CardContent>
            </Card>

            {/* Speaking and Expertise */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <Presentation className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Speaking and Expertise</h2>
                    <p className="text-muted-foreground">Engaging diverse audiences worldwide</p>
                  </div>
                </div>
                <p className="text-base leading-relaxed mb-4">
                  As a sought-after speaker, Derek has shared his expertise with diverse audiences, from entrepreneurs,
                  to small and medium sized business owners, to established corporations, and to every day average
                  individuals looking to find their home on the Internet.
                </p>
                <p className="text-base leading-relaxed">
                  His talks delve into the art of creating vibrant online ecosystems, emphasizing the pivotal role of
                  authenticity and engagement in building lasting digital communities.
                </p>
              </CardContent>
            </Card>

            {/* Personal Life */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                    <Heart className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Family Man</h2>
                    <p className="text-muted-foreground">Balancing technology passion with family life</p>
                  </div>
                </div>
                <p className="text-base leading-relaxed">
                  Beyond social community building and technology, Derek is a family man, married with two children. ❤️
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-4">Connect with Derek</h3>
            <p className="text-muted-foreground mb-6">
              Learn more about Derek's work and join the conversation about decentralized communication
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => window.location.href = '/contact'}
              >
                Get in Touch
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/services'}
              >
                View Services
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BackgroundPage;