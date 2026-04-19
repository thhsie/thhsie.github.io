import { motion } from "motion/react";
import { Send } from "lucide-react";
import { HlsVideo } from "../components/HlsVideo";
import { BlurText } from "../components/BlurText";

export function ContactPage() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen relative flex items-center justify-center pt-24 pb-12 px-6"
    >
      <div className="absolute inset-0 z-0">
         <HlsVideo src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8" className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center">
        
        <BlurText 
          text="Let's build the future." 
          className="font-heading font-bold tracking-tighter text-5xl md:text-6xl text-white mb-2 justify-center" 
        />

        <p className="text-white/60 mb-10 text-center font-light">
          Reach us directly at <a href="mailto:support@fedri.uk" className="text-white hover:underline hover:text-white/90 transition-colors">support@fedri.uk</a>
        </p>

        <div className="w-full liquid-glass rounded-3xl p-8 md:p-10 border border-white/10">
          <form 
            action="https://formsubmit.co/support@fedri.uk" 
            method="POST"
            className="flex flex-col gap-5"
          >
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_subject" value="New Fedri SaaS Inquiry!" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-white/60 text-sm font-medium ml-1">Name</label>
              <input 
                type="text" 
                id="name"
                name="name" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all font-light"
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-white/60 text-sm font-medium ml-1">Email</label>
              <input 
                type="email" 
                id="email"
                name="email" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all font-light"
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-white/60 text-sm font-medium ml-1">Message</label>
              <textarea 
                id="message"
                name="message" 
                required
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all font-light resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <button 
              type="submit"
              className="mt-4 liquid-glass-strong w-full py-4 rounded-xl flex items-center justify-center gap-2 text-white font-medium hover:bg-white/10 transition-colors"
            >
              Send Message <Send className="w-4 h-4 ml-1" />
            </button>

          </form>
        </div>

      </div>
    </motion.main>
  );
}
