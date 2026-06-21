import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { ScrubBackgroundVideo } from "./components/ScrubBackgroundVideo";
import { AnimatePresence } from "motion/react";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore - TS complains about key on Routes, but AnimatePresence needs it */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* 
        Fully integrated, continuous layout platform:
        The video container is absolute at top-level. When transitioning pages, 
        only the text elements are faded out/in. The video is NEVER unmounted, 
        giving a breathtakingly subtle seamless transition experience.
      */}
      <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased min-h-screen">
        
        {/* Persistent background video aligned seamlessly to the right 58.3% column context */}
        <div className="fixed inset-0 lg:left-auto lg:w-[58.333333%] w-full h-full z-0 pointer-events-none">
          <ScrubBackgroundVideo />
        </div>

        {/* Global navigation overlayed on top of everything */}
        <Navbar />

        {/* Content routing container */}
        <div className="relative z-10 w-full">
          <AnimatedRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}
