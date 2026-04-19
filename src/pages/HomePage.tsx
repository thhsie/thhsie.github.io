import { ArrowUpRight, BarChart3, Play, Shield, Terminal, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { BlurText } from "../components/BlurText";
import { HlsVideo } from "../components/HlsVideo";
import { motion } from "motion/react";

export function HomePage() {
  return (
    <main className="w-full">
      <HeroSection />
      <StartSection />
      <FeaturesChessSection />
      <FeaturesGridSection />
      <StatsSection />
      <CtaFooterSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative w-full h-[1000px] flex flex-col items-center justify-center pt-20">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center mt-20">
        <div className="liquid-glass rounded-full px-4 py-2 text-sm font-medium mb-8 flex items-center justify-center border border-white/10">
          <span className="text-white/90">AI-accelerated SaaS development.</span>
        </div>

        <BlurText 
          text="The Software Your Business Deserves" 
          className="font-heading font-bold tracking-tighter text-5xl md:text-7xl leading-[1.1] mb-6 text-white justify-center"
        />

        <p className="max-w-2xl text-white/60 font-body font-light text-lg md:text-xl mb-10 leading-relaxed">
          Scalable architecture. Blazing performance. Built by AI, refined by elite engineers. This is Fedri SaaS, wildly reimagined.
        </p>

        <Link to="/contact" className="liquid-glass-strong flex items-center gap-2 group px-8 py-4 rounded-full text-white font-medium hover:scale-105 transition-all duration-300">
          Start Building <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

function StartSection() {
  return (
    <section className="relative w-full py-32 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <HlsVideo src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8" className="w-full h-full object-cover opacity-40 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-20%" }}
           transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full liquid-glass mb-8">
            <Play className="w-6 h-6 text-white ml-1" />
          </div>
          <h2 className="font-heading font-bold tracking-tighter text-5xl md:text-7xl mb-6">You dream it. We ship it.</h2>
          <p className="text-white/60 font-light text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Share your vision. Fedri handles the rest—architecture, robust APIs, stunning frontend, and deployment. All in days, not quarters.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesChessSection() {
  return (
    <section className="relative w-full py-32 flex flex-col items-center justify-center overflow-hidden" id="work">
      <div className="absolute inset-0 z-0">
        <HlsVideo src="https://stream.mux.com/hUT6X11m1Vkw1QMxPOLgI761x2cfpi9bHFbi5cNg4014.m3u8" className="w-full h-full object-cover opacity-40 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        
        {/* Block 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start gap-6 liquid-glass p-10 md:p-12 rounded-[2.5rem] border border-white/10"
        >
          <div className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/70">
            Architecture
          </div>
          <h3 className="font-heading font-bold tracking-tighter text-4xl md:text-5xl">Engineered to scale. Built to perform.</h3>
          <p className="text-white/60 font-light text-lg leading-relaxed">
            Every endpoint is intentional. Our AI analyzes top-tier SaaS infrastructures to generate bulletproof backends tailored specifically for your traffic patterns. Zero technical debt from day one.
          </p>
        </motion.div>

        {/* Block 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-start gap-6 liquid-glass p-10 md:p-12 rounded-[2.5rem] border border-white/10"
        >
          <div className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/70">
            Optimization
          </div>
          <h3 className="font-heading font-bold tracking-tighter text-4xl md:text-5xl">It gets smarter. Automatically.</h3>
          <p className="text-white/60 font-light text-lg leading-relaxed">
            Your software evolves on its own. Fedri monitors server load, user flows, and error rates, proposing architectural updates in real-time. It's like having a lead engineer constantly refactoring.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

function FeaturesGridSection() {
  return (
    <section className="relative py-32 bg-black w-full" id="services">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-heading font-bold tracking-tighter text-5xl mb-4">Why Us</h2>
          <p className="text-white/50 text-lg max-w-2xl">The elite standard in SaaS creation, blending AI speed with hand-crafted precision.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="liquid-glass rounded-3xl p-8 flex flex-col gap-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-medium mb-2">Days, Not Months</h4>
              <p className="text-white/50 text-sm leading-relaxed">From zero to functional MVP in days. We compress years of development into a hyper-efficient pipeline.</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="liquid-glass rounded-3xl p-8 flex flex-col gap-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-medium mb-2">Obsessively Engineered</h4>
              <p className="text-white/50 text-sm leading-relaxed">We don't cut corners. Clean code, optimal queries, and bulletproof types guarantee stability.</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="liquid-glass rounded-3xl p-8 flex flex-col gap-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-medium mb-2">Built to Scale</h4>
              <p className="text-white/50 text-sm leading-relaxed">Whether you have 10 users or 10 million. Our infrastructure automatically scales with your success.</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="liquid-glass rounded-3xl p-8 flex flex-col gap-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-medium mb-2">Secure by Default</h4>
              <p className="text-white/50 text-sm leading-relaxed">Enterprise-grade security embedded into every layer. We handle authentication, data privacy, and compliance.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="relative w-full py-32 overflow-hidden px-6">
      <div className="absolute inset-0 z-0">
         <HlsVideo src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8" saturate={false} className="w-full h-full object-cover opacity-20" />
         <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="liquid-glass-strong rounded-[3rem] p-12 md:p-20 relative overflow-hidden backdrop-blur-md border border-white/10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
            <div className="flex flex-col gap-2">
              <span className="font-heading font-bold tracking-tighter text-6xl md:text-7xl">200+</span>
              <span className="text-sm font-medium uppercase tracking-widest text-white/50">SaaS Launched</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-heading font-bold tracking-tighter text-6xl md:text-7xl">99.9%</span>
              <span className="text-sm font-medium uppercase tracking-widest text-white/50">Uptime SLA</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-heading font-bold tracking-tighter text-6xl md:text-7xl">3.2x</span>
              <span className="text-sm font-medium uppercase tracking-widest text-white/50">Faster Delivery</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-heading font-bold tracking-tighter text-6xl md:text-7xl">5 Days</span>
              <span className="text-sm font-medium uppercase tracking-widest text-white/50">Average MVP</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaFooterSection() {
  return (
    <section className="relative w-full pt-32 pb-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
         <HlsVideo src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8" className="w-full h-full object-cover opacity-60 mix-blend-screen" />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
         <h2 className="font-heading font-bold tracking-tighter text-5xl md:text-7xl mb-8">Your next SaaS starts here.</h2>
         <Link to="/contact" className="liquid-glass-strong px-10 py-5 rounded-full text-white font-medium text-lg hover:scale-105 transition-all duration-300">
           Let's Talk
         </Link>
      </div>

      <div className="relative z-10 mt-32 border-t border-white/5 pt-8 flex flex-col items-center justify-center gap-4 text-white/30 text-xs">
        <p>&copy; 2026 Fedri SaaS. All rights reserved.</p>
      </div>
    </section>
  );
}
