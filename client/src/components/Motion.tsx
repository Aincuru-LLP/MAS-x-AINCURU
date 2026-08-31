import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export function MotionReveal({ children, className, delay = 0, distance = 20 }: MotionRevealProps) {
  const reduceMotion = useReducedMotionPreference();
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold: 0.14 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      className={`motion-reveal${visible ? " motion-reveal--visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--reveal-delay": `${delay}s`, "--reveal-distance": `${distance}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function ScrollProgress() {
  const reduceMotion = useReducedMotionPreference();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? Math.min(window.scrollY / available, 1) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__fill" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

function useReducedMotionPreference() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduceMotion;
}
