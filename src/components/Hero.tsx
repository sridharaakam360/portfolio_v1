import { ArrowDown, Mail, Phone, Sparkles, Rocket, Bot, Zap } from "lucide-react";
import { RevealOnScroll } from "./Interactions";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center relative px-6 md:px-10 overflow-hidden">
      {/* Background decoration - Google style colored dots */}
      <div className="absolute top-32 right-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-32 left-16 w-48 h-48 rounded-full bg-[hsl(var(--google-green))]/5 blur-3xl" />
      <div className="absolute top-1/4 right-1/3 w-3 h-3 rounded-full bg-[hsl(var(--google-blue))] animate-pulse-dot" />
      <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-[hsl(var(--google-red))] animate-pulse-dot" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 left-1/4 w-2.5 h-2.5 rounded-full bg-[hsl(var(--google-yellow))] animate-pulse-dot" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-2/3 w-2 h-2 rounded-full bg-[hsl(var(--google-green))] animate-pulse-dot" style={{ animationDelay: '0.5s' }} />

      <div className="relative z-10 max-w-6xl mx-auto w-full pt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 border border-primary/15">
                <Sparkles size={14} />
                Full-Stack Developer & ML Specialist
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={80}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                <span className="text-foreground">Start building </span>
                <span className="text-gradient-google">intelligent</span>
                <span className="text-foreground"> solutions with </span>
                <span className="text-gradient-google">Gowtham</span>
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={700}>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-lg">
                Crafting scalable web solutions with MERN stack, Next.js, and AI/ML applications.
                Maximize your product's potential with intelligent systems.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={800}>
              <div className="flex flex-wrap gap-3 mb-10">
                <a href="#contact" className="btn-google inline-flex items-center gap-2">
                  Get in touch
                </a>
                <a href="#projects" className="btn-google-outline inline-flex items-center gap-2">
                  <Mail size={16} />
                  View projects
                </a>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={900}>
              <div className="flex flex-wrap gap-6 items-center text-sm text-muted-foreground">
                <a href="mailto:gowthamp1614@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail size={14} />
                  gowthamp1614@gmail.com
                </a>
                <a href="tel:+919791757215" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone size={14} />
                  +91 9791757215
                </a>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right side - Google Ads style illustration card */}
          <RevealOnScroll delay={500} className="hidden md:block">
            <div className="relative">
              <div className="google-elevated p-8 relative z-10 transition-transform hover:scale-[1.02] duration-500">
                {/* Stats cards floating */}
                <div className="google-card p-4 mb-4 flex items-center gap-4 animate-float" style={{ animationDuration: '4.5s' }}>
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--google-blue))]/10 flex items-center justify-center">
                    <Rocket size={18} className="text-[hsl(var(--google-blue))]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Projects Delivered</p>
                    <p className="text-xl font-bold text-foreground">10+</p>
                  </div>
                </div>

                <div className="google-card p-4 mb-4 flex items-center gap-4 animate-float shadow-xl" style={{ animationDelay: '1.5s', animationDuration: '6s', transform: 'translateY(-10px)' }}>
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--google-green))]/10 flex items-center justify-center">
                    <Bot size={18} className="text-[hsl(var(--google-green))]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">ML Model Accuracy</p>
                    <p className="text-xl font-bold text-foreground">99%</p>
                  </div>
                </div>

                <div className="google-card p-4 flex items-center gap-4 animate-float" style={{ animationDelay: '2.5s', animationDuration: '5s' }}>
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--google-yellow))]/10 flex items-center justify-center">
                    <Zap size={18} className="text-[hsl(var(--google-yellow))]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">API Optimization</p>
                    <p className="text-xl font-bold text-foreground">40%</p>
                  </div>
                </div>

                {/* Google colored bar at bottom */}
                <div className="flex gap-1 mt-6 rounded-full overflow-hidden h-1.5">
                  <div className="flex-1 bg-[hsl(var(--google-blue))]" />
                  <div className="flex-1 bg-[hsl(var(--google-red))]" />
                  <div className="flex-1 bg-[hsl(var(--google-yellow))]" />
                  <div className="flex-1 bg-[hsl(var(--google-green))]" />
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors flex flex-col items-center gap-1">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
