/**
 * Props for the Marble component
 */
export interface MarbleProps {
  /** Size of the marble in pixels (default: 100) */
  size?: number;
  /** Seed string for deterministic generation (default: "default") */
  seed?: string;
  /** Additional CSS classes to apply */
  className?: string;
  /** Color variant to use when no color prop provided (default: "primary") */
  variant?: "primary" | "secondary" | "tertiary";
  /** Brand color(s) - single color or array. Generates harmonies automatically */
  color?: string | string[];
  /** Type of color harmony to generate (default: "triadic") */
  harmonyType?: "triadic" | "analogous" | "complementary" | "monochromatic";
  /** Blend mode for bubble layering (default: "multiply") */
  blendMode?:
    | "normal"
    | "multiply"
    | "overlay"
    | "soft-light"
    | "hard-light"
    | "color-dodge"
    | "color-burn"
    | "darken"
    | "lighten"
    | "difference"
    | "exclusion";
  /** Whether to enable gentle animations (default: false) */
  animated?: boolean;
  /** Whether to enable spinning rotation animation (default: false) */
  rotate?: boolean;
  /** Width of the border around the marble (0-30, default: 30) */
  borderWidth?: number;
  /** Color of the border around the marble (default: "rgba(255, 255, 255, 1)") */
  borderColor?: string;
}

/**
 * Internal interface for bubble data
 */
export interface Bubble {
  id: string;
  cx: number;
  cy: number;
  r: number;
  colors: string[];
  opacity: number;
  animationDuration?: number;
  animationDelay?: number;
  animationDirection?: "normal" | "reverse" | "alternate";
  gradientPattern?: { cx: string; cy: string; r: string };
}

/**
 * Internal interface for highlight data
 */
export interface Highlight {
  id: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  opacity: number;
}
