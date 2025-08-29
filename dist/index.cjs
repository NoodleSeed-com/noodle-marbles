'use strict';

var React = require('react');
var clsx = require('clsx');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

// Color palette extracted from the reference images
const BUBBLE_COLORS = {
    teal: ["#00bec1", "#4dd0e1", "#80deea"],
    pink: ["#fbc0c4", "#f8bbd9", "#f48fb1"],
    purple: ["#ad9db5", "#ce93d8", "#ba68c8"],
    white: ["#ffffff", "#f5f5f5", "#e8eaf6"],
};
// Gradient patterns for varied visual effects
const GRADIENT_PATTERNS = [
    { cx: "50%", cy: "30%", r: "70%" }, // Center-out radial (classic)
    { cx: "30%", cy: "40%", r: "80%" }, // Off-center radial (dynamic)
    { cx: "50%", cy: "20%", r: "60%" }, // Top-heavy radial (depth)
    { cx: "70%", cy: "50%", r: "75%" }, // Side-lit radial (dramatic)
    { cx: "50%", cy: "70%", r: "65%" }, // Bottom-up radial (grounded)
];
// Color validation and utility functions
const isValidHexColor = (color) => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};
const generateFallbackColor = () => {
    const fallbacks = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};
const validateAndNormalizeColors = (input) => {
    const colors = Array.isArray(input) ? input : [input];
    const validColors = [];
    colors.forEach((color) => {
        if (isValidHexColor(color)) {
            validColors.push(color);
        }
        else {
            if (process.env.NODE_ENV === "development") {
                console.warn(`Invalid color "${color}", using fallback`);
            }
            validColors.push(generateFallbackColor());
        }
    });
    // Ensure at least one color
    if (validColors.length === 0) {
        if (process.env.NODE_ENV === "development") {
            console.warn("No valid colors provided, using default");
        }
        return ["#6366f1"]; // Default brand-safe blue
    }
    return validColors;
};
// Color conversion utilities
const hexToHsl = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: h * 360, s, l };
};
const hslToHex = (h, s, l) => {
    h = ((h % 360) + 360) % 360; // Normalize hue
    s = Math.max(0, Math.min(1, s)); // Clamp saturation
    l = Math.max(0, Math.min(1, l)); // Clamp lightness
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    const toHex = (n) => {
        const hex = Math.round((n + m) * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
// Color harmony generation functions
const generateTriadicHarmony = (baseColor) => {
    const hsl = hexToHsl(baseColor);
    return [
        baseColor,
        hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
    ];
};
const generateAnalogousHarmony = (baseColor) => {
    const hsl = hexToHsl(baseColor);
    return [
        hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
        baseColor,
        hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
    ];
};
const generateComplementaryHarmony = (baseColor) => {
    const hsl = hexToHsl(baseColor);
    return [
        baseColor,
        hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
        hslToHex(hsl.h, hsl.s * 0.3, 0.9), // Neutral tint
    ];
};
const generateMonochromaticHarmony = (baseColor) => {
    const hsl = hexToHsl(baseColor);
    return [
        hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 0.3, 0.9)), // Lighter
        baseColor,
        hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 0.3, 0.1)), // Darker
    ];
};
const generateColorHarmonies = (colors, harmonyType = "triadic") => {
    return colors.map((color) => {
        switch (harmonyType) {
            case "triadic":
                return generateTriadicHarmony(color);
            case "analogous":
                return generateAnalogousHarmony(color);
            case "complementary":
                return generateComplementaryHarmony(color);
            case "monochromatic":
                return generateMonochromaticHarmony(color);
            default:
                return generateTriadicHarmony(color);
        }
    });
};
const generateBubbleGradient = (baseColor) => {
    const hsl = hexToHsl(baseColor);
    return [
        hslToHex(hsl.h, hsl.s * 0.7, Math.min(hsl.l + 0.2, 0.9)), // Light center
        baseColor, // Mid
        hslToHex(hsl.h, hsl.s * 1.2, Math.max(hsl.l - 0.2, 0.1)), // Dark edge
    ];
};
// Convert string to a numeric hash
const stringToHash = (str) => {
    let hash = 0;
    if (str.length === 0)
        return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
};
// Simple seeded random number generator
class SeededRandom {
    constructor(seed) {
        this.seed = seed % 2147483647;
        if (this.seed <= 0)
            this.seed += 2147483646;
    }
    next() {
        this.seed = (this.seed * 16807) % 2147483647;
        return (this.seed - 1) / 2147483646;
    }
    range(min, max) {
        return min + this.next() * (max - min);
    }
}
const generateBubbles = (seed, variant, color, harmonyType = "triadic") => {
    const rng = new SeededRandom(seed);
    const bubbles = [];
    let colorSchemes;
    if (color) {
        // Use new color harmony system
        const validatedColors = validateAndNormalizeColors(color);
        const harmonies = generateColorHarmonies(validatedColors, harmonyType);
        // Create color schemes from harmonies
        colorSchemes = [];
        harmonies.forEach((harmony) => {
            harmony.forEach((harmonyColor) => {
                colorSchemes.push(generateBubbleGradient(harmonyColor));
            });
        });
    }
    else {
        // Fallback to variant system
        const variantSchemes = {
            primary: [BUBBLE_COLORS.teal, BUBBLE_COLORS.pink, BUBBLE_COLORS.white],
            secondary: [
                BUBBLE_COLORS.pink,
                BUBBLE_COLORS.purple,
                BUBBLE_COLORS.white,
            ],
            tertiary: [BUBBLE_COLORS.purple, BUBBLE_COLORS.teal, BUBBLE_COLORS.white],
        };
        colorSchemes =
            variantSchemes[variant] ||
                variantSchemes.primary;
    }
    // Generate 4-6 bubbles for layered effect
    const bubbleCount = Math.floor(rng.range(4, 7));
    for (let i = 0; i < bubbleCount; i++) {
        const gradientPattern = GRADIENT_PATTERNS[i % GRADIENT_PATTERNS.length];
        const bubble = {
            id: `bubble-${seed}-${i}`,
            cx: rng.range(20, 80), // Position as percentage
            cy: rng.range(20, 80),
            r: rng.range(25, 60), // Radius as percentage
            colors: colorSchemes[i % colorSchemes.length],
            opacity: rng.range(0.4, 0.9),
            animationDuration: rng.range(3, 8), // 3-8 seconds for faster movement
            animationDelay: rng.range(0, 2), // 0-2 second delay
            animationDirection: rng.next() > 0.5 ? "alternate" : "normal",
            gradientPattern, // Add gradient pattern for varied effects
        };
        bubbles.push(bubble);
    }
    // Sort by radius (largest first) for proper layering
    return bubbles.sort((a, b) => b.r - a.r);
};
const generateHighlight = (seed) => {
    const rng = new SeededRandom(seed + 1000); // Offset seed for highlight
    return {
        id: `highlight-${seed}`,
        cx: rng.range(40, 60), // More centered horizontally
        cy: rng.range(40, 50), // Can appear in upper or lower half
        rx: rng.range(12, 20), // Larger horizontal radius
        ry: rng.range(15, 25), // Larger vertical radius
        opacity: rng.range(0.6, 0.8), // More prominent opacity
    };
};
const Marble = ({ size = 100, seed = "default", className = "", variant = "primary", color, harmonyType = "triadic", blendMode = "multiply", animated = false, rotate = false, borderWidth = 30, borderColor = "rgba(255, 255, 255, 1)", }) => {
    // Sanitize seed by replacing spaces with dashes to prevent SVG ID issues
    const sanitizedSeed = React__namespace.useMemo(() => seed.replace(/\s+/g, "-"), [seed]);
    const numericSeed = React__namespace.useMemo(() => stringToHash(sanitizedSeed), [sanitizedSeed]);
    const bubbles = React__namespace.useMemo(() => generateBubbles(numericSeed, variant, color, harmonyType), [numericSeed, variant, color, harmonyType]);
    const highlight = React__namespace.useMemo(() => generateHighlight(numericSeed), [numericSeed]);
    return (React__namespace.createElement("div", { className: clsx("relative overflow-hidden rounded-full", className), style: {
            width: size,
            height: size,
        } },
        React__namespace.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 100 100", className: "absolute inset-0" },
            React__namespace.createElement("defs", null,
                React__namespace.createElement("clipPath", { id: `clip-${sanitizedSeed}` },
                    React__namespace.createElement("circle", { cx: "50", cy: "50", r: "50" })),
                bubbles.map((bubble) => {
                    var _a, _b, _c;
                    return (React__namespace.createElement("radialGradient", { key: bubble.id, id: bubble.id, cx: ((_a = bubble.gradientPattern) === null || _a === void 0 ? void 0 : _a.cx) || "50%", cy: ((_b = bubble.gradientPattern) === null || _b === void 0 ? void 0 : _b.cy) || "30%", r: ((_c = bubble.gradientPattern) === null || _c === void 0 ? void 0 : _c.r) || "70%" },
                        React__namespace.createElement("stop", { offset: "0%", stopColor: bubble.colors[0], stopOpacity: bubble.opacity }),
                        React__namespace.createElement("stop", { offset: "40%", stopColor: bubble.colors[1], stopOpacity: bubble.opacity * 0.7 }),
                        React__namespace.createElement("stop", { offset: "100%", stopColor: bubble.colors[2], stopOpacity: bubble.opacity * 0.3 })));
                }),
                React__namespace.createElement("radialGradient", { id: `base-gradient-${sanitizedSeed}`, cx: "50%", cy: "50%", r: "50%" },
                    React__namespace.createElement("stop", { offset: "0%", stopColor: "#ffffff", stopOpacity: "0.2" }),
                    React__namespace.createElement("stop", { offset: "100%", stopColor: "#f8fafc", stopOpacity: "0.05" })),
                React__namespace.createElement("radialGradient", { id: highlight.id, cx: "50%", cy: "30%", r: "80%" },
                    React__namespace.createElement("stop", { offset: "0%", stopColor: "#ffffff", stopOpacity: highlight.opacity }),
                    React__namespace.createElement("stop", { offset: "60%", stopColor: "#ffffff", stopOpacity: highlight.opacity * 0.5 }),
                    React__namespace.createElement("stop", { offset: "100%", stopColor: "#ffffff", stopOpacity: "0" }))),
            React__namespace.createElement("g", { clipPath: `url(#clip-${sanitizedSeed})` },
                rotate && (React__namespace.createElement("animateTransform", { attributeName: "transform", type: "rotate", values: "0 50 50; 360 50 50", dur: "16s", repeatCount: "indefinite" })),
                React__namespace.createElement("circle", { cx: "50", cy: "50", r: "50", fill: color
                        ? bubbles.length > 0
                            ? bubbles[0].colors[2] // Use the third color of first bubble
                            : "#f8fafc"
                        : variant === "primary"
                            ? "#e0f7fa"
                            : variant === "secondary"
                                ? "#fce4ec"
                                : "#f3e5f5", opacity: color ? 0.3 : 1 }),
                bubbles.map((bubble) => (React__namespace.createElement("circle", { key: bubble.id, cx: bubble.cx, cy: bubble.cy, r: bubble.r, fill: `url(#${bubble.id})`, style: {
                        mixBlendMode: blendMode,
                    } }, animated && (React__namespace.createElement("animateTransform", { attributeName: "transform", type: "translate", values: `0,0; ${bubble.cx > 50 ? -5 : 5},${bubble.cy > 50 ? -4 : 4}; 0,0`, dur: `${bubble.animationDuration}s`, begin: `${bubble.animationDelay}s`, repeatCount: "indefinite", calcMode: "spline", keySplines: "0.4 0 0.6 1; 0.4 0 0.6 1", keyTimes: "0; 0.5; 1" }))))),
                React__namespace.createElement("circle", { cx: "50", cy: "50", r: "50", fill: `url(#base-gradient-${sanitizedSeed})` }),
                React__namespace.createElement("ellipse", { cx: highlight.cx, cy: highlight.cy, rx: highlight.rx, ry: highlight.ry, fill: `url(#${highlight.id})`, style: {
                        mixBlendMode: "screen",
                    } }, animated && (React__namespace.createElement(React__namespace.Fragment, null,
                    React__namespace.createElement("animateTransform", { attributeName: "transform", type: "translate", values: `0,0; ${highlight.cx > 50 ? -3 : 3},${highlight.cy > 50 ? -2.5 : 2.5}; 0,0`, dur: "5s", begin: "0.5s", repeatCount: "indefinite", calcMode: "spline", keySplines: "0.4 0 0.6 1; 0.4 0 0.6 1", keyTimes: "0; 0.5; 1" }),
                    React__namespace.createElement("animate", { attributeName: "opacity", values: `0.2; ${highlight.opacity}; 0.2`, dur: "3s", begin: "0s", repeatCount: "indefinite" })))),
                borderWidth > 0 && (React__namespace.createElement(React__namespace.Fragment, null,
                    React__namespace.createElement("circle", { cx: "50", cy: "50", r: "49", fill: "none", stroke: borderColor, strokeWidth: borderWidth }),
                    React__namespace.createElement("circle", { cx: "50", cy: "50", r: "47.5", fill: "none", stroke: "rgba(255, 255, 255, 0.4)", strokeWidth: "1" })))))));
};

exports.Marble = Marble;
//# sourceMappingURL=index.cjs.map
