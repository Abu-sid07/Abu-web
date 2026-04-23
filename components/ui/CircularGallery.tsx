'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Camera,
  Mesh,
  Plane,
  Program,
  Renderer,
  Texture,
  Transform,
} from 'ogl';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface GalleryItem {
  image: string;
  text: string;
  url?: string;
}

interface CircularGalleryProps {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
}

type GL = Renderer['gl'];

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function autoBind<T extends object>(instance: T): void {
  const proto = Object.getPrototypeOf(instance) as Record<string, unknown> | null;
  if (!proto) return;
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== 'constructor') {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc && typeof desc.value === 'function') {
        const fn = desc.value as (...args: unknown[]) => unknown;
        (instance as Record<string, unknown>)[key] = fn.bind(instance);
      }
    }
  });
}

function getFontSize(font: string): number {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 30;
}

function createTextTexture(
  gl: GL,
  text: string,
  font = 'bold 30px monospace',
  color = 'black'
): { texture: Texture; width: number; height: number } {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not get 2d context');
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const fontSize = getFontSize(font);
  const textHeight = Math.ceil(fontSize * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

// ─────────────────────────────────────────────────────────────────────────────
// TITLE CLASS
// ─────────────────────────────────────────────────────────────────────────────

interface TitleProps {
  gl: GL;
  plane: Mesh;
  renderer: Renderer;
  text: string;
  textColor?: string;
  font?: string;
}

class Title {
  gl: GL;
  plane: Mesh;
  renderer: Renderer;
  text: string;
  textColor: string;
  font: string;
  mesh!: Mesh;

  constructor({
    gl, plane, renderer, text, textColor = '#545050', font = '30px sans-serif',
  }: TitleProps) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl, this.text, this.font, this.textColor
    );
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeightScaled = this.plane.scale.y * 0.15;
    const textWidthScaled = textHeightScaled * aspect;
    this.mesh.scale.set(textWidthScaled, textHeightScaled, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeightScaled * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MEDIA CLASS — CHANGED: Instagram Reel 9:16 aspect ratio
// ─────────────────────────────────────────────────────────────────────────────

interface ScreenSize { width: number; height: number }
interface Viewport   { width: number; height: number }

interface MediaProps {
  geometry: Plane;
  gl: GL;
  image: string;
  url?: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  text: string;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius?: number;
  font?: string;
}

class Media {
  extra        = 0;
  geometry:    Plane;
  gl:          GL;
  image:       string;
  url?:        string;
  index:       number;
  length:      number;
  renderer:    Renderer;
  scene:       Transform;
  screen:      ScreenSize;
  text:        string;
  viewport:    Viewport;
  bend:        number;
  textColor:   string;
  borderRadius: number;
  font?:       string;
  program!:    Program;
  plane!:      Mesh;
  title!:      Title;
  scale!:      number;
  padding!:    number;
  width!:      number;
  widthTotal!: number;
  x!:          number;
  speed        = 0;
  isBefore     = false;
  isAfter      = false;

  constructor({ geometry, gl, image, url, index, length, renderer, scene, screen, text, viewport, bend, textColor, borderRadius = 0, font }: MediaProps) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.url = url;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          if (d > 0.0) discard;
          gl_FragColor = vec4(color.rgb, 1.0);
        }
      `,
      uniforms: {
        tMap:          { value: texture },
        uPlaneSizes:   { value: [0, 0] },
        uImageSizes:   { value: [0, 0] },
        uSpeed:        { value: 0 },
        uTime:         { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl, plane: this.plane, renderer: this.renderer,
      text: this.text, textColor: this.textColor, font: this.font,
    });
  }

  update(scroll: { current: number; last: number }, direction: 'right' | 'left') {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs      = Math.abs(this.bend);
      const R          = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc        = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z =  Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value  += 0.04;
    this.program.uniforms.uSpeed.value  = this.speed;

    const planeOffset    = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter  = this.plane.position.x - planeOffset >  viewportOffset;

    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  // CHANGED: Instagram Reel 9:16 aspect ratio
  // Height drives width using 9/16 ratio
  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: Viewport } = {}) {
  if (screen)   this.screen = screen;
  if (viewport) {
    this.viewport = viewport;
    if (this.plane.program.uniforms.uViewportSizes) {
      this.plane.program.uniforms.uViewportSizes.value = [
        this.viewport.width,
        this.viewport.height,
      ];
    }
  }
  this.scale = this.screen.height / 1500;

  // Instagram Reel 9:16 — tall and narrow
  // Height same as original (900), width from 9:16 ratio
  const cardHeight = (this.viewport.height * (900 * this.scale)) / this.screen.height;
  const cardWidth  = cardHeight * (14 / 16);

  this.plane.scale.y = cardHeight;
  this.plane.scale.x = cardWidth;

  this.plane.program.uniforms.uPlaneSizes.value = [
    this.plane.scale.x,
    this.plane.scale.y,
  ];

  // Tighter padding so exactly 3 reels fit on screen
  this.padding    = 10;
  this.width      = this.plane.scale.x + this.padding;
  this.widthTotal = this.width * this.length;
  this.x          = this.width * this.index;
}
}

// ─────────────────────────────────────────────────────────────────────────────
// APP CLASS
// ─────────────────────────────────────────────────────────────────────────────

interface AppConfig {
  items?:        GalleryItem[];
  bend?:         number;
  textColor?:    string;
  borderRadius?: number;
  font?:         string;
  scrollSpeed?:  number;
  scrollEase?:   number;
}

const CARDS_TO_SHOW = 8; // Adjusted to show 3 cards with tighter padding
const SLOW_EASE = 0.05;

class App {
  container:    HTMLElement;
  scrollSpeed:  number;
  scroll: { ease: number; current: number; target: number; last: number; position?: number };
  renderer!:    Renderer;
  gl!:          GL;
  camera!:      Camera;
  scene!:       Transform;
  planeGeometry!: Plane;
  medias:       Media[] = [];
  mediasImages: GalleryItem[] = [];
  screen!:      ScreenSize;
  viewport!:    Viewport;
  raf           = 0;
  isDown        = false;
  start         = 0;
  dragDistance   = 0;

  maxScrollTarget = 0;
  isComplete      = false;
  onProgressCb?:  (p: number) => void;

  boundOnResize!:    () => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!:   (e: MouseEvent | TouchEvent) => void;

  onClickCallback?: (url: string) => void;

  constructor(
    container: HTMLElement,
    { items, bend = 1, textColor = '#ffffff', borderRadius = 0, font = 'bold 30px Figtree', scrollSpeed = 2, scrollEase = 0.05 }: AppConfig,
    onClickCallback?: (url: string) => void,
    onProgressCb?: (p: number) => void
  ) {
    this.container       = container;
    this.scrollSpeed     = scrollSpeed;
    this.scroll          = { ease: SLOW_EASE, current: 0, target: 0, last: 0 };
    this.onClickCallback = onClickCallback;
    this.onProgressCb    = onProgressCb;
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.calcMaxScroll();
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 });
  }

  createMedias(items: GalleryItem[] | undefined, bend: number, textColor: string, borderRadius: number, font: string) {
    const galleryItems = items?.length ? items : [];
    this.mediasImages  = [...galleryItems, ...galleryItems];
    this.medias        = this.mediasImages.map((data, index) =>
      new Media({
        geometry: this.planeGeometry, gl: this.gl,
        image: data.image, url: data.url,
        index, length: this.mediasImages.length,
        renderer: this.renderer, scene: this.scene,
        screen: this.screen, text: data.text,
        viewport: this.viewport, bend, textColor, borderRadius, font,
      })
    );
  }

  calcMaxScroll() {
    if (this.medias.length > 0) {
      this.maxScrollTarget = this.medias[0].width * CARDS_TO_SHOW;
    }
  }

  pushScroll(deltaY: number) {
    if (this.isComplete && deltaY < 0) {
      this.isComplete = false;
    }

    this.scroll.target += deltaY * this.scrollSpeed * 0.18;

    if (this.scroll.target < 0) {
      this.scroll.target = 0;
    }

    const p = Math.min(this.scroll.target / this.maxScrollTarget, 1);
    this.onProgressCb?.(p);

    if (this.scroll.target >= this.maxScrollTarget) {
      this.scroll.target = this.maxScrollTarget;
      this.isComplete = true;
    }
  }

  reset() {
    this.isComplete    = false;
    this.scroll.target = 0;
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown          = true;
    this.dragDistance    = 0;
    this.scroll.position = this.scroll.current;
    this.start           = 'touches' in e ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    this.dragDistance      = Math.abs(this.start - x);
    const distance         = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target     = (this.scroll.position ?? 0) + distance;
  }

  onTouchUp(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    this.isDown = false;
    if (this.dragDistance < 8) this.handleClick(e);
    this.onCheck();
  }

  handleClick(e: MouseEvent | TouchEvent) {
    if (!this.onClickCallback) return;
    const clientX    = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
    const rect       = this.container.getBoundingClientRect();
    const normX      = ((clientX - rect.left) / rect.width) * 2 - 1;
    const halfVP     = this.viewport.width / 2;
    let closest: Media | null = null;
    let closestDist = Infinity;
    for (const media of this.medias) {
      const planeNorm = media.plane.position.x / halfVP;
      const dist      = Math.abs(planeNorm - normX);
      if (dist < closestDist) { closestDist = dist; closest = media; }
    }
    if (closest?.url && closestDist < 0.7) this.onClickCallback(closest.url);
  }

  onCheck() {
    if (!this.medias?.[0]) return;
    const width     = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item      = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov    = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width  = height * this.camera.aspect;
    this.viewport = { width, height };
    this.medias?.forEach((m) => m.onResize({ screen: this.screen, viewport: this.viewport }));
    this.calcMaxScroll();
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction     = this.scroll.current > this.scroll.last ? 'right' : 'left';
    this.medias?.forEach((m) => m.update(this.scroll, direction));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize    = this.onResize.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp   = this.onTouchUp.bind(this);
    window.addEventListener('resize',    this.boundOnResize);
    window.addEventListener('mousemove', this.boundOnTouchMove as EventListener);
    window.addEventListener('mouseup',   this.boundOnTouchUp  as EventListener);
    window.addEventListener('touchmove', this.boundOnTouchMove as EventListener);
    window.addEventListener('touchend',  this.boundOnTouchUp  as EventListener);
    this.container.addEventListener('mousedown',  this.boundOnTouchDown as EventListener);
    this.container.addEventListener('touchstart', this.boundOnTouchDown as EventListener);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize',    this.boundOnResize);
    window.removeEventListener('mousemove', this.boundOnTouchMove as EventListener);
    window.removeEventListener('mouseup',   this.boundOnTouchUp  as EventListener);
    window.removeEventListener('touchmove', this.boundOnTouchMove as EventListener);
    window.removeEventListener('touchend',  this.boundOnTouchUp  as EventListener);
    this.container.removeEventListener('mousedown',  this.boundOnTouchDown as EventListener);
    this.container.removeEventListener('touchstart', this.boundOnTouchDown as EventListener);
    const canvas = this.renderer?.gl?.canvas as HTMLCanvasElement | undefined;
    canvas?.parentNode?.removeChild(canvas);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// HEADER — Yellow themed, matches portfolio
// ─────────────────────────────────────────────────────────────────────────────

function GalleryHeader({ progress }: { progress: number }) {
  const reduced = useReducedMotion();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const up = () => setIsDark(document.documentElement.classList.contains('dark'));
    up();
    const obs = new MutationObserver(up);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="text-center px-6  py-2 pt-8 pb-4 relative z-10">
    

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0.01 : 0.5, delay: 0.1 }}
        className={[
          'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3',
          isDark ? 'text-white' : 'text-gray-900',
        ].join(' ')}
      >
        My Reels &amp;{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">
          Projects
        </span>
      </motion.h2>
      
      {/* Decorative line */}
      <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
        <div className={isDark
          ? 'h-px w-12 bg-gradient-to-r from-transparent to-yellow-500/50'
          : 'h-px w-12 bg-gradient-to-r from-transparent to-yellow-400'} />
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
        <div className={isDark
          ? 'h-px w-12 bg-gradient-to-l from-transparent to-yellow-500/50'
          : 'h-px w-12 bg-gradient-to-l from-transparent to-yellow-400'} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REEL DATA
// ─────────────────────────────────────────────────────────────────────────────

const MY_REELS: GalleryItem[] = [
  { image: '/reel/Resume_ATS.png',    text: 'Resume ATS',
    url: 'https://www.instagram.com/reel/DP1JGkTCk-J/' },
  { image: '/reel/After_Deploy.png',  text: 'After Deploy',
    url: 'https://www.instagram.com/reel/DUX0bTfDGMn/' },
  { image: '/reel/Learn.png',         text: 'Free & Easy Learn',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7448663654780264449/' },
  { image: '/reel/140+_Ai Tools.png', text: '140 AI Tools',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7449343137770020864/' },
  { image: '/reel/Free_Course.png',   text: '2.5 Lakh Courses',
    url: 'https://www.instagram.com/reel/REPLACE_WITH_REAL_REEL_ID/' },
  { image: '/reel/Job.png',           text: 'Job & Degree',
    url: 'https://www.instagram.com/reel/DPn0qCdiuUI/' },
  { image: '/reel/Vibe_Coding.png',   text: 'Vibe Coding',
    url: 'https://www.instagram.com/reel/DPvEHBSiorU/' },
  { image: '/reel/Google.png',
    text: 'How Google shows results in just 1 second?',
    url: 'https://www.instagram.com/reel/DRg1rMCAY9u/' },
];

// ─────────────────────────────────────────────────────────────────────────────
// NAMED EXPORT — used internally
// ─────────────────────────────────────────────────────────────────────────────

export function CircularGallery({
  items,
  bend         = 3,
  textColor    = '#ffffff',
  borderRadius = 0.08,
  font         = 'bold 30px Figtree',
  scrollSpeed  = 2,
  scrollEase   = 0.05,
}: CircularGalleryProps) {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef       = useRef<App | null>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  const handleClick = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  // Init gallery
  useEffect(() => {
    if (!containerRef.current) return;
    const app = new App(
      containerRef.current,
      { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase },
      handleClick,
      (p) => setProgress(p)
    );
    appRef.current = app;
    return () => { app.destroy(); appRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);

  // Bidirectional scroll-pin
  useEffect(() => {
    if (reduced) return;

    const section = sectionRef.current;
    if (!section) return;

    let pinnedY = 0;
    let locked  = false;
    let touchY  = 0;

    const onWheel = (e: WheelEvent) => {
      const app = appRef.current;
      if (!app) return;

      const rect    = section.getBoundingClientRect();
      const vh      = window.innerHeight;
      const visible = rect.top <= vh * 0.15 && rect.bottom >= vh * 0.4;

      if (visible) {
        if (e.deltaY < 0 && app.scroll.target <= 0) { locked = false; return; }
        if (e.deltaY > 0 && app.isComplete) { locked = false; return; }

        e.preventDefault();
        if (!locked) { pinnedY = window.scrollY; locked = true; }
        window.scrollTo({ top: pinnedY });
        app.pushScroll(e.deltaY);
      } else {
        locked = false;
        if (rect.top > vh * 0.5 && (app.isComplete || app.scroll.target > 0)) {
          app.reset();
          setProgress(0);
        }
      }
    };

    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };

    const onTouchMove = (e: TouchEvent) => {
      const app = appRef.current;
      if (!app) return;

      const rect    = section.getBoundingClientRect();
      const vh      = window.innerHeight;
      const visible = rect.top <= vh * 0.15 && rect.bottom >= vh * 0.4;

      if (visible) {
        const y  = e.touches[0].clientY;
        const dy = touchY - y;
        touchY   = y;

        if (dy < 0 && app.scroll.target <= 0) { locked = false; return; }
        if (dy > 0 && app.isComplete) { locked = false; return; }

        e.preventDefault();
        if (!locked) { pinnedY = window.scrollY; locked = true; }
        window.scrollTo({ top: pinnedY });
        app.pushScroll(dy * 1.2);
      } else {
        locked = false;
        if (rect.top > vh * 0.5 && (app.isComplete || app.scroll.target > 0)) {
          app.reset();
          setProgress(0);
        }
      }
    };

    window.addEventListener('wheel',      onWheel,      { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true  });
    window.addEventListener('touchmove',  onTouchMove,  { passive: false });

    return () => {
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove);
    };
  }, [reduced]);

  return (
    <div
      ref={sectionRef}
      style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}
    >
      {/* Themed header with progress */}
      <GalleryHeader progress={progress} />

      {/* Gallery canvas */}
      <div style={{ flex: 1, position: 'relative' }}>
        <div
          ref={containerRef}
          className="w-full h-full overflow-hidden py-0 cursor-grab active:cursor-grabbing"
        />

        {/* Old UI hint label */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm text-white/70 text-xs font-medium whitespace-nowrap">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Click a reel to open on Instagram
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export default function ProjectGallery(props: CircularGalleryProps) {
  return (
    <CircularGallery
      items={MY_REELS}
      bend={3}
      textColor="#ffffff"
      borderRadius={0.08}
      scrollSpeed={2}
      scrollEase={0.05}
      {...props}
    />
  );
}