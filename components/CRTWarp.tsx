"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uBackgroundColor;
uniform float uCurvature;
uniform float uScanlineStrength;
uniform float uScanlineFrequency;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform float uBloom;
uniform float uBloomRadius;
uniform float uNoise;
uniform float uVignette;
uniform float uBrightness;
uniform float uPixelation;
uniform float uRgbShift;
uniform vec2 uPointer;
uniform float uMouseStrength;
uniform float uMouseReact;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 crtCurve(vec2 uv, float radius) {
  vec2 p = (uv - 0.5) * 2.0;
  float safeRadius = max(radius, 1.415);
  float cornerScale = safeRadius / sqrt(max(safeRadius * safeRadius - 2.0, 0.001));
  p = safeRadius * p / sqrt(max(safeRadius * safeRadius - dot(p, p), 0.001));
  p /= cornerScale;
  return p * 0.5 + 0.5;
}

float referencePlasma(vec2 uv, float t) {
  float frequencyScale = max(uWaveFrequency / 2.2, 0.001);
  uv = (uv - 0.5) * frequencyScale + 0.5;

  float scanline = 0.5 - 0.5 * cos(uv.y * 3.14159265 * uScanlineFrequency);
  scanline = mix(1.0, scanline, uScanlineStrength);

  uv *= vec2(80.0, 24.0);
  uv = ceil(uv);
  uv /= vec2(80.0, 24.0);

  float amplitude = uWaveAmplitude / 0.28;
  float field = 0.0;
  field += 0.7 * sin(0.5 * uv.x + t / 5.0);
  field += 3.0 * sin(1.6 * uv.y + t / 5.0);
  field += sin(10.0 * (uv.y * sin(t / 2.0) + uv.x * cos(t / 5.0)) + t / 2.0);

  float cx = uv.x + 0.5 * sin(t / 2.0);
  float cy = uv.y + 0.5 * cos(t / 4.0);
  field += 0.4 * sin(sqrt(100.0 * cx * cx + 100.0 * cy * cy + 1.0) + t);
  field += 0.9 * sin(sqrt(75.0 * cx * cx + 25.0 * cy * cy + 1.0) + t);
  field -= 1.4 * sin(sqrt(256.0 * cx * cx + 25.0 * cy * cy + 1.0) + t);
  field += 0.3 * sin(0.5 * uv.y + uv.x + sin(t));

  return scanline * floor(3.0 * (0.5 + 0.499 * sin(field * amplitude))) / 3.0;
}

