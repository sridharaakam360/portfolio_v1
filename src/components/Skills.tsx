// import { RevealOnScroll } from "./Interactions";
// import { useState } from "react";
// import { Code, Database, Wrench, Bot, Cpu, Layers, Sparkles, Beaker, Dna, Atom, TestTube } from "lucide-react";

// const skillIcons: Record<string, string> = {
//   // Computational Chemistry & Docking
//   "Schrodinger": "schrodinger",
//   "AutoDock Vina": "autodock",
//   "iGEMDock": "igem",
//   "SwissDock": "swiss",
//   "Discovery Studio": "biovia",
//   "PyMOL": "pymol",
//   "VMD": "vmd",
  
//   // MD Simulation
//   "GROMACS": "gromacs",
//   "NAMD": "namd",
  
//   // Cheminformatics & Databases
//   "RDKit": "rdkit",
//   "PubChem": "pubchem",
//   "ChEMBL": "chembl",
//   "RCSB PDB": "rcsb",
//   "UniProt": "uniprot",
//   "AlphaFold": "alphafold",
  
//   // Swiss Tools
//   "SwissADME": "swiss",
//   "SwissTargetPrediction": "swiss",
//   "SwissModeling": "swiss",
  
//   // ChemDraw
//   "Chem2D": "chemdraw",
//   "Chem3D": "chemdraw",
  
//   // Development
//   "Python": "python",
//   "MySQL": "mysql",
//   "React": "react",
//   "Node.js": "nodedotjs",
// };

// const skillCategories = [
//   { 
//     title: "Molecular Docking", 
//     icon: <Beaker size={18} strokeWidth={1.5} />, 
//     items: ["Schrodinger", "AutoDock Vina", "iGEMDock", "SwissDock", "Discovery Studio", "PyMOL", "VMD"],
//     tagline: "Predict molecular interactions with precision",
//     description: "Leverage industry-standard docking tools to predict binding affinities, visualize protein-ligand interactions, and drive structure-based drug discovery."
//   },
//   { 
//     title: "MD Simulations", 
//     icon: <Dna size={18} strokeWidth={1.5} />, 
//     items: ["GROMACS", "NAMD", "VMD", "PyMOL", "Discovery Studio"],
//     tagline: "Simulate biomolecular dynamics in silico",
//     description: "Run and analyze molecular dynamics simulations to study protein stability, conformational changes, and interactions under physiological conditions."
//   },
//   { 
//     title: "Cheminformatics", 
//     icon: <Atom size={18} strokeWidth={1.5} />, 
//     items: ["RDKit", "PubChem", "ChEMBL", "RCSB PDB", "UniProt", "AlphaFold", "Chem2D", "Chem3D"],
//     tagline: "Unlock the chemical information space",
//     description: "Access, analyze, and visualize chemical and biological data from comprehensive databases for drug discovery and cheminformatics research."
//   },
//   { 
//     title: "ADMET & Prediction", 
//     icon: <TestTube size={18} strokeWidth={1.5} />, 
//     items: ["SwissADME", "SwissTargetPrediction", "SwissModeling", "Discovery Studio", "RDKit"],
//     tagline: "Predict properties before synthesis",
//     description: "Evaluate absorption, distribution, metabolism, excretion, toxicity, and target interactions to prioritize lead compounds for drug development."
//   },
//   { 
//     title: "Development", 
//     icon: <Code size={18} strokeWidth={1.5} />, 
//     items: ["Python", "MySQL", "React", "Node.js"],
//     tagline: "Build robust scientific applications",
//     description: "Develop scalable web platforms and automation pipelines for computational drug discovery, cheminformatics, and bioinformatics workflows."
//   },
// ];

// const Skills = () => {
//   const [activeCategory, setActiveCategory] = useState(0);

//   // Collect unique icons for the marquee to avoid redundancy
//   const uniqueSkillsList = Array.from(new Set(skillCategories.flatMap(c => c.items)));
//   const marqueeItems = [...uniqueSkillsList, ...uniqueSkillsList]; // Double for seamless loop

//   return (
//     <section id="skills" className="py-24 px-6 md:px-10 bg-[#ffffff] relative border-t border-border/30 overflow-hidden">
//       <div className="max-w-[1300px] mx-auto">
//         <RevealOnScroll>
//           <div className="text-center mb-16">
//             <h2 className="text-[32px] md:text-[48px] font-bold text-[#202124] tracking-tight leading-tight" style={{ fontFamily: "Google Sans Display, sans-serif" }}>
//               Computational drug discovery & development toolkit
//             </h2>
//           </div>
//         </RevealOnScroll>

