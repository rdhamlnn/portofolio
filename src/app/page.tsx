import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import ScrollFX from "@/components/ScrollFX";
import SkillsExplorer from "@/components/SkillsExplorer";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <SkillsExplorer />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
