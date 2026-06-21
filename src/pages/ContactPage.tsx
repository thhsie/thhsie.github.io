import { motion } from "motion/react";
import { Send, Check } from "lucide-react";
import { useLocation } from "react-router-dom";

export function ContactPage() {
  const location = useLocation();
  const selectedServices = location.state?.selectedServices || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="relative w-full min-h-screen flex flex-col lg:grid lg:grid-cols-12 bg-transparent"
    >
      
      {/* Content Layout Container - Left column aligned perfectly with HomePage */}
      <div className="relative z-10 flex flex-col w-full lg:col-span-12 pb-16 pt-32 sm:pt-40 md:pt-44 px-6 sm:px-12 md:px-16 lg:px-12 xl:px-16 min-h-screen justify-center lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
        
        {/* Left narrative & form block inside the content panel (spanning 5 columns under layout wrapper) */}
        <main className="lg:col-span-5 w-full max-w-xl mx-auto flex flex-col gap-8 justify-center">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest pl-0.5">
              Enquiry
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-[64px] font-normal tracking-tight text-black leading-none select-none">
              Let's make it real.
            </h1>
            
            <p className="text-[#5A635A] text-sm sm:text-base leading-relaxed font-normal max-w-md">
              Whether you need a bespoke system, CRM, or a high-converting website, we design & engineer for top-performance outcomes. Reach us directly at{" "}
              <a
                href="mailto:support@fedri.uk"
                className="text-black font-semibold hover:underline transition-colors"
              >
                support@fedri.uk
              </a>
            </p>
          </div>

          {/* Dynamic Selection display pills */}
          {selectedServices.length > 0 && (
            <div className="p-4 sm:p-5 bg-[#FAFBF9]/90 border border-neutral-200/55 rounded-2xl flex flex-col gap-2 w-full">
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                Requested Services
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedServices.map((service: string) => (
                  <span
                    key={service}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1C2E1E] text-white rounded-full text-xs font-medium shadow-sm"
                  >
                    <Check className="w-3 h-3 text-white" />
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Clean consolidated form */}
          <form
            action="https://formsubmit.co/support@fedri.uk"
            method="POST"
            className="flex flex-col gap-7 w-full animate-[fadeIn_0.5s_ease-out]"
          >
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_subject" value="New Fedri Inquiry!" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            {selectedServices.length > 0 && (
              <input
                type="hidden"
                name="services"
                value={selectedServices.join(", ")}
              />
            )}

            {/* Name Input Field */}
            <div className="flex flex-col gap-1 group border-b border-neutral-200 focus-within:border-[#1C2E1E] transition-all duration-300 pb-2">
              <label
                htmlFor="name"
                className="text-neutral-400 text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300 group-focus-within:text-[#1C2E1E]"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-transparent px-1 py-0.5 text-black placeholder:text-neutral-300 focus:outline-none font-light text-sm sm:text-base"
                placeholder="Your brand or legal name"
              />
            </div>

            {/* Email Input Field */}
            <div className="flex flex-col gap-1 group border-b border-neutral-200 focus-within:border-[#1C2E1E] transition-all duration-300 pb-2">
              <label
                htmlFor="email"
                className="text-neutral-400 text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300 group-focus-within:text-[#1C2E1E]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-transparent px-1 py-0.5 text-black placeholder:text-neutral-300 focus:outline-none font-light text-sm sm:text-base"
                placeholder="you@example.com"
              />
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col gap-1 group border-b border-neutral-200 focus-within:border-[#1C2E1E] transition-all duration-300 pb-2">
              <label
                htmlFor="message"
                className="text-neutral-400 text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300 group-focus-within:text-[#1C2E1E]"
              >
                Project Details
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={3}
                className="w-full bg-transparent px-1 py-0.5 text-black placeholder:text-neutral-300 focus:outline-none font-light text-sm sm:text-base resize-none"
                placeholder="Describe the CRM, bespoke system, goals, etc..."
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full flex items-center justify-center gap-2 bg-[#1C2E1E] text-white font-medium hover:bg-black transition-all shadow-sm cursor-pointer select-none text-[10px] font-bold uppercase tracking-widest whitespace-nowrap"
              >
                Send Message <Send className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </form>
        </main>

        {/* Grid Spacer columns on the right (7/12 columns window) - Allows background to pass through, identical to HomePage */}
        <div className="hidden lg:block lg:col-span-7 bg-transparent" />
      </div>

    </motion.div>
  );
}
