"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Design", href: "#design" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    const hero = document.querySelector("#hero");

    if (!(hero instanceof HTMLElement)) {
      setInHero(false);
      return;
    }

    const updateState = () => {
      const rect = hero.getBoundingClientRect();
      setInHero(rect.bottom > 120);
    };

    updateState();

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInHero(entry.isIntersecting);
      },
      {
        threshold: 0,
      },
    );

    observer.observe(hero);
    window.addEventListener("scroll", updateState, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateState);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);

    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 18,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(1360px, calc(100% - 24px))",
          zIndex: 9997,
        }}
      >
        <div
          className={!inHero ? "glass" : undefined}
          style={{
            borderRadius: 18,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: inHero ? "transparent" : undefined,
            border: inHero
              ? "1px solid rgba(255, 255, 255, 0.02)"
              : "1px solid rgba(255, 255, 255, 0.05)",
            backdropFilter: inHero ? "none" : "blur(14px)",
            WebkitBackdropFilter: inHero ? "none" : "blur(14px)",
            boxShadow: inHero ? "none" : "0 10px 32px rgba(0, 0, 0, 0.18)",
            transition:
              "background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease",
          }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--accent-primary)",
              background: "none",
              border: "none",
            }}
          >
            HEM.
          </button>

          <div className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-mono uppercase tracking-[0.16em] text-[12px] transition-colors"
                style={{
                  color: "var(--text-secondary)",
                  background: "none",
                  border: "none",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <span
              className="pulse-dot"
              style={{
                width: 8,
                height: 8,
                borderRadius: "999px",
                background: "var(--accent-primary)",
                boxShadow: "0 0 18px rgba(200, 255, 0, 0.55)",
              }}
            />
            <button
              onClick={() => scrollTo("#contact")}
              className="font-mono uppercase tracking-[0.14em] text-[11px]"
              style={{
                color: "var(--text-secondary)",
                background: "none",
                border: "none",
              }}
            >
              Open to Work
            </button>
          </div>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden"
            style={{
              background: "none",
              border: "none",
              color: "var(--text-primary)",
              fontSize: "24px",
              lineHeight: 1,
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9996,
              background:
                "linear-gradient(180deg, rgba(6, 6, 8, 0.96), rgba(13, 13, 18, 0.96))",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "18px",
            }}
          >
            {links.map((link, index) => (
              <motion.button
                key={link.href}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
                onClick={() => scrollTo(link.href)}
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: "clamp(2.5rem, 9vw, 4rem)",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  background: "none",
                  border: "none",
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
