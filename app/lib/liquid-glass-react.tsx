import type { CSSProperties, ReactNode, RefObject } from "react";
import { useMemo } from "react";

type LiquidGlassProps = {
  children: ReactNode;
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  elasticity?: number;
  cornerRadius?: number;
  className?: string;
  padding?: string;
  style?: CSSProperties;
  overLight?: boolean;
  onClick?: () => void;
  mouseContainer?: RefObject<HTMLElement | null> | null;
  mode?: "standard" | "polar" | "prominent" | "shader";
  globalMousePos?: { x: number; y: number };
  mouseOffset?: { x: number; y: number };
};

const LiquidGlass = ({
  children,
  displacementScale = 70,
  blurAmount = 0.125,
  saturation = 140,
  aberrationIntensity = 1.2,
  elasticity = 0.2,
  cornerRadius = 24,
  className = "",
  padding = "1.25rem",
  style,
  overLight = false,
  onClick,
}: LiquidGlassProps) => {
  const neonEdge = overLight ? "rgba(23,23,23,0.15)" : "rgba(255,255,255,0.08)";
  const glassStyle = useMemo<CSSProperties>(() => {
    return {
      borderRadius: cornerRadius,
      padding,
      position: "relative",
      overflow: "hidden",
      border: `1px solid ${neonEdge}`,
      background: overLight
        ? "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.65))"
        : "linear-gradient(140deg, rgba(24,24,27,0.6), rgba(39,39,42,0.7), rgba(24,24,27,0.6))",
      boxShadow: `0 ${Math.max(16, displacementScale * 0.1)}px ${Math.max(40, displacementScale * 0.8)}px rgba(0,0,0,0.35), 0 0 1px ${neonEdge}`,
      backdropFilter: `blur(${blurAmount * 80}px) saturate(${saturation}%)`,
      WebkitBackdropFilter: `blur(${blurAmount * 80}px) saturate(${saturation}%)`,
      transform: `translateZ(0) scale(${1 + elasticity * 0.02})`,
      transition: `transform 280ms cubic-bezier(0.22,1,0.36,1), box-shadow 280ms ease`,
      ...style,
    };
  }, [blurAmount, cornerRadius, elasticity, saturation, neonEdge, overLight, style]);

  const highlightStyle: CSSProperties = {
    position: "absolute",
    inset: "0",
    background:
      "radial-gradient(120% 120% at 20% 20%, rgba(255,255,255,0.14), transparent 40%), " +
      "radial-gradient(120% 120% at 80% 0%, rgba(56,189,248,0.16), transparent 35%), " +
      "radial-gradient(120% 120% at 60% 100%, rgba(190,24,93,0.12), transparent 35%)",
    filter: `contrast(${1 + aberrationIntensity * 0.1}) saturate(${1 + saturation / 200})`,
    opacity: overLight ? 0.6 : 1,
    pointerEvents: "none",
  };

  const sheenStyle: CSSProperties = {
    position: "absolute",
    inset: "-40%",
    background: "conic-gradient(from 30deg, rgba(255,255,255,0.08), transparent 40%, rgba(255,255,255,0.08))",
    transform: "rotate(8deg)",
    opacity: 0.9,
    mixBlendMode: overLight ? "screen" : "lighten",
    pointerEvents: "none",
  };

  return (
    <div
      className={`group relative ${className}`}
      style={glassStyle}
      onClick={onClick}
    >
      <div style={sheenStyle} aria-hidden />
      <div style={highlightStyle} aria-hidden />
      <div className="relative z-10">
        {children}
      </div>
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/10 transition duration-300 group-hover:ring-white/30"
        aria-hidden
      />
    </div>
  );
};

export default LiquidGlass;
