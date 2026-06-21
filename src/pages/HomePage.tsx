import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTypewriter } from "../hooks/useTypewriter";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight } from "lucide-react";

export function HomePage() {
  const navigate = useNavigate();
  const { displayed, done } = useTypewriter("we'd love to\nhear from you!");
  
  // Multi-select service pills tracking state
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const services = ["CRM", "Bespoke System", "Website", "Other"];

  const handleToggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleLetsGo = () => {
    navigate("/contact", { state: { selectedServices } });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="relative w-full min-h-screen flex flex-col lg:grid lg:grid-cols-12 bg-transparent"
    >
      
      {/* Content Layout Container - strictly on the left side (5/12 columns) */}
      <div className="relative z-10 flex flex-col w-full lg:col-span-12 pb-16 pt-32 sm:pt-40 md:pt-44 px-6 sm:px-12 md:px-16 lg:px-12 xl:px-16 min-h-screen justify-center lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
        <main id="spade-hero" className="lg:col-span-5 w-full max-w-xl mx-auto flex flex-col justify-center">
          
          {/* Animated Headline with perfectly responsive fluid viewport scale */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-[72px] font-normal tracking-tight text-black leading-[1.08] mb-6 select-none w-full whitespace-pre-wrap">
              {displayed}
              {!done && (
                <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
              )}
            </h1>
          </motion.div>

          {/* Secondary Description Text */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <p className="text-base sm:text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-10 max-w-md">
              Whether you have questions, feedback, <br className="hidden sm:inline" /> drop us a message and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Interactive Multi-Select Service Pills Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="w-full"
          >
            <h2 className="text-xl sm:text-2xl font-medium tracking-tight mb-1 text-black">
              What sort of service?
            </h2>
            <p className="opacity-80 text-[#738273] mb-6 text-xs sm:text-sm">
              Select all that apply
            </p>

            {/* Responsive Flex Wrap Gap */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
              {services.map((service) => {
                const isSelected = selectedServices.includes(service);
                return (
                  <motion.button
                    key={service}
                    type="button"
                    onClick={() => handleToggleService(service)}
                    className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer border ${
                      isSelected
                        ? "bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 border-[#1C2E1E]"
                        : "bg-white text-[#1C2E1E] border-[#F1F3F1] hover:bg-[#F1F3F1]/55"
                    }`}
                    whileTap={{ scale: 0.96 }}
                  >
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </motion.span>
                    )}
                    {service}
                  </motion.button>
                );
              })}
            </div>

            {/* Contingent Feedback Status Banner */}
            <div className="min-h-[50px]">
              <AnimatePresence mode="wait">
                {selectedServices.length === 0 ? (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="italic text-xs text-neutral-500 pl-1"
                  >
                    Please click to select services above.
                  </motion.p>
                ) : (
                  <motion.div
                    key="active"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 22 }}
                    className="overflow-hidden"
                  >
                    <div className="w-full bg-[#FAFBF9]/90 border border-neutral-200/60 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] font-semibold text-neutral-400 uppercase tracking-wider">
                          Ready to inquire
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-[#1C2E1E]">
                          {selectedServices.join(", ")}
                        </span>
                      </div>
                      <button
                        onClick={handleLetsGo}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1C2E1E] text-white hover:bg-black transition-colors rounded-xl text-[10px] font-semibold uppercase tracking-wider select-none cursor-pointer"
                      >
                        Let's Go
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Grid Spacer columns on the right (7/12 columns window) - Allows background to pass through */}
      <div className="hidden lg:block lg:col-span-7 bg-transparent" />
    </motion.div>
  );
}