//         {/* Brand Icon Marquee - "Icons for respective library/tool/framework" */}
//         <RevealOnScroll>
//           <div className="overflow-hidden mb-24 py-10 border-y border-[#f1f3f4]">
//             <div className="flex animate-marquee whitespace-nowrap items-center h-16">
//               {marqueeItems.map((skill, i) => {
//                 const slug = skillIcons[skill];
//                 if (!slug) return null;
                
//                 return (
//                   <div key={i} className="flex items-center gap-2 mx-12 group cursor-pointer">
//                     <div className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
//                       <img 
//                         src={`https://cdn.simpleicons.org/${slug}`} 
//                         alt={skill}
//                         className="max-w-full max-h-full object-contain grayscale-[0.2] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
//                         style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.05))" }}
//                       />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </RevealOnScroll>

//         {/* 3-Column Layout */}
//         <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start min-h-[500px]">
          
//           {/* Column 1: Vertical Tabs (Left) */}
//           <div className="w-full lg:w-[280px] flex flex-col gap-2">
//             {skillCategories.map((cat, i) => (
//               <button
//                 key={cat.title}
//                 onClick={() => setActiveCategory(i)}
//                 className={`flex items-center gap-4 text-[15px] px-6 py-4 rounded-full border transition-all duration-300 font-medium ${activeCategory === i
//                     ? "bg-[#202124] text-white border-[#202124] shadow-lg shadow-black/10"
//                     : "bg-background border-[#dadce0] text-[#5f6368] hover:bg-[#f8f9fa] hover:border-[#bdc1c6] hover:text-[#202124]"
//                   }`}
//               >
//                 <div className={`${activeCategory === i ? "text-[hsl(var(--google-blue))]" : "text-[#5f6368]"}`}>
//                   {cat.icon}
//                 </div>
//                 <span>{cat.title}</span>
//                 {activeCategory === i && (
//                   <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[hsl(var(--google-blue))]" />
//                 )}
//               </button>
//             ))}
//           </div>

//           {/* Column 2: Dynamic Visual (Center) */}
//           <div className="flex-1 w-full max-w-[500px] h-[350px] md:h-[450px] relative flex items-center justify-center p-6 bg-white border border-[#dadce0] rounded-[32px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-[#f8f9fa] to-white" />
            
//             {/* Skill Hub - Animates based on active tab */}
//             <div className="relative z-10 w-full grid grid-cols-2 md:grid-cols-3 gap-4">
//               {skillCategories[activeCategory].items.slice(0, 9).map((item, i) => (
//                 <div 
//                   key={`${activeCategory}-${item}`}
//                   className="bg-white border border-[#dadce0] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
//                   style={{ animationDelay: `${i * 100}ms` }}
//                 >
//                   <div className="w-8 h-8 rounded-full bg-[#f1f3f4] flex items-center justify-center mb-3">
//                     {skillIcons[item] ? (
//                       <img 
//                         src={`https://cdn.simpleicons.org/${skillIcons[item]}`} 
//                         alt={item}
//                         className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity"
//                       />
//                     ) : (
//                       <Cpu size={14} className="text-[hsl(var(--google-blue))]" />
//                     )}
//                   </div>
//                   <span className="text-[12px] font-bold text-[#202124] leading-tight">{item}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Decorative Google Dots */}
//             <div className="absolute top-6 left-6 flex gap-1">
//               <div className="w-2 h-2 rounded-full bg-[#4285F4]" />
//               <div className="w-2 h-2 rounded-full bg-[#EA4335]" />
//               <div className="w-2 h-2 rounded-full bg-[#FBBC05]" />
//               <div className="w-2 h-2 rounded-full bg-[#34A853]" />
//             </div>
//           </div>

//           {/* Column 3: Narrative Text (Right) */}
//           <div className="w-full lg:w-[350px] flex flex-col justify-center text-left py-4 pt-10 lg:pt-20">
//             <RevealOnScroll>
//               <h3 className="text-[32px] md:text-[40px] font-bold text-[#202124] leading-[1.2] mb-6 animate-in fade-in slide-in-from-right-8 duration-500" style={{ fontFamily: "Google Sans Display, sans-serif" }}>
//                 {skillCategories[activeCategory].tagline}
//               </h3>
//               <p className="text-[16px] text-[#5f6368] leading-relaxed mb-8 animate-in fade-in slide-in-from-right-8 duration-700">
//                 {skillCategories[activeCategory].description}
//               </p>
              
