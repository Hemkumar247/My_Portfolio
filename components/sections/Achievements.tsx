"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const achievements = [
  {
    step: "01",
    year: "2025",
    title: "Infosys Global Hackathon 2025",
    sub: "Top 10 out of 625 teams - regional level",
    desc: "Selected from 625 teams across India and personally invited to present at the Infosys DC Annual Meetup.",
  },
  {
    step: "02",
    year: "2024",
    title: "Government of India Copyright",
    sub: "Official recognition - SignLearn",
    desc: "Awarded a Government of India copyright for SignLearn, an accessible sign language learning platform.",
  },
  {
    step: "03",
    year: "2025",
    title: "Infosys DC Annual Meetup",
    sub: "Personal invitation to present",
    desc: "One of only a handful of student developers personally invited to present work at this event.",
  },
  {
    step: "04",
    year: "2024 ->",
    title: "GDG Member + AR/VR Expert",
    sub: "Google Developer Groups - Rajalakshmi Institute of Technology",
    desc: "Part of GDG at Rajalakshmi Institute of Technology, contributing as an AR/VR expert and bringing immersive-tech energy into student developer communities.",
  },
  {
    step: "05",
    year: "2023 ->",
    title: "Event Host and Community Builder",
    sub: "Hosted events, meetups, and student community sessions",
    desc: "Led and hosted multiple events and community meetups, building spaces where students, creators, and developers could connect and share ideas.",
  },
  {
    step: "06",
    year: "2023 ->",
    title: "Freelance and Brand Creative",
    sub: "Graphic designer for client work and a clothing brand",
    desc: "Worked across freelance design projects and clothing-brand graphics, blending visual storytelling, campaign thinking, and product-focused execution.",
  },
];

export default function Achievements() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-shell" style={{ zIndex: 1 }}>
      <div className="container-shell">
        <div className="section-label" style={{ marginBottom: 18 }}>
          Recognition
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "end",
            justifyContent: "space-between",
            gap: 18,
            marginBottom: 34,
          }}
        >
          <h2
            className="font-clash"
            style={{
              fontSize: "clamp(3rem, 6vw, 5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.05em",
            }}
          >
            Built to Win.
          </h2>

          <p
            style={{
              maxWidth: 520,
              color: "var(--text-secondary)",
              lineHeight: 1.8,
            }}
          >
            A left-to-right timeline of the milestones, community roles, and
            creative wins that shaped the way I build, present, and ship work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08 }}
          style={{
            position: "relative",
          }}
        >
          <div
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              scrollSnapType: "x mandatory",
              paddingBottom: 12,
              margin: "0 calc(-1 * var(--section-gutter))",
              paddingLeft: "var(--section-gutter)",
              paddingRight: "var(--section-gutter)",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                gap: 24,
                width: "max-content",
                paddingTop: 42,
                paddingBottom: 8,
              }}
            >
              <div
                className="timeline-line"
                aria-hidden
                style={{
                  position: "absolute",
                  left: 34,
                  right: 34,
                  top: 10,
                  height: 1,
                }}
              />

              {achievements.map((achievement, index) => (
                <motion.article
                  key={achievement.title}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.14 + index * 0.08 }}
                  className="glass"
                  style={{
                    position: "relative",
                    minWidth: "clamp(300px, 34vw, 430px)",
                    width: "clamp(300px, 34vw, 430px)",
                    borderRadius: 24,
                    padding: "26px 24px 24px",
                    scrollSnapAlign: "start",
                    transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = "translateY(-6px)";
                    event.currentTarget.style.borderColor =
                      "rgba(200, 255, 0, 0.18)";
                    event.currentTarget.style.boxShadow =
                      "0 0 40px rgba(200, 255, 0, 0.08)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = "translateY(0)";
                    event.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.06)";
                    event.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: 24,
                      top: -40,
                      width: 20,
                      height: 20,
                      borderRadius: "999px",
                      border: "1px solid rgba(200, 255, 0, 0.35)",
                      background: "var(--bg-primary)",
                      boxShadow: "0 0 0 8px rgba(6, 6, 8, 1)",
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "999px",
                        background: "var(--accent-primary)",
                        margin: "5px auto 0",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 18,
                      marginBottom: 18,
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--accent-primary)",
                      }}
                    >
                      {achievement.year}
                    </span>

                    <span
                      className="font-mono"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                      }}
                    >
                      {achievement.step}
                    </span>
                  </div>

                  <h3
                    className="font-clash"
                    style={{
                      fontSize: "clamp(1.9rem, 2.5vw, 2.5rem)",
                      lineHeight: 0.96,
                      letterSpacing: "-0.04em",
                      marginBottom: 14,
                    }}
                  >
                    {achievement.title}
                  </h3>

                  <div
                    className="font-mono"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--text-secondary)",
                      marginBottom: 14,
                      maxWidth: 300,
                    }}
                  >
                    {achievement.sub}
                  </div>

                  <p
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.85,
                    }}
                  >
                    {achievement.desc}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
