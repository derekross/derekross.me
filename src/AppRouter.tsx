import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";

import Index from "./pages/Index";
// import GuidesPage from "./pages/GuidesPage";
import GuidePage from "./pages/GuidePage";
import BackgroundPage from "./pages/BackgroundPage";
// import EventsPage from "./pages/EventsPage";
import MediaPage from "./pages/MediaPage";
import ArticlePage from "./pages/ArticlePage";

import NotFound from "./pages/NotFound";

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        {/* <Route path="/guides" element={<GuidesPage />} /> */}
        <Route path="/guide/:guideId" element={<GuidePage />} />
        <Route path="/background" element={<BackgroundPage />} />
        {/* <Route path="/events" element={<EventsPage />} /> */}
        <Route path="/media" element={<MediaPage />} />
        <Route path="/article/:nip19" element={<ArticlePage />} />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;