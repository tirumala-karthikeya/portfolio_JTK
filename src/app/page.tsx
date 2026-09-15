import { About } from "@/components/about";
import { Achievements } from "@/components/achievements";
import { CaseStudies } from "@/components/case-studies";
import { Contact, Footer } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <CaseStudies />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
