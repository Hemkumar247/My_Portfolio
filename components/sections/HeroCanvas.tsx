"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 386;
const FRAME_DIGITS = 3;
const FRAME_PHASE_END = 0.68;
const MOBILE_FRAME_PHASE_END = 0.6;

function getCoverSize(
  viewportWidth: number,
  viewportHeight: number,
  imageWidth: number,
  imageHeight: number,
) {
  const viewportAspect = viewportWidth / viewportHeight;
  const imageAspect = imageWidth / imageHeight;

  if (viewportAspect > imageAspect) {
    return {
      width: viewportWidth,
      height: viewportWidth / imageAspect,
    };
  }

  return {
    width: viewportHeight * imageAspect,
    height: viewportHeight,
  };
}

function drawPlaceholder(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#111319");
  gradient.addColorStop(1, "#060608");

  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(200, 255, 0, 0.18)";
  context.lineWidth = 2;
  context.strokeRect(28, 28, width - 56, height - 56);

  context.fillStyle = "rgba(245, 245, 240, 0.8)";
  context.font = "600 18px Syne, sans-serif";
  context.fillText("Loading hero frames...", 38, 64);
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let isMounted = true;
    let animationFrame = 0;
    let trigger: ScrollTrigger | null = null;
    let viewportWidth = 0;
    let viewportHeight = 0;
    let devicePixelRatio = 1;
    let targetFrameValue = 0;
    let smoothFrameValue = 0;
    let mouseX = 0;
    let mouseY = 0;
    let renderOffsetX = 0;
    let renderOffsetY = 0;
    let hasFinePointer = false;

    const images = new Array<HTMLImageElement | null>(FRAME_COUNT).fill(null);
    const loadedFlags = new Array<boolean>(FRAME_COUNT).fill(false);

    const getFileName = (index: number) =>
      `${String(index + 1).padStart(FRAME_DIGITS, "0")}.png`;

    const resizeCanvas = () => {
      viewportWidth = canvas.clientWidth;
      viewportHeight = canvas.clientHeight;
      hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      devicePixelRatio = Math.min(
        window.devicePixelRatio || 1,
        viewportWidth < 768 ? 1.35 : 2,
      );

      canvas.width = Math.max(1, Math.round(viewportWidth * devicePixelRatio));
      canvas.height = Math.max(1, Math.round(viewportHeight * devicePixelRatio));
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const findClosestLoadedFrame = (targetIndex: number) => {
      if (loadedFlags[targetIndex]) {
        return images[targetIndex];
      }

      for (let offset = 1; offset < FRAME_COUNT; offset += 1) {
        const backward = targetIndex - offset;

        if (backward >= 0 && loadedFlags[backward]) {
          return images[backward];
        }

        const forward = targetIndex + offset;

        if (forward < FRAME_COUNT && loadedFlags[forward]) {
          return images[forward];
        }
      }

      return null;
    };

    const drawFrame = (time: number) => {
      context.clearRect(0, 0, viewportWidth, viewportHeight);

      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(smoothFrameValue)),
      );
      const image = findClosestLoadedFrame(frameIndex);

      if (!image) {
        drawPlaceholder(context, viewportWidth, viewportHeight);
        return;
      }

      const imageWidth = image.naturalWidth || 1;
      const imageHeight = image.naturalHeight || 1;
      const coverSize = getCoverSize(
        viewportWidth,
        viewportHeight,
        imageWidth,
        imageHeight,
      );
      const isMobileViewport = viewportWidth < 768;
      const baseOffsetX = viewportWidth > 1024 ? viewportWidth * 0.1 : 0;
      const targetOffsetX = hasFinePointer ? baseOffsetX + mouseX * 24 : baseOffsetX;
      const targetOffsetY = hasFinePointer && !isMobileViewport ? mouseY * -16 : 0;

      renderOffsetX += (targetOffsetX - renderOffsetX) * 0.04;
      renderOffsetY += (targetOffsetY - renderOffsetY) * 0.04;

      const scrollScale = 1 + smoothFrameValue * (isMobileViewport ? 0.0012 : 0.0018);
      const idleScale = 1 + Math.sin(time * 0.00045) * 0.008;
      const drawWidth = coverSize.width * scrollScale * idleScale;
      const drawHeight = coverSize.height * scrollScale * idleScale;
      const drawX = (viewportWidth - drawWidth) / 2 + renderOffsetX;
      const drawY = (viewportHeight - drawHeight) / 2 + renderOffsetY;

      context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
    };

    const tick = (time: number) => {
      animationFrame = window.requestAnimationFrame(tick);
      smoothFrameValue += (targetFrameValue - smoothFrameValue) * 0.08;
      drawFrame(time);
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      resizeCanvas();
      drawFrame(performance.now());
    };

    const loadFrames = () => {
      for (let index = 0; index < FRAME_COUNT; index += 1) {
        const image = new Image();
        image.decoding = "async";
        image.loading = "eager";
        image.src = `/frames/${getFileName(index)}`;

        image.onload = () => {
          if (!isMounted) {
            return;
          }

          images[index] = image;
          loadedFlags[index] = true;

          if (index === 0) {
            drawFrame(performance.now());
          }
        };

        image.onerror = () => {
          loadedFlags[index] = false;
        };
      }
    };

    resizeCanvas();
    drawPlaceholder(context, viewportWidth, viewportHeight);
    loadFrames();

    trigger = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      // Keep the frame sequence tied directly to scroll progress; Lenis
      // already provides the smooth interpolation for the overall motion.
      scrub: true,
      onUpdate: (self) => {
        const framePhaseEnd =
          viewportWidth < 768 ? MOBILE_FRAME_PHASE_END : FRAME_PHASE_END;
        const frameProgress = Math.min(self.progress / framePhaseEnd, 1);
        targetFrameValue = frameProgress * (FRAME_COUNT - 1);
      },
    });

    animationFrame = window.requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);
    if (hasFinePointer) {
      window.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      isMounted = false;
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      trigger?.kill();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