//               <div className="flex gap-2">
//                 <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--google-blue))]" />
//                 <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--google-red))]" />
//                 <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--google-yellow))]" />
//                 <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--google-green))]" />
//               </div>
//             </RevealOnScroll>
//           </div>

//         </div>

      
//       </div>
//     </section>
//   );
// };

// export default Skills;


import { RevealOnScroll } from "./Interactions";
import { useState } from "react";
import { Code, Database, Wrench, Bot, Cpu, Layers, Sparkles, Beaker, Dna, Atom, TestTube, FlaskConical, Microscope } from "lucide-react";

const skillIcons: Record<string, string> = {
  // Molecular Docking
  "Schrödinger": "schrodinger",
  "AutoDock Vina": "autodock",
  "iGEMDock": "igem",
  "SwissDock": "swiss",
  
  // ADMET & Modelling
  "SwissADME": "swiss",
  "SwissTargetPrediction": "swiss",
  "SwissModelling": "swiss",
  
  // MD Simulation
  "GROMACS": "gromacs",
  "NAMD": "namd",
  "VMD": "vmd",
  "PyMOL": "pymol",
  "Discovery Studio": "biovia",
  
  // Cheminformatics
  "Chem2D": "chemdraw",
  "Chem3D": "chemdraw",
  "RDKit": "rdkit",
  "Ligplot+": "ligplot",
  "PubChem": "pubchem",
  "ChEMBL": "chembl",
  "RCSB PDB": "rcsb",
  "UniProt": "uniprot",
  "AlphaFold": "alphafold",
  
  // Programming
  "Python": "python",
  "MySQL": "mysql",
  "React": "react",
  "Node.js": "nodedotjs",
};

