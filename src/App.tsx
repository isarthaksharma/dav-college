
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Application from "./pages/Application";
import About from "./pages/About";
import Leadership from "./pages/Leadership";
import Campus from "./pages/Campus";
import Achievements from "./pages/Achievements";
import StudentDesk from "./pages/StudentDesk";
import Programs from "./pages/Programs";
import Faculties from "./pages/Faculties";
import Research from "./pages/Research";
import Calendar from "./pages/Calendar";
import AdmissionProcess from "./pages/AdmissionProcess";
import Scholarships from "./pages/Scholarships";
import Requirements from "./pages/Requirements";
import AdmissionsFAQ from "./pages/AdmissionsFAQ";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Results from "./pages/Results";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* About section */}
            <Route path="/about" element={<About />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/campus" element={<Campus />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/student-desk" element={<StudentDesk />} />
            
            {/* Academics section */}
            <Route path="/programs" element={<Programs />} />
            <Route path="/faculties" element={<Faculties />} />
            <Route path="/research" element={<Research />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/results" element={<Results />} />
            
            {/* Admissions section */}
            <Route path="/application" element={<Application />} />
            <Route path="/application-process" element={<AdmissionProcess />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/requirements" element={<Requirements />} />
            <Route path="/admissions-faq" element={<AdmissionsFAQ />} />
            
            {/* News & Events */}
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
          <Route path="/login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
