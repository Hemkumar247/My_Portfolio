"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const contactLinks = [
  {
    label: "hemkumarvitta@gmail.com",
    href: "mailto:hemkumarvitta@gmail.com",
    note: "Email",
  },
  {
    label: "linkedin.com/in/hemkumarvitta",
    href: "https://linkedin.com/in/hemkumarvitta",
    note: "LinkedIn",
  },
  {
    label: "github.com/Hemkumar247",
    href: "https://github.com/Hemkumar247",
    note: "GitHub",
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = () => {
    const subject = encodeURIComponent(
      `Portfolio Contact from ${form.name || "Anonymous"}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );

    window.location.href = `mailto:hemkumarvitta@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="section-shell"
      style={{ zIndex: 1, paddingTop: 96, paddingBottom: 112 }}
    >
      <div className="container-shell">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 28,
            alignItems: "start",
            marginBottom: 24,
          }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: 18 }}>
              Get In Touch
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="font-clash"
              style={{
                fontSize: "clamp(3.4rem, 7vw, 6rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.05em",
                marginBottom: 20,
              }}
            >
              <span style={{ display: "block" }}>LET&apos;S</span>
              <span style={{ display: "block" }}>BUILD</span>
              <span className="accent" style={{ display: "block" }}>
                SOMETHING.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08 }}
              style={{
                color: "var(--text-secondary)",
                fontSize: "1rem",
                lineHeight: 1.9,
                maxWidth: 520,
                marginBottom: 20,
              }}
            >
              Open to internships, freelance work, and ambitious collaborations.
              If you are building something sharp, thoughtful, or AI-native, I
              would love to talk design, product, and code.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.14 }}
              className="glass"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                borderRadius: 999,
                padding: "12px 16px",
                color: "var(--text-secondary)",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "var(--accent-primary)",
                  boxShadow: "0 0 18px rgba(200, 255, 0, 0.45)",
                }}
              />
              <span>Currently based in Chennai, India</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="glass"
            style={{
              borderRadius: 26,
              padding: "28px",
              minHeight: 360,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {mounted ? (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 14,
                    marginBottom: 14,
                  }}
                >
                  <input
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                  />
                  <input
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(event) =>
                      setForm({ ...form, email: event.target.value })
                    }
                  />
                </div>

                <motion.textarea
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.2 }}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(event) =>
                    setForm({ ...form, message: event.target.value })
                  }
                  rows={6}
                  style={{ marginBottom: 16, resize: "vertical" }}
                />

                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleSubmit}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {sent ? "Message Opened in Mail" : "Send Message ->"}
                </button>
              </>
            ) : (
              <div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--accent-primary)",
                    marginBottom: 14,
                  }}
                >
                  Direct Contact
                </div>
                <div
                  className="font-clash"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    lineHeight: 0.96,
                    marginBottom: 14,
                  }}
                >
                  Reach out and let&apos;s start the conversation.
                </div>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.8,
                    marginBottom: 20,
                    maxWidth: 420,
                  }}
                >
                  The interactive form will appear after the page finishes
                  hydrating. You can still email directly right now.
                </p>
                <a
                  href="mailto:hemkumarvitta@gmail.com"
                  className="btn-ghost"
                  style={{ textDecoration: "none", width: "fit-content" }}
                >
                  Email Hemkumar
                </a>
              </div>
            )}
          </motion.div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {contactLinks.map((contact, index) => (
            <motion.a
              key={contact.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 + index * 0.06 }}
              href={contact.href}
              target="_blank"
              rel="noreferrer"
              className="glass"
              style={{
                borderRadius: 20,
                padding: "18px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                textDecoration: "none",
                color: "var(--text-secondary)",
                transition: "color 0.2s, border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.color = "var(--accent-primary)";
                event.currentTarget.style.borderColor = "rgba(200, 255, 0, 0.2)";
                event.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.color = "var(--text-secondary)";
                event.currentTarget.style.borderColor = "var(--border)";
                event.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {contact.note}
              </span>
              <span className="font-mono" style={{ fontSize: "12px" }}>
                {contact.label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
