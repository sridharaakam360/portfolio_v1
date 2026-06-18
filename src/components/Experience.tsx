import { RevealOnScroll } from "./Interactions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const experiences = [
  {
    company: "Hybrid Quantum–Classical Drug-Binding Affinity Pipeline",
    role: "Quantum Machine Learning Engineer",
    color: "hsl(216, 85%, 55%)",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
    points: [
      "Built Hybrid Quantum–Classical Drug-Binding Affinity Pipeline — an end-to-end laptop-runnable pipeline from protein target to trained quantum-classical model scoring ΔG with honest benchmarks.",
    ],
  },
  {
    company: "Gromacs MD Simulation Automation Suite",
    role: "Computational Biophysics Developer",
    color: "hsl(144, 72%, 36%)",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    points: [
      "Built complete automation with UI/UX for Gromacs & NAMD MD simulations with live data interpretations (RMSD, RMSF, SASA, RG, HBOND) and MMPBSA free energy.",
      "Designed user-friendly interface for non-technical researchers to run complex molecular dynamics simulations seamlessly.",
      "Integrated real-time data visualization and analysis tools for instant feedback on simulation results.",
    ],
  },
  {
    company: "AutoDock Vina Docking & ADMET Platform",
    role: "Cheminformatics & Full-Stack Developer",
    color: "hsl(43, 95%, 52%)",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    points: [
      "Built multi-target with multi-ligands complete automation docking, ADMET, and Visualization — integrated with AutoDock Vina, RDKit, and PyMOL.",
      "Developed scalable web platform for computational drug discovery workflows.",
      "Created intuitive visualization dashboards for docking results and ADMET predictions.",
    ],
  },
];

const Experience = () => {
  const [activeCard, setActiveCard] = useState(0);

  const handlePrev = () => {
    setActiveCard((prev) => (prev === 0 ? experiences.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveCard((prev) => (prev === experiences.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="experience" className="py-24 px-6 md:px-10 bg-background overflow-hidden relative border-t border-border/30">
      <div className="max-w-[1400px] mx-auto w-full">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[42px] font-medium text-foreground tracking-tight">
              What I've built
            </h2>
          </div>
        </RevealOnScroll>

        <div className="relative w-full mx-auto flex items-center justify-center">
          
          <button 
            onClick={handlePrev}
            className="absolute left-0 lg:-left-4 xl:-left-12 z-20 w-[48px] h-[48px] rounded-full bg-white border border-border/40 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center justify-center text-foreground hover:shadow-md transition-shadow active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex items-center justify-center w-[95%] md:w-full gap-4 md:gap-5 max-w-[1150px] mx-auto">
            {experiences.map((exp, i) => {
              const isActive = activeCard === i;
              
              return (
                <div 
                  key={i}
                  onClick={() => !isActive && setActiveCard(i)}
                  className={`
                    relative rounded-[32px] overflow-hidden flex-shrink-0 flex items-stretch h-[500px] md:h-[520px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border border-border/50
                    ${isActive ? 'w-full md:w-[860px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-default' : 'w-[5vw] min-w-[70px] md:w-[220px] shadow-sm cursor-pointer hover:shadow-md'}
                  `}
                >
                  
                  {/* Left Side: Unsplash Photography Banner */}
                  <div 
                    className={`relative flex-shrink-0 overflow-hidden bg-black transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'w-full md:w-[40%]' : 'w-full'}`}
                  >
                    <img 
                      src={exp.image} 
                      alt={exp.company}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ${isActive ? 'scale-100 opacity-90' : 'scale-110 opacity-60'}`}
                      draggable={false}
                    />
                    
                    {/* Shadow overlay to improve text readability and mimic the Google AI dark panels */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 transition-opacity duration-700 ${isActive ? 'opacity-30' : 'opacity-100'}`} />
                    
                    {/* Minimalist inactive representation */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 text-white ${isActive ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
                      <span className="font-bold tracking-widest text-lg uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                        {exp.company.length > 20 ? exp.company.substring(0, 20) + '...' : exp.company}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Strict Bounds Text Details Drawer */}
                  <div className={`
                    hidden md:flex relative h-full flex-1 overflow-hidden transition-opacity duration-[800ms]
                    ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none delay-0 duration-100'}
                  `}>
                    <div className="absolute inset-y-0 left-0 min-w-[500px] w-full p-12 flex flex-col justify-center bg-white z-10 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" style={{ transform: isActive ? 'translateX(0)' : 'translateX(-40px)' }}>
                      <h2 className="text-[34px] font-bold text-foreground tracking-tight leading-[1.1] mb-2">{exp.company}</h2>
                      <h3 className="text-xl font-medium text-foreground mb-6" style={{ color: exp.color }}>{exp.role}</h3>
                      
                      <p className="text-[15px] mb-8 pb-8 border-b border-border/60 text-muted-foreground leading-relaxed max-w-[360px]">
                        {exp.points[0]}
                        {exp.points[1] && <><br/><br/>{exp.points[1]}</>}
                      </p>

                      <div className="mt-auto flex items-center justify-end">
                        <button className="rounded-full px-7 py-3 font-semibold text-[14px] text-white transition-all hover:opacity-90 shadow-sm" style={{ backgroundColor: exp.color }}>
                          View details ↗
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile text block */}
                  {isActive && (
                    <div className="absolute inset-0 top-auto bottom-0 h-[50%] flex md:hidden flex-col justify-end p-6 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
                      <h2 className="text-2xl font-bold text-white tracking-tight mb-1">{exp.company}</h2>
                      <h3 className="text-[15px] font-medium" style={{ color: exp.color }}>{exp.role}</h3>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          <button 
            onClick={handleNext}
            className="absolute right-0 lg:-right-4 xl:-right-12 z-20 w-[48px] h-[48px] rounded-full bg-white border border-border/40 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center justify-center text-foreground hover:shadow-md transition-shadow active:scale-95"
          >
            <ChevronRight size={24} />
          </button>
          
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {experiences.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveCard(i)}
              className={`rounded-full transition-all duration-500 border ${
                activeCard === i ? "w-2.5 h-2.5 bg-zinc-800 border-zinc-800 ring-4 ring-zinc-800/10" : "w-1.5 h-1.5 bg-border hover:bg-zinc-400 border-transparent hover:border-zinc-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;