void main() {
  vec2 uv = vUv;
  if (uPixelation > 1.001) {
    vec2 cells = max(uResolution / uPixelation, vec2(1.0));
    uv = (floor(uv * cells) + 0.5) / cells;
  }

  float curveRadius = 1.1 + 0.42 / max(uCurvature, 0.001);
  if (uMouseReact > 0.5) {
    curveRadius *= exp(-uPointer.y * uMouseStrength * 0.4);
  }
  vec2 curvedUv = crtCurve(uv, curveRadius);
  if (uMouseReact > 0.5) {
    curvedUv.x -= uPointer.x * uMouseStrength * 0.035;
  }

  float signal = referencePlasma(curvedUv, uTime);
  float radius = 0.01 * uBloomRadius;
  float glow = signal * 0.2;
  glow += referencePlasma(curvedUv + vec2(radius, 0.0), uTime) * 0.12;
  glow += referencePlasma(curvedUv - vec2(radius, 0.0), uTime) * 0.12;
  glow += referencePlasma(curvedUv + vec2(0.0, radius), uTime) * 0.12;
  glow += referencePlasma(curvedUv - vec2(0.0, radius), uTime) * 0.12;
  glow += referencePlasma(curvedUv + vec2(radius), uTime) * 0.08;
  glow += referencePlasma(curvedUv - vec2(radius), uTime) * 0.08;
  glow += referencePlasma(curvedUv + vec2(radius, -radius), uTime) * 0.08;
  glow += referencePlasma(curvedUv + vec2(-radius, radius), uTime) * 0.08;

  float redSignal = referencePlasma(curvedUv + vec2(uRgbShift, 0.0), uTime);
  float blueSignal = referencePlasma(curvedUv - vec2(uRgbShift, 0.0), uTime);
  vec3 channelSignal = vec3(redSignal, signal, blueSignal);
  vec3 waveColor = uColor * (0.3 + signal * 0.7 + glow * uBloom * 0.65);
  waveColor += (channelSignal - signal) * 0.42;

  float edge = clamp(1.0 - dot(vUv - 0.5, vUv - 0.5) * 2.0, 0.0, 1.0);
  float edgeFade = mix(1.0, smoothstep(0.0, 1.0, edge), uVignette);
  float waveMask = clamp(signal * 0.82 + glow * 0.52, 0.0, 1.0) * edgeFade;

  float grain = hash21(gl_FragCoord.xy + vec2(fract(uTime) * 173.0));
  waveColor = max(waveColor * uBrightness, vec3(0.0));
  vec3 color = mix(uBackgroundColor, waveColor, waveMask);
  color += (grain - 0.5) * uNoise;
  gl_FragColor = vec4(max(color, vec3(0.0)), 1.0);
}
`;

interface CRTWarpProps {
  color?: string;
  backgroundColor?: string;
  speed?: number;
  curvature?: number;
  scanlineStrength?: number;
  scanlineFrequency?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  bloom?: number;
  bloomRadius?: number;
  noise?: number;
  vignette?: number;
  brightness?: number;
  pixelation?: number;
  rgbShift?: number;
  mouseReact?: boolean;
  mouseStrength?: number;
  dpr?: number;
  fps?: number;
  paused?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function CRTWarp({
  color = "#c755f7",
  backgroundColor = "#05010a",
  speed = 0.5,
  curvature = 0.25,
  scanlineStrength = 0.25,
  scanlineFrequency = 200,
  waveAmplitude = 0.3,
  waveFrequency = 2.5,
  bloom = 1.5,
  bloomRadius = 1,
  noise = 0.1,
  vignette = 0,
  brightness = 1.25,
  pixelation = 1,
  rgbShift = 0.015,
  mouseReact = true,
  mouseStrength = 0.5,
  dpr = 1,
  fps = 30,
  paused = false,
  className,
  style,
}: CRTWarpProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number | null>(null);
  const pausedRef = useRef(paused);
  const pointerTargetRef = useRef(new THREE.Vector2(0, 0));
  const pointerCurrentRef = useRef(new THREE.Vector2(0, 0));
  const visibleRef = useRef(true);
  const fpsRef = useRef(fps);
  const lastFrameRef = useRef(0);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    fpsRef.current = Math.max(1, fps);
  }, [fps]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uResolution: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uColor: { value: new THREE.Color(color) },
        uBackgroundColor: { value: new THREE.Color(backgroundColor) },
        uCurvature: { value: curvature },
        uScanlineStrength: { value: scanlineStrength },
        uScanlineFrequency: { value: scanlineFrequency },
        uWaveAmplitude: { value: waveAmplitude },
        uWaveFrequency: { value: waveFrequency },
        uBloom: { value: bloom },
        uBloomRadius: { value: bloomRadius },
        uNoise: { value: noise },
        uVignette: { value: vignette },
        uBrightness: { value: brightness },
        uPixelation: { value: pixelation },
        uRgbShift: { value: rgbShift },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uMouseStrength: { value: mouseStrength },
        uMouseReact: { value: mouseReact ? 1.0 : 0.0 },
      },
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(dpr, 2));
    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    setSize();

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerTargetRef.current.set(
        ((e.clientX - rect.left) / rect.width) * 2.0 - 1.0,
        -((e.clientY - rect.top) / rect.height) * 2.0 + 1.0,
      );
    };
    if (mouseReact) {
      canvas.addEventListener("pointermove", onPointerMove);
    }

    const animate = (time: number) => {
      if (pausedRef.current) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      const now = time;
      const elapsed = now - lastFrameRef.current;
      const frameInterval = 1000 / fpsRef.current;

      if (elapsed < frameInterval) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameRef.current = now - (elapsed % frameInterval);

      material.uniforms.uTime.value = time * 0.001 * speed;

      pointerCurrentRef.current.lerp(pointerTargetRef.current, 0.1);
      material.uniforms.uPointer.value.copy(pointerCurrentRef.current);

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(container);

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (mouseReact) canvas.removeEventListener("pointermove", onPointerMove);
      ro.disconnect();
      io.disconnect();
      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [
    dpr,
    paused,
    speed,
    curvature,
    scanlineStrength,
    scanlineFrequency,
    waveAmplitude,
    waveFrequency,
    bloom,
    bloomRadius,
    noise,
    vignette,
    brightness,
    pixelation,
    rgbShift,
    mouseReact,
    mouseStrength,
    color,
    backgroundColor,
  ]);

  return (
    <div ref={containerRef} className={`crt-warp-container ${className ?? ""}`} style={style} />
  );
}