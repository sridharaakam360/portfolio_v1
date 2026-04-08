import { Shield, Bot, Mail, Image, ShoppingBag } from "lucide-react";
import { RevealOnScroll } from "./Interactions";

const projects = [
  {
    title: "Credit Card Fraud Detection System",
    description: "Built an advanced anomaly detection pipeline to identify fraudulent credit card transactions in real-time, drastically reducing false positives and improving financial security. Highlighted by a 99.9% detection accuracy.",
    icon: <Shield size={24} strokeWidth={1.5} />,
  },
  {
    title: "Conversational AI Chatbot (RASA)",
    description: "Developed an intelligent, context-aware chatbot using the RASA open-source framework. Designed custom NLP pipelines, intent mapping, and robust entity extraction for dynamic workflows.",
    icon: <Bot size={24} strokeWidth={1.5} />,
  },
  {
    title: "AI-Powered Email Classifier",
    description: "NLP-based model to auto-classify incoming customer emails into Support, Billing, and Developer categories, routing tickets efficiently without human intervention. Achieved an 84% baseline accuracy.",
    icon: <Mail size={24} strokeWidth={1.5} />,
  },
  {
    title: "GAN Implementation",
    description: "Built a Generative Adversarial Network from scratch to generate synthetic images, proving a firm grasp on deep neural network architectures and discriminator loss functions.",
    icon: <Image size={24} strokeWidth={1.5} />,
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce marketplace featuring robust user authentication, advanced product search capabilities, and perfectly integrated Stripe payment gateways for secure checkouts.",
    icon: <ShoppingBag size={24} strokeWidth={1.5} />,
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 bg-[#ffffff] relative border-t border-border/30">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
        
        {/* Left statically positioned container matching Google Ads layout */}
        <div className="w-full lg:w-[45%] lg:sticky lg:top-[30vh] h-fit z-10 pt-4">
          <RevealOnScroll>
            {/* Contextual Over-title */}
            <p className="text-[hsl(var(--google-blue))] font-semibold tracking-wider uppercase text-sm mb-4">
              Featured projects
            </p>
            
            <h2 className="text-[40px] md:text-[52px] font-medium text-[#202124] tracking-[-0.02em] leading-[1.15] mb-6" style={{ fontFamily: "Google Sans Display, sans-serif" }}>
              What I've built
            </h2>
            
            <p className="text-[16px] text-[#5f6368] leading-[1.6] mb-8 max-w-[400px]">
              Give us an overview of the technical solutions you've engineered, upload your assets, and explore the advanced AI models and robust backend systems I've deployed.
            </p>
            
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-[#1a73e8] px-6 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-[#1b66c9] hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-offset-2">
              View all work
            </a>
          </RevealOnScroll>
        </div>

        {/* Right scrolling vertical cards - Exact Google Card styling */}
        <div className="flex-1 flex flex-col gap-6 w-full lg:pt-12 ">
          {projects.map((project, i) => (
            <RevealOnScroll key={i} delay={i * 100}>
              <div className="bg-white border text-left border-[#dadce0] rounded-[16px] p-8 shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] hover:shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] transition-shadow duration-300">
                
                {/* Light blue circular icon container */}
                <div 
                  className="w-[56px] h-[56px] rounded-full flex items-center justify-center mb-6 bg-[#e8f0fe] text-[#1a73e8]"
                >
                  {project.icon}
                </div>
                
                <h3 className="text-[24px] font-medium text-[#202124] mb-3 tracking-tight" style={{ fontFamily: "Google Sans, sans-serif" }}>
                  {project.title}
                </h3>
                
                <p className="text-[15px] text-[#5f6368] leading-[1.6]">
                  {project.description}
                </p>
                
              </div>
            </RevealOnScroll>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Projects;
