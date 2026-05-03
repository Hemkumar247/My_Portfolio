"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "drapeai",
    title: "DrapeAI",
    subtitle: "AI Virtual Try-On Platform",
    description:
      "A 4-stage multimodal AI pipeline for garment analysis, photo validation, outfit compatibility scoring, and photorealistic try-on generation using Imagen 3 on Vertex AI.",
    tags: [
      "React Native",
      "FastAPI",
      "Vertex AI",
      "Gemini 2.0 Flash",
      "Imagen 3",
      "Firebase",
    ],
    github: "https://github.com/Hemkumar247/DrapeAI",
    glow: "#c8ff00",
    gradient: "linear-gradient(135deg, #0d1a0a 0%, #131a13 100%)",
  },
  {
    id: "nutrisnap",
    title: "NutriSnap",
    subtitle: "AI Nutrition Intelligence",
    description:
      "Snap a photo of your meal and AI identifies ingredients with Gemini Vision before fetching precise macro data from the USDA FoodData Central API.",
    tags: [
      "Next.js",
      "Firebase",
      "Gemini Vision",
      "USDA API",
      "Cloudinary",
      "Vercel",
    ],
    github: "https://github.com/Hemkumar247/NutriSnap",
    glow: "#22c55e",
    gradient: "linear-gradient(135deg, #0a1a0f 0%, #0d1a12 100%)",
  },
  {
    id: "signlearn",
    title: "SignLearn",
    subtitle: "Accessible Sign Language App",
    description:
      "Interactive sign language learning platform built to break communication barriers for the hearing-impaired community. Recognized with an official Government of India Copyright.",
    tags: ["EdTech", "Accessibility", "AI", "Govt. Copyright"],
    github: "#",
    glow: "#5b5ef4",
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #0d0d1f 100%)",
    badge: "Government of India Copyright",
  },
  {
    id: "rakshak",
    title: "Rakshak",
    subtitle: "Environmental Intelligence",
    description:
      "Real-time environmental monitoring and threat detection using Google Earth Engine satellite imagery and geospatial AI.",
    tags: ["Google Earth Engine", "Geospatial AI", "Python"],
    github: "#",
    glow: "#16a34a",
    gradient: "linear-gradient(135deg, #071a07 0%, #0a1a0a 100%)",
  },
  {
    id: "subtitles",
    title: "AI Subtitle Generator",
    subtitle: "Automatic Video Captioning",
    description:
      "Automated pipeline where video goes in, subtitles get generated and burned in, and Whisper plus FFmpeg handle the heavy lifting.",
    tags: ["FFmpeg", "OpenAI Whisper", "Python", "Automation"],
    github: "#",
    glow: "#f97316",
    gradient: "linear-gradient(135deg, #1a0f00 0%, #1a1200 100%)",
  },
  {
    id: "repo-explorer",
    title: "More on GitHub",
    subtitle: "Explore All Repositories",
    description:
      "Browse the full repository shelf for AI builds, design-driven experiments, developer tools, and everything else I am actively shipping.",
    tags: ["GitHub", "Open Source", "AI Projects", "Experiments"],
    github: "https://github.com/Hemkumar247?tab=repositories",
    cardHref: "https://github.com/Hemkumar247?tab=repositories",
    ctaLabel: "Explore Repositories",
    glow: "#3b82f6",
    gradient:
      "radial-gradient(circle at 76% 22%, rgba(59,130,246,0.22), transparent 28%), linear-gradient(135deg, #08111e 0%, #0b1730 54%, #091224 100%)",
  },
];

