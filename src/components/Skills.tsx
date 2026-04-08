import { RevealOnScroll } from "./Interactions";
import { useState } from "react";
import { Code, Database, Wrench, Bot, Cpu, Layers, Sparkles } from "lucide-react";

const skillIcons: Record<string, string> = {
  // Languages
  "JavaScript": "javascript",
  "Python": "python",
  
  // Frameworks
  "React.js": "react",
  "Next.js": "nextdotjs",
  "Node.js": "nodedotjs",
  "Express.js": "express",
  "Laravel": "laravel",
  "TensorFlow": "tensorflow",
  "PyTorch": "pytorch",
  "Keras": "keras",
  "Rasa": "rasa",
  
  // AI/ML Concepts (Mapped to representative brands/tools)
  "Deep Learning": "deepmind",
  "CNN": "opencv", 
  
  "ANN": "intel",
  "RNN": "pytorch",
  "GAN": "tensorflow",
  "NLP": "huggingface",
  
  "Feature Engineering": "scikitlearn",
  
  // Databases
  "MongoDB": "mongodb",
  "MySQL": "mysql",
  
  // Tools
  "Git": "git",
  "JWT": "jsonwebtokens",
  "Postman": "postman",
  "Google Colab": "googlecolab",
  "Kaggle": "kaggle",
};

const skillCategories = [
  { 
    title: "AI / ML", 
    icon: <Bot size={18} strokeWidth={1.5} />, 
    items: ["Deep Learning", "CNN", "ANN", "RNN", "GAN", "NLP", "BERT", "Feature Engineering"],
    tagline: "Speak the language of performance",
    description: "Harness the power of artificial intelligence to automate complex decision-making and uncover hidden insights within your datasets."
  },
  { 
    title: "Frameworks", 
    icon: <Layers size={18} strokeWidth={1.5} />, 
    items: ["React.js", "Next.js", "Node.js", "Express.js", "Laravel", "TensorFlow", "PyTorch", "Keras", "Rasa"],
    tagline: "Build the most of your vision",
    description: "Leverage state-of-the-art frameworks to create robust, high-performance applications that scale effortlessly from day one."
  },
  { 
    title: "Languages", 
    icon: <Code size={18} strokeWidth={1.5} />, 
    items: ["JavaScript", "Python"],
    tagline: "Start with simplicity",
    description: "Write clean, maintainable, and highly efficient code that forms the solid architectural foundation of your entire software ecosystem."
  },
  { 
    title: "Databases", 
    icon: <Database size={18} strokeWidth={1.5} />, 
    items: ["MongoDB", "MySQL"],
    tagline: "Scale your data with confidence",
    description: "Architect secure, high-availability data structures that ensure your application's growth is never hampered by storage limitations."
  },
  { 
    title: "Tools", 
    icon: <Wrench size={18} strokeWidth={1.5} />, 
    items: ["Git", "JWT", "Postman", "Google Colab", "Kaggle"],
    tagline: "Efficiency through advanced tooling",
    description: "Streamline your development workflow with advanced collaborative tools that prioritize speed, security, and precision."
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
              Technical expertise gives you many ways to build
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
