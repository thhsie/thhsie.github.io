import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Logo } from "./Logo";

export function Navbar() {
  const location = useLocation();
  const showBack = location.pathname === '/contact';

  return (
    <>
      {/* Top scroll mask to fade out content rolling under the navbar */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/80 to-transparent z-40 pointer-events-none" />
      
      <nav className="fixed top-4 left-0 w-full z-50 px-4 sm:px-6 flex justify-center pointer-events-none">
        <div className="w-full max-w-7xl flex items-center justify-between pointer-events-auto">
        {/* Left: Logo or Back Link */}
        <div className="flex-1 flex items-center">
          {showBack ? (
            <Link to="/" className="flex items-center justify-center text-white hover:text-white/80 transition-colors w-fit liquid-glass p-2.5 rounded-full border border-white/10">
              <ArrowLeft className="w-5 h-5 relative -left-0.5" />
            </Link>
          ) : (
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group hover:opacity-80 transition-opacity">
              <Logo className="w-8 h-8 group-hover:scale-105 transition-transform" />
              <span className="font-heading font-bold tracking-tighter text-2xl">Fedri</span>
            </Link>
          )}
        </div>

        {/* Center: Links */}
        {!showBack && (
          <div className="hidden md:flex items-center gap-8 px-6 py-2 liquid-glass rounded-full text-sm font-medium flex-none">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white/70 hover:text-white transition-colors">Home</Link>
            <a href="#services" className="text-white/70 hover:text-white transition-colors">Services</a>
            <a href="#work" className="text-white/70 hover:text-white transition-colors">Work</a>
            <Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link>
          </div>
        )}

        {/* Right: CTA */}
        <div className="flex-1 flex justify-end">
          {!showBack && (
            <Link to="/contact" className="px-5 py-2.5 bg-white text-black rounded-full font-medium text-sm hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] whitespace-nowrap">
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  </>
  );
}
