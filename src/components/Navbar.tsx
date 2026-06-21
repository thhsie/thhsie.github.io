import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { ArrowLeft } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        background: isScrolled 
          ? "linear-gradient(to bottom, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 50%, rgba(255,255,255,0) 100%)"
          : "linear-gradient(to bottom, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0) 100%)",
        backdropFilter: isScrolled ? "blur(14px)" : "blur(4px)",
        WebkitBackdropFilter: isScrolled ? "blur(14px)" : "blur(4px)",
        maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
      }}
      className="fixed top-0 inset-x-0 z-50 px-5 sm:px-8 pt-4 pb-14 sm:pt-5 sm:pb-16 flex flex-row justify-between items-center pointer-events-none transition-all duration-550"
    >
      {/* Logo + Brand name (Left side) */}
      <Link to="/" className="flex flex-row items-center gap-3 z-50 pointer-events-auto hover:opacity-85 transition-opacity">
        <Logo className="w-7 h-7 sm:w-9 sm:h-9" />
        <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-semibold select-none">
          Fedri
        </span>
      </Link>

      {/* Action / Link (Right side) */}
      <div className="z-50 pointer-events-auto">
        {isContactPage ? (
          <Link
            to="/"
            className="text-[15px] sm:text-[17px] text-black hover:opacity-60 transition-opacity flex items-center gap-2 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        ) : (
          <Link
            to="/contact"
            className="text-[15px] sm:text-[17px] text-black underline underline-offset-4 hover:opacity-60 transition-opacity font-medium"
          >
            Get in touch
          </Link>
        )}
      </div>
    </header>
  );
}
