"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SkillNode = {
  label: string;
  displayLines: string[];
  color: number;
  size: number;
  tier: number;
};

type NodeRecord = {
  radius: number;
  sphere: THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhongMaterial>;
  label: THREE.Sprite;
  ripple: THREE.Sprite;
  baseEmissive: number;
  rippleActive: boolean;
  rippleProgress: number;
};

const skills: SkillNode[] = [
  { label: "Next.js", displayLines: ["Next.js"], color: 0xc8ff00, size: 0.24, tier: 1 },
  {
    label: "React Native",
    displayLines: ["React", "Native"],
    color: 0xc8ff00,
    size: 0.22,
    tier: 1,
  },
  { label: "Gemini AI", displayLines: ["Gemini", "AI"], color: 0xc8ff00, size: 0.25, tier: 1 },
  {
    label: "UI/UX Design",
    displayLines: ["UI/UX", "Design"],
    color: 0xc8ff00,
    size: 0.24,
    tier: 1,
  },
  {
    label: "TypeScript",
    displayLines: ["Type", "Script"],
    color: 0xc8ff00,
    size: 0.21,
    tier: 1,
  },
  { label: "Firebase", displayLines: ["Firebase"], color: 0x5b5ef4, size: 0.18, tier: 2 },
  { label: "FastAPI", displayLines: ["FastAPI"], color: 0x5b5ef4, size: 0.18, tier: 2 },
  { label: "Vertex AI", displayLines: ["Vertex", "AI"], color: 0x5b5ef4, size: 0.19, tier: 2 },
  { label: "Three.js", displayLines: ["Three.js"], color: 0x5b5ef4, size: 0.17, tier: 2 },
  { label: "GSAP", displayLines: ["GSAP"], color: 0x5b5ef4, size: 0.16, tier: 2 },
  { label: "Tailwind", displayLines: ["Tailwind"], color: 0x5b5ef4, size: 0.18, tier: 2 },
  { label: "Figma", displayLines: ["Figma"], color: 0x444456, size: 0.15, tier: 3 },
  { label: "n8n", displayLines: ["n8n"], color: 0x444456, size: 0.13, tier: 3 },
  {
    label: "Cloudinary",
    displayLines: ["Cloudi", "nary"],
    color: 0x444456,
    size: 0.14,
    tier: 3,
  },
  {
    label: "Framer Motion",
    displayLines: ["Framer", "Motion"],
    color: 0x444456,
    size: 0.15,
    tier: 3,
  },
];

