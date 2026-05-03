"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const designItems = [
  {
    title: "DrapeAI - App UI",
    category: "UI/UX Design",
    height: 320,
    color: "#c8ff00",
    blurb:
      "A premium mobile try-on interface crafted to make AI styling feel effortless, tactile, and cinematic.",
  },
  {
    title: "NutriSnap - Dashboard",
    category: "UI/UX Design",
    height: 420,
    color: "#22c55e",
    blurb:
      "A clean nutrition dashboard designed to turn meal analysis into fast, readable insights and daily progress.",
  },
  {
    title: "Brand Identity",
    category: "Graphic Design",
    height: 280,
    color: "#5b5ef4",
    blurb:
      "Identity explorations focused on strong visual recall, flexible systems, and premium digital presence.",
  },
  {
    title: "Mobile App Screens",
    category: "UI/UX Design",
    height: 380,
    color: "#f97316",
    blurb:
      "High-clarity mobile flows built around thumb-friendly layouts, strong hierarchy, and polished interactions.",
  },
  {
    title: "Social Media Design",
    category: "Graphic Design",
    height: 300,
    color: "#ec4899",
    blurb:
      "Campaign visuals created to stop the scroll with bold composition, contrast, and platform-native energy.",
  },
  {
    title: "Design System",
    category: "UI/UX Design",
    height: 350,
    color: "#3b82f6",
    blurb:
      "A reusable component language with tokens, spacing logic, and patterns that keep products consistent.",
  },
  {
    title: "Poster Design",
    category: "Graphic Design",
    height: 400,
    color: "#c8ff00",
    blurb:
      "Concept-led poster work blending typography, atmosphere, and motion-inspired composition for impact.",
  },
  {
    title: "Web Landing Page",
    category: "UI/UX Design",
    height: 340,
    color: "#a855f7",
    blurb:
      "Landing page concepts shaped to feel immersive, conversion-aware, and visually memorable from the first fold.",
  },
  {
    title: "Illustration Work",
    category: "Graphic Design",
    height: 290,
    color: "#22c55e",
    blurb:
      "Illustration studies that add personality, storytelling, and crafted texture across digital brand surfaces.",
  },
  {
    title: "Freelance Client Work",
    category: "Freelance Design",
    height: 300,
    color: "#14b8a6",
    blurb:
      "Client work across UI, brand kits, social creatives, and presentation assets shaped for fast-moving businesses.",
  },
  {
    title: "Clothing Brand Graphics",
    category: "Fashion Graphics",
    height: 340,
    color: "#f59e0b",
    blurb:
      "Graphic design for a clothing brand with visuals built around youth culture, product storytelling, and launch energy.",
  },
  {
    title: "Event Management",
    category: "Creative Direction",
    height: 280,
    color: "#06b6d4",
    blurb:
      "Built and ran event experiences with a focus on identity, smooth execution, audience flow, and memorable presentation.",
  },
  {
    title: "Community Meetups",
    category: "Hosting",
    height: 320,
    color: "#84cc16",
    blurb:
      "Hosted meetups and community gatherings that balanced good structure, warm energy, and real conversation.",
  },
  {
    title: "4-Language Communication",
    category: "Personal Edge",
    height: 260,
    color: "#ef4444",
    blurb:
      "Comfortable collaborating in English, Hindi, Telugu, and Tamil across clients, teams, events, and communities.",
  },
  {
    title: "Open Source Concepts",
    category: "Product Thinking",
    height: 310,
    color: "#8b5cf6",
    blurb:
      "From AI tools to browser experiments, I like giving side projects a sharp visual identity before they ship.",
  },
];

const designTags = [
  "Figma",
  "Brand Identity",
  "Social Media",
  "App UI",
  "Design Systems",
  "Poster Design",
  "Mobile UI",
  "Web Design",
  "Illustration",
  "Freelancing",
  "Fashion Graphics",
  "Event Hosting",
  "Community",
];

export default function DesignWork() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="design"
      ref={ref}
      className="section-shell"
      style={{ zIndex: 1, paddingTop: 96, paddingBottom: 112 }}
    >
      <div className="container-shell">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            alignItems: "end",
            marginBottom: 24,
          }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: 18 }}>
              Design / UI-UX / Freelance
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="font-clash"
              style={{
                fontSize: "clamp(3rem, 6vw, 5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.05em",
              }}
            >
              Design That Speaks.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.08 }}
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.9,
              maxWidth: 620,
            }}
          >
            Beyond code, I design stories, systems, and experiences from
            freelance UI/UX and clothing-brand graphics to event hosting,
            community meetups, and visual identities that feel contemporary and
            memorable.
          </motion.p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 24,
          }}
        >
          {designTags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.04 * index }}
              className="tag-pill"
            >
              {tag}
            </motion.div>
          ))}
        </div>

        <div
          style={{
            columnWidth: "280px",
            columnGap: "20px",
          }}
        >
          {designItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              className="design-card-shell"
              style={{
                breakInside: "avoid",
                marginBottom: "20px",
                height: `${item.height}px`,
                position: "relative",
                perspective: "1600px",
              }}
              whileHover={{ y: -6, scale: 1.01 }}
            >
              <div
                className="design-card-inner"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <div
                  className="design-face"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "18px",
                    background: `linear-gradient(135deg, ${item.color}10, ${item.color}04)`,
                    border: `1px solid ${item.color}22`,
                    overflow: "hidden",
                    padding: "22px",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <div
                    className="font-mono"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: item.color,
                      marginBottom: 12,
                    }}
                  >
                    {item.category}
                  </div>

                  <div
                    className="font-clash"
                    style={{
                      fontSize: "2rem",
                      lineHeight: 1,
                      maxWidth: 220,
                    }}
                  >
                    {item.title}
                  </div>

                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      right: -26,
                      bottom: -40,
                      width: 180,
                      height: 180,
                      borderRadius: "50%",
                      background: `${item.color}20`,
                      filter: "blur(8px)",
                    }}
                  />
                </div>

                <div
                  className="design-face"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "18px",
                    background: `linear-gradient(160deg, rgba(19, 19, 26, 0.94), ${item.color}10)`,
                    border: `1px solid ${item.color}30`,
                    overflow: "hidden",
                    padding: "22px",
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: `0 0 42px ${item.color}12`,
                  }}
                >
                  <div>
                    <div
                      className="font-mono"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: item.color,
                        marginBottom: 16,
                      }}
                    >
                      Quick View
                    </div>

                    <div
                      className="font-clash"
                      style={{
                        fontSize: "1.7rem",
                        lineHeight: 0.98,
                        maxWidth: 240,
                        marginBottom: 16,
                      }}
                    >
                      {item.title}
                    </div>

                    <p
                      style={{
                        color: "var(--text-secondary)",
                        lineHeight: 1.75,
                        fontSize: "0.98rem",
                        maxWidth: 260,
                      }}
                    >
                      {item.blurb}
                    </p>
                  </div>

                  <div
                    className="font-mono"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                    }}
                  >
                    Hover to flip back
                  </div>

                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: -34,
                      bottom: -44,
                      width: 190,
                      height: 190,
                      borderRadius: "50%",
                      background: `${item.color}16`,
                      filter: "blur(10px)",
                    }}
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
