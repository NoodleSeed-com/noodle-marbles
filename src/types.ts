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
  /** Color variant to use (default: "primary") */
  variant?: "primary" | "secondary" | "tertiary";
  /** Whether to enable gentle animations (default: false) */
  animated?: boolean;
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