function createLabelTexture(skill: SkillNode) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;

  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  const textColor = skill.tier === 1 ? "#091006" : "#f5f5f0";
  const fontSize =
    skill.displayLines.length > 1 ? (skill.tier === 1 ? 52 : 48) : skill.tier === 1 ? 60 : 54;
  const lineHeight = fontSize * 0.9;
  const totalHeight = skill.displayLines.length * lineHeight;
  const startY = canvas.height / 2 - totalHeight / 2 + lineHeight * 0.8;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = `700 ${fontSize}px Arial`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = textColor;
  context.shadowColor = "rgba(0, 0, 0, 0.35)";
  context.shadowBlur = 12;

  skill.displayLines.forEach((line, index) => {
    context.fillText(line, canvas.width / 2, startY + index * lineHeight);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function createRippleTexture(color: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;

  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  const hex = `#${color.toString(16).padStart(6, "0")}`;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = hex;
  context.lineWidth = 10;
  context.shadowColor = hex;
  context.shadowBlur = 24;
  context.beginPath();
  context.arc(canvas.width / 2, canvas.height / 2, 92, 0, Math.PI * 2);
  context.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export default function SkillsCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    let animationFrame = 0;
    let hoveredIndex = -1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / 450, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, 450);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.touchAction = "none";
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    const lineGroup = new THREE.Group();
    const nodeRecords: NodeRecord[] = [];
    const interactiveNodes: THREE.Mesh[] = [];
    const disposableTextures: THREE.Texture[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    skills.forEach((skill, index) => {
      const y = 1 - (index / (skills.length - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = golden * index;
      const x = Math.cos(theta) * radius * 3.4;
      const z = Math.sin(theta) * radius * 3.4;
      const yPos = y * 2;
      const nodeRadius = skill.size * 1.35;
      const emissiveIntensity = skill.tier === 1 ? 0.42 : skill.tier === 2 ? 0.3 : 0.16;

      const sphereMaterial = new THREE.MeshPhongMaterial({
        color: skill.color,
        emissive: skill.color,
        emissiveIntensity,
        shininess: 120,
      });

      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(nodeRadius, 26, 26),
        sphereMaterial,
      );
      sphere.position.set(x, yPos, z);
      sphere.userData.nodeIndex = index;
      group.add(sphere);

      const labelTexture = createLabelTexture(skill);
      disposableTextures.push(labelTexture);
      const label = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: labelTexture,
          transparent: true,
          depthWrite: false,
          depthTest: false,
        }),
      );
      label.scale.set(nodeRadius * 2.55, nodeRadius * 2.55, 1);
      label.position.copy(sphere.position);
      label.position.z += nodeRadius + 0.04;
      label.renderOrder = 3;
      group.add(label);

      const rippleTexture = createRippleTexture(skill.color);
      disposableTextures.push(rippleTexture);
      const ripple = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: rippleTexture,
          transparent: true,
          opacity: 0,
          depthWrite: false,
          depthTest: false,
        }),
      );
      ripple.scale.set(nodeRadius * 2.6, nodeRadius * 2.6, 1);
      ripple.position.copy(sphere.position);
      ripple.position.z += nodeRadius + 0.05;
      ripple.visible = false;
      ripple.renderOrder = 4;
      group.add(ripple);

      nodeRecords.push({
        radius: nodeRadius,
        sphere,
        label,
        ripple,
        baseEmissive: emissiveIntensity,
        rippleActive: false,
        rippleProgress: 0,
      });

      interactiveNodes.push(sphere);
    });

    for (let first = 0; first < nodeRecords.length; first += 1) {
      for (let second = first + 1; second < nodeRecords.length; second += 1) {
        const distance = nodeRecords[first].sphere.position.distanceTo(
          nodeRecords[second].sphere.position,
        );

        if (distance < 3.35) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nodeRecords[first].sphere.position,
            nodeRecords[second].sphere.position,
          ]);
          const material = new THREE.LineBasicMaterial({
            color: 0x1c1c27,
            transparent: true,
            opacity: 0.72,
          });
          lineGroup.add(new THREE.Line(geometry, material));
        }
      }
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));

    const pointLight = new THREE.PointLight(0xc8ff00, 1.7, 15);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x5b5ef4, 1.1, 15);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    group.add(lineGroup);
    scene.add(group);

    let mouseX = 0;
    let mouseY = 0;

    const setPointerFromEvent = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const pickNodeIndex = (event: PointerEvent) => {
      setPointerFromEvent(event);
      raycaster.setFromCamera(pointer, camera);

      const intersections = raycaster.intersectObjects(interactiveNodes, false);
      const hit = intersections[0];

      return typeof hit?.object.userData.nodeIndex === "number"
        ? (hit.object.userData.nodeIndex as number)
        : -1;
    };

    const triggerRipple = (index: number) => {
      const node = nodeRecords[index];

      if (!node) {
        return;
      }

      const rippleMaterial = node.ripple.material as THREE.SpriteMaterial;
      node.rippleActive = true;
      node.rippleProgress = 0;
      node.ripple.visible = true;
      rippleMaterial.opacity = 0.88;
      node.ripple.scale.set(node.radius * 2.6, node.radius * 2.6, 1);
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const onPointerMove = (event: PointerEvent) => {
      hoveredIndex = pickNodeIndex(event);
      renderer.domElement.style.cursor = hoveredIndex >= 0 ? "pointer" : "default";
    };

    const onPointerLeave = () => {
      hoveredIndex = -1;
      renderer.domElement.style.cursor = "default";
    };

    const onPointerDown = (event: PointerEvent) => {
      const nodeIndex = pickNodeIndex(event);

      if (nodeIndex >= 0) {
        triggerRipple(nodeIndex);
      }
    };

    const onResize = () => {
      if (!mountRef.current) {
        return;
      }

      camera.aspect = mountRef.current.clientWidth / 450;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, 450);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    const clock = new THREE.Clock();
    const animate = () => {
      animationFrame = window.requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      group.rotation.y = time * 0.08 + mouseX * 0.28;
      group.rotation.x = mouseY * 0.14;

      nodeRecords.forEach((node, index) => {
        const targetScale = hoveredIndex === index ? 1.08 : 1;
        const sphereMaterial = node.sphere.material;
        const targetEmissive =
          hoveredIndex === index ? node.baseEmissive + 0.14 : node.baseEmissive;

        node.sphere.scale.x += (targetScale - node.sphere.scale.x) * 0.14;
        node.sphere.scale.y += (targetScale - node.sphere.scale.y) * 0.14;
        node.sphere.scale.z += (targetScale - node.sphere.scale.z) * 0.14;
        sphereMaterial.emissiveIntensity +=
          (targetEmissive - sphereMaterial.emissiveIntensity) * 0.12;

        node.label.position.copy(node.sphere.position);
        node.label.position.z = node.sphere.position.z + node.radius + 0.04;
        node.ripple.position.copy(node.sphere.position);
        node.ripple.position.z = node.sphere.position.z + node.radius + 0.05;

        if (node.rippleActive) {
          node.rippleProgress += 0.045;
          const rippleMaterial = node.ripple.material as THREE.SpriteMaterial;
          const scale = node.radius * (2.6 + node.rippleProgress * 2.1);

          node.ripple.scale.set(scale, scale, 1);
          rippleMaterial.opacity = Math.max(0, 0.88 * (1 - node.rippleProgress));

          if (node.rippleProgress >= 1) {
            node.rippleActive = false;
            node.ripple.visible = false;
            rippleMaterial.opacity = 0;
            node.rippleProgress = 0;
          }
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.cancelAnimationFrame(animationFrame);

      disposableTextures.forEach((texture) => texture.dispose());

      scene.traverse((object) => {
        const disposable = object as THREE.Object3D & {
          geometry?: THREE.BufferGeometry;
          material?: THREE.Material | THREE.Material[];
        };

        disposable.geometry?.dispose();

        if (Array.isArray(disposable.material)) {
          disposable.material.forEach((material) => material.dispose());
        } else {
          disposable.material?.dispose();
        }
      });

      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: 450, borderRadius: 18, overflow: "hidden" }}
    />
  );
}
