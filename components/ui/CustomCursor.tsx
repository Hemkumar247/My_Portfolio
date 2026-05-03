"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) {
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: "power3.out",
      });

      gsap.to(follower, {
        x: mouseX,
        y: mouseY,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(cursor, { scale: 0, duration: 0.2 });
      gsap.to(follower, {
        scale: 2.8,
        borderColor: "var(--accent-primary)",
        backgroundColor: "transparent",
        duration: 0.25,
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, {
        scale: 1,
        borderColor: "transparent",
        backgroundColor: "rgba(200, 255, 0, 0.16)",
        duration: 0.25,
      });
    };

    const interactiveNodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        "a, button, .btn-primary, .btn-ghost, .project-card, .design-card",
      ),
    );

    window.addEventListener("mousemove", onMouseMove);
    interactiveNodes.forEach((node) => {
      node.addEventListener("mouseenter", onMouseEnterLink);
      node.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      interactiveNodes.forEach((node) => {
        node.removeEventListener("mouseenter", onMouseEnterLink);
        node.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={followerRef}
        aria-hidden
        style={{
          position: "fixed",
          top: -16,
          left: -16,
          width: 32,
          height: 32,
          borderRadius: "999px",
          backgroundColor: "rgba(200, 255, 0, 0.16)",
          border: "1px solid transparent",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate3d(0, 0, 0)",
        }}
      />
      <div
        ref={cursorRef}
        aria-hidden
        style={{
          position: "fixed",
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: "999px",
          backgroundColor: "var(--accent-primary)",
          boxShadow: "0 0 20px rgba(200, 255, 0, 0.65)",
          pointerEvents: "none",
          zIndex: 10000,
          transform: "translate3d(0, 0, 0)",
        }}
      />
    </>
  );
}
