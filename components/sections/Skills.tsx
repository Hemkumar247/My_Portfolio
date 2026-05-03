"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillTiers = {
  primary: ["Next.js", "React Native", "Gemini AI", "UI/UX Design", "TypeScript"],
  systems: ["FastAPI", "Firebase", "Vertex AI", "Three.js", "GSAP", "Tailwind"],
  creative: ["Figma", "Brand Systems", "Motion Design", "Cloudinary", "n8n"],
};

export default function Skills() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="section-shell" style={{ zIndex: 1 }}>
      <div className="container-shell">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 28,
            alignItems: "end",
            marginBottom: 32,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="section-label" style={{ marginBottom: 18 }}>
              — What I Work With
            </div>
            <h2
              className="font-clash"
              style={{
                fontSize: "clamp(3rem, 6vw, 5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.05em",
              }}
            >
              Skills & Arsenal
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08 }}
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.9,
              fontSize: "1rem",
              maxWidth: 620,
            }}
          >
            I like building systems where AI, product thinking, motion, and
            visual design reinforce each other. The result is work that feels as
            polished as it performs.
          </motion.p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 18,
          }}
        >
          {[
            { title: "Primary Stack", values: skillTiers.primary },
            { title: "Systems & APIs", values: skillTiers.systems },
            { title: "Creative Toolkit", values: skillTiers.creative },
          ].map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.18 + index * 0.06 }}
              className="glass"
              style={{
                borderRadius: 22,
                padding: "22px 20px",
              }}
            >
              <div className="section-label" style={{ marginBottom: 14 }}>
                {group.title}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {group.values.map((value) => (
                  <div key={value} className="tag-pill">
                    {value}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
