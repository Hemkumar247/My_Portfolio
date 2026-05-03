"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function LoadingScreen() {
  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeline = gsap.timeline();
    const letters = ["H", "E", "M", "."];

    if (textRef.current) {
      textRef.current.innerHTML = "";

      letters.forEach((letter, index) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.style.opacity = "0";
        span.style.transform = "translateY(16px)";
        span.style.display = "inline-block";
        textRef.current?.appendChild(span);

        timeline.to(
          span,
          {
            opacity: 1,
            y: 0,
            duration: 0.16,
            ease: "power2.out",
          },
          index * 0.12,
        );
      });
    }

    timeline.to(
      barRef.current,
      {
        width: "100%",
        duration: 1.2,
        ease: "power2.inOut",
      },
      0.55,
    );

    timeline.to(
      [topRef.current, bottomRef.current],
      {
        yPercent: (index: number) => (index === 0 ? -100 : 100),
        duration: 0.85,
        ease: "power3.inOut",
        onComplete: () => setVisible(false),
      },
      "+=0.3",
    );
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10001,
        pointerEvents: "none",
      }}
    >
      <div
        ref={topRef}
        style={{
          position: "absolute",
          inset: 0,
          height: "50%",
          background: "var(--bg-primary)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: "16px",
        }}
      >
        <div
          ref={textRef}
          className="font-clash"
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 700,
            letterSpacing: "-0.08em",
            color: "var(--text-primary)",
          }}
        />
      </div>
      <div
        ref={bottomRef}
        style={{
          position: "absolute",
          inset: "50% 0 0",
          background: "var(--bg-primary)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: "28px",
        }}
      >
        <div
          style={{
            width: "min(320px, 56vw)",
            height: "1px",
            background: "rgba(255, 255, 255, 0.1)",
            overflow: "hidden",
          }}
        >
          <div
            ref={barRef}
            style={{
              width: "0%",
              height: "100%",
              background: "var(--accent-primary)",
              boxShadow: "0 0 20px rgba(200, 255, 0, 0.45)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
