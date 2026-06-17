import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";
import { useDerekArticles } from "@/hooks/useDerekArticles";
import { ArticleCard, ArticleSkeleton } from "@/components/ArticleCard";
import { GradientText } from "@/components/GradientText";
import { Reveal } from "@/components/Reveal";
import { AuroraBackground } from "@/components/AuroraBackground";
import { useNavigate } from 'react-router-dom';

export function LatestArticles() {
  const { data: articles, isLoading, error } = useDerekArticles();
  const navigate = useNavigate();

  if (error) {
    return null;
  }

  return (
    <section id="latest-articles" className="relative overflow-hidden py-24">
      <AuroraBackground subtle />
      <div className="container mx-auto px-4">
        <Reveal className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Long-form
          </p>
          <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Latest <GradientText>Articles</GradientText>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Deep dives on Nostr, decentralization, and the future of digital
            communication &mdash; written to make the open web make sense.
          </p>
        </Reveal>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <ArticleSkeleton key={index} />
            ))}
          </div>
        ) : articles && articles.length > 0 ? (
          <>
            <Reveal>
              <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                {articles.slice(0, 4).map((article) => (
                  <ArticleCard key={article.id} event={article} />
                ))}
              </div>
            </Reveal>
            <div className="text-center">
              <Button
                size="lg"
                variant="gradient"
                onClick={() => navigate('/blog')}
              >
                Read all articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </>
        ) : (
          <Reveal>
            <Card className="border-dashed border-border/50 bg-card/60 backdrop-blur-xl">
              <CardContent className="px-8 py-12 text-center">
                <BookOpen className="mx-auto mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 font-display text-lg font-bold">No Recent Articles</h3>
                <p className="text-muted-foreground">
                  Derek's latest articles will appear here. Check back soon.
                </p>
              </CardContent>
            </Card>
          </Reveal>
        )}
      </div>
    </section>
  );
}
