import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "./Interactions";

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 md:px-10 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <div className="google-elevated p-10 md:p-16 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[hsl(var(--google-blue))]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[hsl(var(--google-green))]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <p className="text-primary text-sm font-medium mb-3">Get in touch</p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
                Ready to work together?
              </h2>
              <p className="text-muted-foreground text-base mb-10 max-w-md mx-auto">
                Let's collaborate on your next project. I'm always open to discussing new opportunities.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
                <a href="mailto:gowthamp1614@gmail.com" className="btn-google inline-flex items-center gap-2">
                  <Mail size={16} />
                  Send an email
                  <ArrowUpRight size={14} />
                </a>
                <a href="tel:+919791757215" className="btn-google-outline inline-flex items-center gap-2">
                  <Phone size={16} />
                  Call me
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} />
                Dharmapuri, Tamil Nadu, India
              </div>

              {/* Google colored bar */}
              <div className="flex gap-1 mt-10 rounded-full overflow-hidden h-1 max-w-xs mx-auto">
                <div className="flex-1 bg-[hsl(var(--google-blue))]" />
                <div className="flex-1 bg-[hsl(var(--google-red))]" />
                <div className="flex-1 bg-[hsl(var(--google-yellow))]" />
                <div className="flex-1 bg-[hsl(var(--google-green))]" />
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="text-center mt-10">
            <p className="text-xs text-muted-foreground">
              © 2026 Gowtham Pugalenthi. All rights reserved.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Contact;
