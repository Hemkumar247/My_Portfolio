import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import DesignWork from "@/components/sections/DesignWork";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <main style={{ position: "relative", background: "var(--bg-primary)" }}>
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 20% 15%, rgba(91, 94, 244, 0.16), transparent 30%), radial-gradient(circle at 82% 22%, rgba(200, 255, 0, 0.12), transparent 28%), radial-gradient(circle at 50% 78%, rgba(91, 94, 244, 0.14), transparent 35%)",
          zIndex: 0,
        }}
      />
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Achievements />
      <DesignWork />
      <Contact />
      <Footer />
    </main>
  );
}
