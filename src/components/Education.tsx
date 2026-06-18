

import { GraduationCap, Award, BookOpen, ChevronRight } from "lucide-react";
import { RevealOnScroll } from "./Interactions";

const Education = () => {
  return (
    <section id="education" className="py-24 md:py-32 px-6 bg-[#f0f4f9] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          {/* Main Google-style Help Card */}
          <div className="bg-white rounded-[48px] md:rounded-[64px] p-8 md:p-20 shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] flex flex-col items-center text-center">
            
            {/* Top Branding Icon */}
            <div className="w-[56px] h-[56px] rounded-full bg-[#d3e3fd] flex items-center justify-center mb-8">
              <GraduationCap size={28} className="text-[#0b57d0]" />
            </div>

            {/* Central Headline & Narrative */}
            <h2 className="text-[32px] md:text-[52px] font-medium text-[#1f1f1f] tracking-tight leading-[1.1] mb-6" style={{ fontFamily: "Google Sans Display, sans-serif" }}>
              Curious about my academic foundation?
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#444746] leading-relaxed max-w-[650px] mb-12">
              Explore my advanced M.Pharm in Pharmaceutical Chemistry and my core drug discovery insights, backed by professional certifications. Together, they form my scientific pillar.
            </p>

            {/* Education "Quick Actions" Blocks */}
            <div className="grid md:grid-cols-2 gap-4 w-full max-w-4xl mb-16">
              
              {/* M.Tech Block */}
              <div className="bg-[#f8f9fa] hover:bg-[#eff4fe] border border-transparent hover:border-[#d3e3fd] rounded-[24px] p-6 text-left transition-all group cursor-default">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#0b57d0]">
                    <GraduationCap size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-[#1f1f1f] text-[17px]">M.Pharm in Pharmaceutical Chemistry</h3>
                      <span className="text-[12px] font-bold text-[#0b57d0] bg-[#e8f0fe] px-2.5 py-0.5 rounded-full">CGPA: 9.1</span>
                    </div>
                    <p className="text-[14px] text-[#444746] mb-3">Sri Shanmugha College of Pharmacy, Salem, TamilNadu</p>
                    <div className="flex items-center text-[13px] font-medium text-[#0b57d0]">
                      Aug 2024 – 2026
                    </div>
                  </div>
                </div>
              </div>

              {/* HSC Block */}
              <div className="bg-[#f8f9fa] hover:bg-[#eff4fe] border border-transparent hover:border-[#d3e3fd] rounded-[24px] p-6 text-left transition-all group cursor-default">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#0b57d0]">
                    <BookOpen size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-[#1f1f1f] text-[17px]">Bachelor of Pharmacy (B.Pharm)</h3>
                      <span className="text-[12px] font-bold text-[#0b57d0] bg-[#e8f0fe] px-2.5 py-0.5 rounded-full">CGPA: 8.3</span>
                    </div>
                    <p className="text-[14px] text-[#444746] mb-3">Sri Shanmugha College of Pharmacy, Salem, TamilNadu</p>
                    <div className="flex items-center text-[13px] font-medium text-[#0b57d0]">
                      2020 – 2024
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Certifications Bottom Tray */}
            <div className="w-full max-w-4xl border-t border-[#f1f3f4] pt-12">
              <div className="flex items-center justify-between mb-8 px-4">
                <h3 className="text-[20px] font-bold text-[#1f1f1f] flex items-center gap-3">
                  <Award className="text-[#0b57d0]" size={22} />
                  Professional Certifications
                </h3>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Computer-Aided Drug Design & Molecular Docking (Coursera)",
                  "Advanced Cheminformatics in Drug Discovery (Workshop)",
                  "Spectral Analysis & Structure Elucidation (Self-Learning)",
                ].map((cert, i) => (
                  <button 
                    key={i}
                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#dadce0] bg-white text-[14px] font-medium text-[#1f1f1f] hover:bg-[#f8f9fa] transition-colors shadow-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0b57d0]" />
                    {cert}
                    <ChevronRight size={14} className="text-[#444746]" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Education;