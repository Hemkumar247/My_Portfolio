"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const tags = [
  "AI/ML",
  "Multimodal AI",
  "React Native",
  "Next.js",
  "UI/UX Design",
  "Firebase",
  "Product Thinking",
  "Graphic Design",
  "FastAPI",
  "Three.js",
  "Open Source",
  "TypeScript",
  "Vertex AI",
  "Figma",
];

export default function About() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="section-shell" style={{ zIndex: 1 }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "8%",
          right: "6%",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(91, 94, 244, 0.18) 0%, rgba(91, 94, 244, 0.04) 35%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      <div className="container-shell">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 28,
            alignItems: "start",
            marginBottom: 34,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="section-label" style={{ marginBottom: 20 }}>
              — Who is Hem
            </div>
            <h2
              className="font-clash"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.05em",
                maxWidth: 620,
              }}
            >
              Pre-final year CSE student at
              <span className="accent" style={{ display: "block" }}>
                Rajalakshmi Institute of Technology
              </span>
              building at the intersection of AI, design, and product.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="glass"
            style={{
              borderRadius: 24,
              padding: "28px 26px",
              background:
                "linear-gradient(180deg, rgba(19, 19, 26, 0.76), rgba(19, 19, 26, 0.5))",
            }}
          >
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.03rem",
                lineHeight: 1.95,
              }}
            >
              From winning national hackathons to earning a Government of India
              copyright, I don&apos;t just write code. I craft experiences. I&apos;m
              a UI/UX designer who freelances in graphic design, and a developer
              who thinks in systems. Whether it&apos;s a multimodal AI pipeline or a
              pixel-perfect interface, I build things that impress.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.16 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          {tags.map((tag, index) => (
            <div
              key={tag}
              className="tag-pill"
              style={{
                transform: `translateY(${index % 3 === 0 ? 0 : index % 3 === 1 ? 6 : -4}px)`,
              }}
            >
              {tag}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
