import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#experience" },
  { label: "Publications", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      // Trigger the "Pill" state after 100px scroll for better weight
      setScrolled(window.scrollY > 100);

      // Find active section
      let currentSection = "";
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const link of links) {
        const sectionId = link.href.substring(1);
        const section = document.getElementById(sectionId);
        
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = link.href;
          }
        }
      }
      setActiveSection(currentSection);
    };
    
    window.addEventListener("scroll", onScroll);
    // Trigger on mount to set initial section
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const section = document.getElementById(href.substring(1));
    if (section) {
      e.preventDefault();
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(href);
    setOpen(false);
  };

  return (
    <nav className="fixed left-0 right-0 z-[100] h-0 pointer-events-none">
      
      {/* 1. LAYER A: Standard Full-width Header (Hides on scroll) */}
      <div 
        className={`w-full bg-white border-b border-[#f1f3f4] h-16 px-6 md:px-10 flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto absolute top-0 left-0 right-0 ${
          scrolled ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-1.5">
          <span className="text-xl font-bold text-[#202124]">Sridhar</span>
          <span className="text-xl font-bold text-[#1a73e8]">Duraisamy</span>
        </a>

        {/* Desktop Links (Static Layout) */}
        <div className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-[14px] font-medium transition-all px-4 py-2 rounded-full ${
                activeSection === link.href
                  ? "bg-[#f1f3f4] text-[#202124]"
                  : "text-[#5f6368] hover:text-[#202124] hover:bg-[#f8f9fa]"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-google ml-3 py-2 px-6">Hire me</a>
        </div>

        {/* Mobile Toggle (Layer A) */}
        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden text-[#5f6368] p-2 rounded-full hover:bg-[#f1f3f4] transition-colors"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* 2. LAYER B: Floating Gemini Pill (Shows on scroll) */}
      <div 
        className={`fixed top-5 left-1/2 -translate-x-1/2 w-max max-w-[95vw] bg-white/85 backdrop-blur-xl rounded-full border border-[#dadce0] shadow-[0_4px_12px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)] py-1.5 px-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto z-[101] ${
          scrolled ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-12 scale-90 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-1">
          {/* Desktop Pill Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.slice(0, 6).map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-[13px] font-semibold transition-all duration-200 px-4 py-2.5 rounded-full ${
                  activeSection === link.href 
                    ? "bg-[#f1f3f4] text-[#202124] hover:bg-[#e8eaed]" 
                    : "text-[#5f6368] hover:text-[#202124] hover:bg-[#f8f9fa]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile UI for Pill Header */}
          <div className="md:hidden flex items-center px-4 py-2 gap-4">
             <span className="text-sm font-bold text-[#1a73e8]">Sridhar JD</span>
             <button 
              onClick={() => setOpen(!open)} 
              className="text-[#5f6368] w-8 h-8 rounded-full bg-[#f1f3f4] flex items-center justify-center transition-colors"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. SHARED MOBILE DRAWER */}
      {open && (
        <div className={`fixed top-[72px] left-0 right-0 mx-4 bg-white rounded-[32px] border border-[#dadce0] shadow-2xl overflow-hidden pointer-events-auto animate-in slide-in-from-top-4 duration-300 z-[110]`}>
          <div className="p-4 space-y-1">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => handleLinkClick(e, link.href)}
                className={`block text-sm font-medium px-6 py-4 rounded-2xl transition-colors ${
                  activeSection === link.href ? "bg-[#f1f3f4] text-[#202124]" : "text-[#5f6368] hover:bg-[#f8f9fa]"
                }`}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
