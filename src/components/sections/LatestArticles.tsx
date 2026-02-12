import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";
import { useDerekArticles } from "@/hooks/useDerekArticles";
import { ArticleCard, ArticleSkeleton } from "@/components/ArticleCard";
import { useNavigate } from 'react-router-dom';

export function LatestArticles() {
  const { data: articles, isLoading, error } = useDerekArticles();
  const navigate = useNavigate();

  if (error) {
    return null;
  }

  return (
    <section id="latest-articles" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Latest Articles</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            In-depth articles and long-form content from Derek about Nostr protocol, decentralization, and the future of digital communication.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <ArticleSkeleton key={index} />
            ))}
          </div>
        ) : articles && articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {articles.slice(0, 4).map((article) => (
                <ArticleCard key={article.id} event={article} />
              ))}
            </div>
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/blog')}
              >
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-12 px-8 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Recent Articles</h3>
              <p className="text-muted-foreground">
                Derek's latest articles will appear here. Check back soon!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
