import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";

import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import WhyNostrPage from "./pages/WhyNostrPage";
import GuidesPage from "./pages/GuidesPage";
import GuidePage from "./pages/GuidePage";
import ServicesPage from "./pages/ServicesPage";
import EventsPage from "./pages/EventsPage";
import MediaPage from "./pages/MediaPage";
import ContactPage from "./pages/ContactPage";
import BackgroundPage from "./pages/BackgroundPage";
import ArticlePage from "./pages/ArticlePage";
import BlogPage from "./pages/BlogPage";

import NotFound from "./pages/NotFound";

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
        <Route path="/guide/:guideId" element={<GuidePage />} />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;