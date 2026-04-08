import { RevealOnScroll, AnimatedCounter } from "./Interactions";

const About = () => {
  const stats = [
    { value: 3, suffix: "+", label: "Years Coding", color: "bg-[hsl(var(--google-blue))]/10 text-[hsl(var(--google-blue))]" },
    { value: 84, suffix: "%", label: "ML Accuracy", color: "bg-[hsl(var(--google-green))]/10 text-[hsl(var(--google-green))]" },
    { value: 40, suffix: "%", label: "API Optimization", color: "bg-[hsl(var(--google-yellow))]/10 text-[hsl(var(--google-yellow))]" },
    { value: 30, suffix: "%", label: "Engagement Boost", color: "bg-[hsl(var(--google-red))]/10 text-[hsl(var(--google-red))]" },
  ];

  const highlights = [
    "MERN Stack & Next.js Developer with solid experience in full-stack web app architecture.",
    "Built scalable apps using secure authentication, REST APIs, and data modeling.",
    "Applied regression, classification, and deep learning models in real-world datasets.",
    "Created Laravel CMS with admin, payment, and frontend integration.",
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-medium mb-3">About me</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Get to know what I do</h2>
          </div>
        </RevealOnScroll>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <RevealOnScroll key={i} delay={i * 80}>
              <div className="google-elevated p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <RevealOnScroll>
            <div className="google-elevated p-8">
              <p className="text-muted-foreground text-base leading-relaxed">
                I'm a passionate Full-Stack Developer and Machine Learning Specialist currently pursuing 
                B.Tech in AI and Data Science. I specialize in building performant web applications 
                and implementing intelligent systems that solve real-world problems.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div className="space-y-3">
              {highlights.map((item, i) => (
                <div key={i} className="google-card p-4 flex gap-3 items-start group cursor-default">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default About;
