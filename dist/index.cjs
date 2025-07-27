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
const generateBubbles = (seed, variant) => {
    const rng = new SeededRandom(seed);
    const bubbles = [];
    // Define color schemes for each variant
    const colorSchemes = {
        primary: [BUBBLE_COLORS.teal, BUBBLE_COLORS.pink, BUBBLE_COLORS.white],
        secondary: [BUBBLE_COLORS.pink, BUBBLE_COLORS.purple, BUBBLE_COLORS.white],
        tertiary: [BUBBLE_COLORS.purple, BUBBLE_COLORS.teal, BUBBLE_COLORS.white],
    };
    const schemes = colorSchemes[variant] || colorSchemes.primary;
    // Generate 4-6 bubbles for layered effect
    const bubbleCount = Math.floor(rng.range(4, 7));
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = {
            id: `bubble-${seed}-${i}`,
            cx: rng.range(20, 80), // Position as percentage
            cy: rng.range(20, 80),
            r: rng.range(25, 60), // Radius as percentage
            colors: schemes[i % schemes.length],
            opacity: rng.range(0.3, 0.8),
            animationDuration: rng.range(3, 8), // 3-8 seconds for faster movement
            animationDelay: rng.range(0, 2), // 0-2 second delay
            animationDirection: rng.next() > 0.5 ? "alternate" : "normal",
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
const Marble = ({ size = 100, seed = "default", className = "", variant = "primary", animated = false, }) => {
    const numericSeed = React__namespace.useMemo(() => stringToHash(seed), [seed]);
    const bubbles = React__namespace.useMemo(() => generateBubbles(numericSeed, variant), [numericSeed, variant]);
    const highlight = React__namespace.useMemo(() => generateHighlight(numericSeed), [numericSeed]);
    return (React__namespace.createElement("div", { className: clsx("relative overflow-hidden rounded-full", className), style: {
            width: size,
            height: size,
        } },
        React__namespace.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 100 100", className: "absolute inset-0" },
            React__namespace.createElement("defs", null,
                bubbles.map((bubble) => (React__namespace.createElement("radialGradient", { key: bubble.id, id: bubble.id, cx: "50%", cy: "30%", r: "70%" },
                    React__namespace.createElement("stop", { offset: "0%", stopColor: bubble.colors[0], stopOpacity: bubble.opacity }),
                    React__namespace.createElement("stop", { offset: "40%", stopColor: bubble.colors[1], stopOpacity: bubble.opacity * 0.7 }),
                    React__namespace.createElement("stop", { offset: "100%", stopColor: bubble.colors[2], stopOpacity: bubble.opacity * 0.3 })))),
                React__namespace.createElement("radialGradient", { id: `base-gradient-${seed}`, cx: "50%", cy: "50%", r: "50%" },
                    React__namespace.createElement("stop", { offset: "0%", stopColor: "#ffffff", stopOpacity: "0.4" }),
                    React__namespace.createElement("stop", { offset: "100%", stopColor: "#f8fafc", stopOpacity: "0.1" })),
                React__namespace.createElement("radialGradient", { id: highlight.id, cx: "50%", cy: "30%", r: "80%" },
                    React__namespace.createElement("stop", { offset: "0%", stopColor: "#ffffff", stopOpacity: highlight.opacity }),
                    React__namespace.createElement("stop", { offset: "60%", stopColor: "#ffffff", stopOpacity: highlight.opacity * 0.5 }),
                    React__namespace.createElement("stop", { offset: "100%", stopColor: "#ffffff", stopOpacity: "0" }))),
            React__namespace.createElement("circle", { cx: "50", cy: "50", r: "50", fill: variant === "primary"
                    ? "#e0f7fa"
                    : variant === "secondary"
                        ? "#fce4ec"
                        : "#f3e5f5" }),
            bubbles.map((bubble) => (React__namespace.createElement("circle", { key: bubble.id, cx: bubble.cx, cy: bubble.cy, r: bubble.r, fill: `url(#${bubble.id})`, style: {
                    mixBlendMode: "multiply",
                } }, animated && (React__namespace.createElement("animateTransform", { attributeName: "transform", type: "translate", values: `0,0; ${bubble.cx > 50 ? -5 : 5},${bubble.cy > 50 ? -4 : 4}; 0,0`, dur: `${bubble.animationDuration}s`, begin: `${bubble.animationDelay}s`, repeatCount: "indefinite", calcMode: "spline", keySplines: "0.4 0 0.6 1; 0.4 0 0.6 1", keyTimes: "0; 0.5; 1" }))))),
            React__namespace.createElement("circle", { cx: "50", cy: "50", r: "50", fill: `url(#base-gradient-${seed})` }),
            React__namespace.createElement("ellipse", { cx: highlight.cx, cy: highlight.cy, rx: highlight.rx, ry: highlight.ry, fill: `url(#${highlight.id})`, style: {
                    mixBlendMode: "screen",
                } }, animated && (React__namespace.createElement(React__namespace.Fragment, null,
                React__namespace.createElement("animateTransform", { attributeName: "transform", type: "translate", values: `0,0; ${highlight.cx > 50 ? -3 : 3},${highlight.cy > 50 ? -2.5 : 2.5}; 0,0`, dur: "5s", begin: "0.5s", repeatCount: "indefinite", calcMode: "spline", keySplines: "0.4 0 0.6 1; 0.4 0 0.6 1", keyTimes: "0; 0.5; 1" }),
                React__namespace.createElement("animate", { attributeName: "opacity", values: `0.2; ${highlight.opacity}; 0.2`, dur: "3s", begin: "0s", repeatCount: "indefinite" })))),
            React__namespace.createElement("circle", { cx: "50", cy: "50", r: "49", fill: "none", stroke: "rgba(255, 255, 255, 1)", strokeWidth: "30" }),
            React__namespace.createElement("circle", { cx: "50", cy: "50", r: "47.5", fill: "none", stroke: "rgba(255, 255, 255, 0.4)", strokeWidth: "1" }))));
};

exports.Marble = Marble;
//# sourceMappingURL=index.cjs.map
