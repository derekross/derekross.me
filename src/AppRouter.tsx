import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { CanonicalLink } from "./components/CanonicalLink";

// Eagerly load the homepage since it's the most common entry point
import Index from "./pages/Index";

// Lazy-load all other pages for code splitting
const AboutPage = lazy(() => import("./pages/AboutPage"));
const WhyNostrPage = lazy(() => import("./pages/WhyNostrPage"));
const GuidesPage = lazy(() => import("./pages/GuidesPage"));
const GuidePage = lazy(() => import("./pages/GuidePage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const MediaPage = lazy(() => import("./pages/MediaPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BackgroundPage = lazy(() => import("./pages/BackgroundPage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Old /guide/:id URLs redirect to the canonical /guides/:id so there is one indexable URL per guide. */
function LegacyGuideRedirect() {
  const { guideId } = useParams<{ guideId: string }>();
  return <Navigate to={`/guides/${guideId ?? ''}`} replace />;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CanonicalLink />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/whynostr" element={<WhyNostrPage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/guides/:guideId" element={<GuidePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/background" element={<BackgroundPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/article/:nip19" element={<ArticlePage />} />

        {/* Legacy redirect for old guide URLs */}
        <Route path="/guide/:guideId" element={<LegacyGuideRedirect />} />

        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