const githubMark = (
  <svg
    viewBox="0 0 98 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}
    aria-hidden
  >
    <path
      d="M48.854 0C21.84 0 0 21.84 0 48.854C0 70.463 13.99 88.801 33.405 95.27C35.85 95.725 36.734 94.212 36.734 92.92C36.734 91.738 36.68 87.82 36.68 83.676C23.101 86.563 20.268 77.151 20.268 77.151C18.043 71.506 14.845 70.021 14.845 70.021C10.423 66.987 15.176 67.043 15.176 67.043C20.103 67.389 22.693 72.105 22.693 72.105C27.06 79.584 34.202 77.442 37.011 76.214C37.448 73.048 38.708 70.92 40.099 69.706C29.264 68.477 17.87 64.288 17.87 45.572C17.87 40.214 19.787 35.848 22.897 32.416C22.392 31.186 20.708 26.227 23.363 19.52C23.363 19.52 27.474 18.21 36.607 24.356C40.548 23.262 44.778 22.713 48.854 22.693C52.93 22.713 57.161 23.262 61.121 24.356C70.235 18.21 74.346 19.52 74.346 19.52C77.02 26.227 75.336 31.186 74.832 32.416C77.96 35.848 79.837 40.214 79.837 45.572C79.837 64.344 68.423 68.457 57.549 69.666C59.292 71.164 60.878 74.112 60.878 78.616C60.878 85.08 60.823 90.958 60.823 92.92C60.823 94.227 61.706 95.75 64.173 95.268C83.569 88.797 97.708 70.459 97.708 48.854C97.708 21.84 75.868 0 48.854 0Z"
      fill="rgba(255,255,255,0.085)"
    />
  </svg>
);

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackViewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(headingRef, { once: true });

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const viewport = trackViewportRef.current;
    const track = trackRef.current;

    if (!section || !pin || !viewport || !track) {
      return;
    }

    const context = gsap.context(() => {
      const getTrackTravel = () => {
        const viewportStyles = window.getComputedStyle(viewport);
        const paddingLeft = parseFloat(viewportStyles.paddingLeft) || 0;
        const paddingRight = parseFloat(viewportStyles.paddingRight) || 0;
        const viewportContentWidth =
          viewport.clientWidth - paddingLeft - paddingRight;

        return Math.max(0, track.scrollWidth - viewportContentWidth);
      };

      const tween = gsap.to(track, {
        x: () => -getTrackTravel(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${getTrackTravel()}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{ position: "relative", zIndex: 1, paddingTop: 36 }}
    >
      <div
        ref={headingRef}
        className="container-shell"
        style={{ paddingBottom: 38 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="section-label"
          style={{ marginBottom: 18 }}
        >
          Selected Work
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.06 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "end",
            justifyContent: "space-between",
            gap: "18px",
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
            Projects That Ship.
          </h2>
          <p
            style={{
              maxWidth: 460,
              color: "var(--text-secondary)",
              lineHeight: 1.8,
            }}
          >
            Scroll through flagship AI products, accessibility builds,
            geospatial experiments, and finish at a dedicated gateway into the
            rest of my GitHub work.
          </p>
        </motion.div>
      </div>

      <div
        ref={pinRef}
        style={{
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          ref={trackViewportRef}
          style={{
            width: "100%",
            overflow: "hidden",
            padding: "0 var(--content-edge)",
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: 28,
              width: "max-content",
              willChange: "transform",
            }}
          >
          {projects.map((project, index) => {
            const isRepoCard = project.id === "repo-explorer";

            return (
              <div
                key={project.id}
                className="project-card"
                style={{
                  width: "clamp(320px, 34vw, 460px)",
                  minWidth: "clamp(320px, 34vw, 460px)",
                  height: "600px",
                  borderRadius: "24px",
                  background: project.gradient,
                  border: `1px solid ${project.glow}18`,
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                  transition:
                    "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
                  cursor: project.cardHref ? "pointer" : undefined,
                  willChange: "transform",
                }}
                onClick={() => {
                  if (project.cardHref) {
                    window.open(project.cardHref, "_blank", "noopener,noreferrer");
                  }
                }}
                onKeyDown={(event) => {
                  if (
                    project.cardHref &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    window.open(project.cardHref, "_blank", "noopener,noreferrer");
                  }
                }}
                role={project.cardHref ? "link" : undefined}
                tabIndex={project.cardHref ? 0 : undefined}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform = "translateY(-8px)";
                  event.currentTarget.style.boxShadow = `0 0 60px ${project.glow}25`;
                  event.currentTarget.style.borderColor = `${project.glow}55`;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = "translateY(0)";
                  event.currentTarget.style.boxShadow = "none";
                  event.currentTarget.style.borderColor = `${project.glow}18`;
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    width: isRepoCard ? 340 : 260,
                    height: isRepoCard ? 340 : 260,
                    top: isRepoCard ? -120 : -80,
                    right: isRepoCard ? -90 : -60,
                    borderRadius: "50%",
                    background: `${project.glow}15`,
                    filter: "blur(18px)",
                  }}
                />

                <div
                  style={{
                    height: 192,
                    borderRadius: 18,
                    border: `1px solid ${project.glow}22`,
                    background: isRepoCard
                      ? "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))"
                      : "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isRepoCard ? (
                    <>
                      <div
                        aria-hidden
                        style={{
                          position: "absolute",
                          inset: 18,
                          opacity: 0.95,
                        }}
                      >
                        {githubMark}
                      </div>
                      <div
                        className="font-mono"
                        style={{
                          position: "absolute",
                          left: 22,
                          bottom: 18,
                          fontSize: "11px",
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.55)",
                        }}
                      >
                        github / repositories
                      </div>
                    </>
                  ) : (
                    <div
                      className="font-clash"
                      style={{
                        fontSize: "6rem",
                        fontWeight: 700,
                        color: project.glow,
                        opacity: 0.85,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  )}

                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: "auto 0 0",
                      height: "42%",
                      background:
                        "linear-gradient(180deg, transparent, rgba(6, 6, 8, 0.45))",
                    }}
                  />
                </div>

                <div>
                  {project.badge ? (
                    <div
                      className="font-mono"
                      style={{
                        display: "inline-flex",
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        padding: "6px 10px",
                        borderRadius: 999,
                        background: "rgba(255, 255, 255, 0.06)",
                        color: "var(--text-primary)",
                        marginBottom: 16,
                      }}
                    >
                      {project.badge}
                    </div>
                  ) : null}

                  <div
                    className="font-clash"
                    style={{
                      fontSize: "2rem",
                      lineHeight: 1,
                      marginBottom: 10,
                    }}
                  >
                    {project.title}
                  </div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: "12px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: project.glow,
                      marginBottom: 16,
                    }}
                  >
                    {project.subtitle}
                  </div>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.8,
                      marginBottom: 20,
                    }}
                  >
                    {project.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {project.tags.map((tag) => (
                      <div key={tag} className="tag-pill">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>

                {project.github !== "#" ? (
                  isRepoCard ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      style={{
                        textDecoration: "none",
                        alignSelf: "flex-start",
                      }}
                    >
                      <span
                        className="font-mono"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "14px 20px",
                          borderRadius: 999,
                          background:
                            "linear-gradient(135deg, rgba(59,130,246,0.95), rgba(91,94,244,0.9))",
                          color: "#f5f5f0",
                          fontSize: "11px",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          boxShadow: "0 14px 32px rgba(59,130,246,0.28)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        Explore Repositories
                        <span style={{ fontSize: "15px", lineHeight: 1 }}>↗</span>
                      </span>
                    </a>
                  ) : (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono"
                      onClick={(event) => event.stopPropagation()}
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--text-primary)",
                        textDecoration: "none",
                      }}
                    >
                      View on GitHub -&gt;
                    </a>
                  )
                ) : (
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "12px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                    }}
                  >
                    Private / Showcase Project
                  </span>
                )}
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