const skillCategories = [

  { 
    title: "MD Simulation", 
    icon: <Dna size={18} strokeWidth={1.5} />, 
    items: ["GROMACS", "NAMD", "VMD", "PyMOL", "Discovery Studio"],
    tagline: "Simulate biomolecular dynamics in silico",
    description: "Run and analyze molecular dynamics simulations to study protein stability, conformational changes, and interactions under physiological conditions."
  },
  { 
    title: "Molecular Docking", 
    icon: <Beaker size={18} strokeWidth={1.5} />, 
    items: ["Schrödinger", "AutoDock Vina", "iGEMDock", "SwissDock"],
    tagline: "Predict molecular interactions with precision",
    description: "Leverage industry-standard docking tools to predict binding affinities, visualize protein-ligand interactions, and drive structure-based drug discovery."
  },
  { 
    title: "ADMET & Modelling", 
    icon: <TestTube size={18} strokeWidth={1.5} />, 
    items: ["SwissADME", "SwissTargetPrediction", "SwissModelling"],
    tagline: "Predict properties before synthesis",
    description: "Evaluate absorption, distribution, metabolism, excretion, toxicity, and target interactions to prioritize lead compounds for drug development."
  },

  { 
    title: "Cheminformatics", 
    icon: <Atom size={18} strokeWidth={1.5} />, 
    items: ["Chem2D", "Chem3D", "RDKit", "Ligplot+", "PubChem", "ChEMBL", "RCSB PDB", "UniProt", "AlphaFold"],
    tagline: "Unlock the chemical information space",
    description: "Access, analyze, and visualize chemical and biological data from comprehensive databases for drug discovery and cheminformatics research."
  },
  { 
    title: "Programming", 
    icon: <Code size={18} strokeWidth={1.5} />, 
    items: ["Python", "MySQL", "React", "Node.js"],
    tagline: "Build robust scientific applications",
    description: "Develop scalable web platforms and automation pipelines for computational drug discovery, cheminformatics, and bioinformatics workflows."
  },
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  // Collect unique icons for the marquee to avoid redundancy
  const uniqueSkillsList = Array.from(new Set(skillCategories.flatMap(c => c.items)));
  const marqueeItems = [...uniqueSkillsList, ...uniqueSkillsList]; // Double for seamless loop

  return (
    <section id="skills" className="py-24 px-6 md:px-10 bg-[#ffffff] relative border-t border-border/30 overflow-hidden">
      <div className="max-w-[1300px] mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold text-[#202124] tracking-tight leading-tight" style={{ fontFamily: "Google Sans Display, sans-serif" }}>
              Computational drug discovery & development toolkit
            </h2>
          </div>
        </RevealOnScroll>

        {/* Brand Icon Marquee - "Icons for respective library/tool/framework" */}
        <RevealOnScroll>
          <div className="overflow-hidden mb-24 py-10 border-y border-[#f1f3f4]">
            <div className="flex animate-marquee whitespace-nowrap items-center h-16">
              {marqueeItems.map((skill, i) => {
                const slug = skillIcons[skill];
                if (!slug) return null;
                
                return (
                  <div key={i} className="flex items-center gap-2 mx-12 group cursor-pointer">
                    <div className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <img 
                        src={`https://cdn.simpleicons.org/${slug}`} 
                        alt={skill}
                        className="max-w-full max-h-full object-contain grayscale-[0.2] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                        style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.05))" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>

        {/* 3-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start min-h-[500px]">
          
          {/* Column 1: Vertical Tabs (Left) */}
          <div className="w-full lg:w-[280px] flex flex-col gap-2">
            {skillCategories.map((cat, i) => (
              <button
                key={cat.title}
                onClick={() => setActiveCategory(i)}
                className={`flex items-center gap-4 text-[15px] px-6 py-4 rounded-full border transition-all duration-300 font-medium ${activeCategory === i
                    ? "bg-[#202124] text-white border-[#202124] shadow-lg shadow-black/10"
                    : "bg-background border-[#dadce0] text-[#5f6368] hover:bg-[#f8f9fa] hover:border-[#bdc1c6] hover:text-[#202124]"
                  }`}
              >
                <div className={`${activeCategory === i ? "text-[hsl(var(--google-blue))]" : "text-[#5f6368]"}`}>
                  {cat.icon}
                </div>
                <span>{cat.title}</span>
                {activeCategory === i && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[hsl(var(--google-blue))]" />
                )}
              </button>
            ))}
          </div>

          {/* Column 2: Dynamic Visual (Center) */}
          <div className="flex-1 w-full max-w-[500px] h-[350px] md:h-[450px] relative flex items-center justify-center p-6 bg-white border border-[#dadce0] rounded-[32px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f8f9fa] to-white" />
            
            {/* Skill Hub - Animates based on active tab */}
            <div className="relative z-10 w-full grid grid-cols-2 md:grid-cols-3 gap-4">
              {skillCategories[activeCategory].items.slice(0, 9).map((item, i) => (
                <div 
                  key={`${activeCategory}-${item}`}
                  className="bg-white border border-[#dadce0] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#f1f3f4] flex items-center justify-center mb-3">
                    {skillIcons[item] ? (
                      <img 
                        src={`https://cdn.simpleicons.org/${skillIcons[item]}`} 
                        alt={item}
                        className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <Cpu size={14} className="text-[hsl(var(--google-blue))]" />
                    )}
                  </div>
                  <span className="text-[12px] font-bold text-[#202124] leading-tight">{item}</span>
                </div>
              ))}
            </div>

            {/* Decorative Google Dots */}
            <div className="absolute top-6 left-6 flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#4285F4]" />
              <div className="w-2 h-2 rounded-full bg-[#EA4335]" />
              <div className="w-2 h-2 rounded-full bg-[#FBBC05]" />
              <div className="w-2 h-2 rounded-full bg-[#34A853]" />
            </div>
          </div>

          {/* Column 3: Narrative Text (Right) */}
          <div className="w-full lg:w-[350px] flex flex-col justify-center text-left py-4 pt-10 lg:pt-20">
            <RevealOnScroll>
              <h3 className="text-[32px] md:text-[40px] font-bold text-[#202124] leading-[1.2] mb-6 animate-in fade-in slide-in-from-right-8 duration-500" style={{ fontFamily: "Google Sans Display, sans-serif" }}>
                {skillCategories[activeCategory].tagline}
              </h3>
              <p className="text-[16px] text-[#5f6368] leading-relaxed mb-8 animate-in fade-in slide-in-from-right-8 duration-700">
                {skillCategories[activeCategory].description}
              </p>
              
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--google-blue))]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--google-red))]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--google-yellow))]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--google-green))]" />
              </div>
            </RevealOnScroll>
          </div>

        </div>

      
      </div>
    </section>
  );
};

export default Skills;