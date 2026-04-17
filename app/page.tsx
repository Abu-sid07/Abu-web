
import { MinimalistHeroDemo } from '@/components/MinimalistHeroDemo';

import About from '@/components/ui/About';
import Skills from '@/components/ui/Skills';
import Projects from '@/components/ui/Projects';
import Experience from '@/components/ui/Experience';


export default function Home() {
  return (
    <main className="w-full">



      {/* Hero Section */}
      <section id="hero" className="h-screen w-full">
        <MinimalistHeroDemo />
      </section>

      {/* About Section */}
      <section id="about" className="w-full bg-white">
        <About />
      </section>

      {/* Skills Section */}
      <section id="skills" className="w-full">
        <Skills />
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full">
        <Projects />
      </section>

      {/* Experience & Education Section */}
      <section id="experience" className="w-full">
        <Experience />
      </section>

     



      </main>
  );
}
