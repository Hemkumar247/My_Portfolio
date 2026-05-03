"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const HERO_SECTION_HEIGHT_VH = 450;
const FRAME_PHASE_END = 0.68;
// Finish the copy reveal well before the hero unpins so the last
// cinematic frames can hold without competing with the next section.
const REVEAL_COMPLETE_BY = FRAME_PHASE_END * 0.58;
const TEXT_REVEAL_START = 0.02;
const LINE_REST_Y_PERCENT = -4;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: {
    delay: delay + 2.8,
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

const aboutLines = [
  { text: "Creative" },
  { text: "developer", accent: true },
];

const aboutTagRows = [
  [
    "AI/ML",
    "Multimodal AI",
    "React Native",
    "Next.js",
    "UI/UX Design",
    "Firebase",
    "Product Thinking",
  ],
  [
    "FastAPI",
    "Three.js",
    "Open Source",
    "TypeScript",
    "Vertex AI",
    "Figma",
    "Graphic Design",
  ],
];

const mobileAboutTags = [
  "AI/ML",
  "Multimodal AI",
  "React Native",
  "Next.js",
  "TypeScript",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const aboutShellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const context = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".about-line");
      const pills = gsap.utils.toArray<HTMLElement>(".about-pill");
      const card = section.querySelector<HTMLElement>(".about-card");
      const orbit = section.querySelector<HTMLElement>(".about-orbit");
      const revealWindow = REVEAL_COMPLETE_BY - TEXT_REVEAL_START;

      gsap.set(aboutShellRef.current, { autoAlpha: 0 });
      gsap.set(lines, { yPercent: 114 });
      gsap.set(pills, { y: 28, autoAlpha: 0 });
      gsap.set(card, { x: -120, autoAlpha: 0 });
      gsap.set(orbit, { scale: 0.65, autoAlpha: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            // Lenis already smooths the scroll signal, so keep the text
            // locked to scroll progress instead of adding extra lag here.
            scrub: true,
          },
        })
        .to(
          introRef.current,
          {
            yPercent: -20,
            autoAlpha: 0,
            filter: "blur(12px)",
            duration: revealWindow * 0.3,
            ease: "none",
          },
          TEXT_REVEAL_START,
        )
        .to(
          aboutShellRef.current,
          {
            autoAlpha: 1,
            duration: revealWindow * 0.14,
            ease: "none",
          },
          TEXT_REVEAL_START + revealWindow * 0.05,
        )
        .to(
          lines,
          {
            yPercent: LINE_REST_Y_PERCENT,
            duration: revealWindow * 0.42,
            stagger: revealWindow * 0.08,
            ease: "none",
          },
          TEXT_REVEAL_START + revealWindow * 0.08,
        )
        .to(
          card,
          {
            x: 0,
            autoAlpha: 1,
            duration: revealWindow * 0.16,
            ease: "none",
          },
          TEXT_REVEAL_START + revealWindow * 0.34,
        )
        .to(
          orbit,
          {
            scale: 1,
            autoAlpha: 1,
            duration: revealWindow * 0.1,
            ease: "none",
          },
          TEXT_REVEAL_START + revealWindow * 0.42,
        )
        .to(
          pills,
          {
            y: 0,
            autoAlpha: 1,
            duration: revealWindow * 0.1,
            stagger: revealWindow * 0.004,
            ease: "none",
          },
          TEXT_REVEAL_START + revealWindow * 0.24,
        );
    }, section);

    return () => context.revert();
  }, []);

  const scrollTo = (selector: string) => {
    const target = document.querySelector(selector);

    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section"
      style={{
        position: "relative",
        minHeight: `var(--hero-section-height, ${HERO_SECTION_HEIGHT_VH}vh)`,
        zIndex: 1,
      }}
    >
      <div
        id="about"
        aria-hidden
        style={{
          position: "absolute",
          top: "var(--hero-about-anchor-top, 125vh)",
          width: 1,
          height: 1,
          pointerEvents: "none",
        }}
      />

      <div
        className="hero-stage"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <HeroCanvas />

        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(6, 6, 8, 0.82) 0%, rgba(6, 6, 8, 0.58) 24%, rgba(6, 6, 8, 0.24) 55%, rgba(6, 6, 8, 0.42) 100%)",
          }}
        />

        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 14% 46%, rgba(200, 255, 0, 0.1), transparent 22%), radial-gradient(circle at 82% 18%, rgba(91, 94, 244, 0.14), transparent 24%), linear-gradient(180deg, rgba(6, 6, 8, 0.05) 0%, rgba(6, 6, 8, 0.28) 100%)",
          }}
        />

        <div
          className="hero-stage-inner"
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            width: "min(1440px, 100%)",
            margin: "0 auto",
            padding: "var(--hero-stage-padding)",
            display: "flex",
          }}
        >
          <div
            ref={introRef}
            className="hero-intro"
            style={{ maxWidth: "var(--hero-intro-max-width)" }}
          >
            <motion.h1
              {...fadeUp(0.1)}
              className="font-clash hero-title"
              style={{
                marginBottom: "var(--hero-title-margin-bottom)",
                maxWidth: "var(--hero-title-max-width)",
              }}
            >
              <span style={{ display: "block" }}>I BUILD</span>
              <span className="accent" style={{ display: "block" }}>
                THINGS
              </span>
              <span style={{ display: "block" }}>THAT FEEL</span>
              <span style={{ display: "block" }}>ALIVE.</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.22)}
              style={{
                maxWidth: "var(--hero-body-max-width)",
                color: "var(--text-secondary)",
                fontSize: "var(--hero-body-size)",
                lineHeight: 1.8,
                marginBottom: "var(--hero-body-margin-bottom)",
              }}
            >
              AI Engineer | UI/UX Designer | Creative Developer | Freelance
              Graphic Designer
            </motion.p>

            <motion.div
              {...fadeUp(0.3)}
              className="hero-actions"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--hero-action-gap)",
                marginBottom: "var(--hero-action-margin-bottom)",
              }}
            >
              <button className="btn-primary" onClick={() => scrollTo("#work")}>
                View My Work -
              </button>
              <button className="btn-ghost" onClick={() => scrollTo("#contact")}>
                Let&apos;s Talk
              </button>
            </motion.div>

            <motion.div
              {...fadeUp(0.38)}
              className="hero-socials"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--hero-social-gap)",
              }}
            >
              {[
                { label: "GitHub", href: "https://github.com/Hemkumar247" },
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/hemkumarvitta",
                },
                {
                  label: "Email",
                  href: "mailto:hemkumarvitta@gmail.com",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono"
                  style={{
                    fontSize: "var(--hero-social-font-size)",
                    letterSpacing: "var(--hero-social-letter-spacing)",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--text-muted)",
                    paddingBottom: "2px",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = "var(--accent-primary)";
                    event.currentTarget.style.borderColor = "var(--accent-primary)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = "var(--text-muted)";
                    event.currentTarget.style.borderColor = "var(--text-muted)";
                  }}
                >
                  {social.label}
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            {...fadeUp(0.54)}
            className="glass hidden xl:block"
            style={{
              marginLeft: "auto",
              alignSelf: "flex-end",
              maxWidth: 280,
              padding: 22,
              borderRadius: 18,
            }}
          >
            <div
              className="font-mono"
              style={{
                marginBottom: 12,
                fontSize: "11px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent-primary)",
              }}
            >
              Snapshot
            </div>
            <div
              className="font-clash"
              style={{
                fontSize: "3.2rem",
                lineHeight: 1,
                marginBottom: 14,
              }}
            >
              <span style={{ color: "var(--accent-primary)" }}>D</span>
              <span style={{ color: "var(--text-primary)" }}>es</span>
              <span style={{ color: "var(--accent-primary)" }}>i</span>
              <span style={{ color: "var(--text-primary)" }}>gne</span>
              <span style={{ color: "var(--accent-primary)" }}>r</span>
            </div>
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                fontSize: "0.95rem",
              }}
            >
              Infosys Global Hackathon finalist, builder of AI-first products,
              and designer of interfaces that feel cinematic.
            </p>
          </motion.div>
        </div>

        <div
          ref={aboutShellRef}
          className="hero-about-shell"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <div
            className="hero-about-inner"
            style={{
              width: "min(1440px, 100%)",
              height: "100%",
              margin: "0 auto",
              padding: "var(--hero-about-shell-padding)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <div
              className="hero-about-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "var(--hero-about-grid-columns)",
                gap: "var(--hero-about-grid-gap)",
                alignItems: "start",
                flex: 1,
              }}
            >
              <div
                className="hero-about-copy"
                style={{ maxWidth: "var(--hero-about-copy-max-width)" }}
              >
                {aboutLines.map((line) => (
                  <div
                    key={line.text}
                    className="hero-about-line-wrap"
                    style={{
                      overflow: "hidden",
                      paddingBottom:
                        "var(--hero-about-line-mask-padding-bottom)",
                      marginBottom: "var(--hero-about-line-mask-margin-bottom)",
                    }}
                  >
                    <span
                      className={`about-line font-clash ${line.accent ? "accent" : ""}`}
                      style={{
                        display: "block",
                        fontSize: "var(--hero-about-line-size)",
                        lineHeight: "var(--hero-about-line-height)",
                        letterSpacing: "-0.07em",
                      }}
                    >
                      {line.text}
                    </span>
                  </div>
                ))}

                <div
                  className="about-card glass hero-about-card hero-desktop-only"
                  style={{
                    width: "var(--hero-about-card-width)",
                    marginTop: "var(--hero-about-card-margin-top)",
                    marginLeft: 0,
                    borderRadius: "var(--hero-about-card-radius)",
                    padding: "var(--hero-about-card-padding)",
                    background:
                      "linear-gradient(180deg, rgba(19, 19, 26, 0.78), rgba(19, 19, 26, 0.52))",
                  }}
                >
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "var(--hero-about-card-body-size)",
                      lineHeight: "var(--hero-about-card-body-line-height)",
                    }}
                  >
                    From winning national hackathons to earning a Government of
                    India copyright, I don&apos;t just write code. I craft
                    experiences. I&apos;m a UI/UX designer who freelances in graphic
                    design, and a developer who thinks in systems. Whether it&apos;s
                    a multimodal AI pipeline or a pixel-perfect interface, I
                    build things that impress.
                  </p>
                </div>
              </div>

              <div />
            </div>

            <div
              className="hero-about-tags"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--hero-about-tags-gap)",
                width: "var(--hero-about-tags-width)",
                marginLeft: 0,
                marginTop: "auto",
                paddingTop: "var(--hero-about-tags-top-padding)",
              }}
            >
              <div
                className="hero-about-tags-mobile hero-mobile-only"
                style={{
                  display: "none",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                {mobileAboutTags.map((tag) => (
                  <div key={tag} className="tag-pill">
                    {tag}
                  </div>
                ))}
              </div>

              {aboutTagRows.map((row, rowIndex) => (
                <div
                  className="hero-about-tag-row hero-desktop-only"
                  key={`row-${rowIndex}`}
                  style={{
                    width: "100%",
                  }}
                >
                  {row.map((tag) => (
                    <div key={tag} className="about-pill tag-pill">
                      {tag}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div
            className="about-orbit hidden md:block"
            aria-hidden
            style={{
              position: "absolute",
              top: "33%",
              right: "18%",
              width: 18,
              height: 18,
              borderRadius: "999px",
              background: "rgba(200, 255, 0, 0.18)",
              boxShadow: "0 0 30px rgba(200, 255, 0, 0.32)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "999px",
                background: "var(--accent-primary)",
                margin: "6px auto 0",
              }}
            />
          </div>
        </div>

        <motion.div
          {...fadeUp(0.52)}
          className="hero-scroll-indicator"
          style={{
            position: "absolute",
            right: "max(24px, 4vw)",
            bottom: 30,
            alignItems: "center",
            gap: 12,
            transformOrigin: "center",
            zIndex: 4,
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: "10px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Scroll
          </span>
          <span
            className="scroll-pulse"
            style={{
              width: 1,
              height: 42,
              background:
                "linear-gradient(to bottom, rgba(200, 255, 0, 0.2), var(--accent-primary), rgba(200, 255, 0, 0.15))",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
