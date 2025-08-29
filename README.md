# Marbles

Beautiful animated marble/bubble gradient components for React. Create stunning, deterministic marble avatars with automatic color harmony generation from any brand colors.

## Features

- 🎨 **Automatic Color Harmony**: Generate beautiful color schemes from any brand color
- 🔤 **Text-Based Seeds**: Use emails, usernames, or any string as seeds
- 🌈 **Multiple Harmony Types**: Triadic, analogous, complementary, and monochromatic
- ✨ **Optional Animations**: Gentle bubble movement and highlight pulsing
- 📦 **Zero Dependencies**: Only requires React (clsx is optional)
- 🎯 **TypeScript Support**: Full type safety with exported interfaces
- 🚀 **Performance Optimized**: Memoized generation functions
- 📱 **Responsive**: SVG-based for crisp scaling at any size
- 🎭 **Fallback System**: Automatic color validation with intelligent fallbacks
- 🔄 **Deterministic Generation**: Same seed always produces identical marble

## Installation

```bash
npm install @noodleseed/marbles
```

## Basic Usage

```tsx
import { Marble } from '@noodleseed/marbles'

// Basic usage with automatic color harmony
<Marble seed="user@example.com" />

// With brand color - generates triadic harmony automatically
<Marble
  seed="john.doe"
  color="#3b82f6"
  size={120}
/>

// Different harmony types
<Marble
  seed="analogous-marble"
  color="#ef4444"
  harmonyType="analogous"
  size={150}
/>

// Multiple brand colors
<Marble
  seed="multi-color"
  color={["#3b82f6", "#ef4444", "#10b981"]}
  size={140}
/>

// Animated marble with custom harmony
<Marble
  seed="animated-marble"
  color="#8b5cf6"
  harmonyType="complementary"
  size={150}
  animated={true}
/>

// Spinning marble with monochromatic harmony
<Marble
  seed="spinning-marble"
  color="#f59e0b"
  harmonyType="monochromatic"
  size={120}
  rotate={true}
/>

// Custom border styling
<Marble
  seed="custom-border"
  color="#ec4899"
  size={120}
  borderWidth={15}
  borderColor="#fbbf24"
/>

// Fallback to variant when no color provided
<Marble
  seed="fallback-example"
  variant="secondary"
  size={100}
/>
```

## Props

| Prop          | Type                                                             | Default                    | Description                                |
| ------------- | ---------------------------------------------------------------- | -------------------------- | ------------------------------------------ |
| `size`        | `number`                                                         | `100`                      | Size of the marble in pixels               |
| `seed`        | `string`                                                         | `"default"`                | Seed string for deterministic generation   |
| `className`   | `string`                                                         | `""`                       | Additional CSS classes to apply            |
| `color`       | `string \| string[]`                                             | `undefined`                | Brand color(s) for harmony generation      |
| `harmonyType` | `"triadic" \| "analogous" \| "complementary" \| "monochromatic"` | `"triadic"`                | Type of color harmony to generate          |
| `variant`     | `"primary" \| "secondary" \| "tertiary"`                         | `"primary"`                | Fallback variant when no color provided    |
| `blendMode`   | `string`                                                         | `"multiply"`               | CSS blend mode for bubble layering         |
| `animated`    | `boolean`                                                        | `false`                    | Whether to enable gentle animations        |
| `rotate`      | `boolean`                                                        | `false`                    | Whether to enable spinning rotation        |
| `borderWidth` | `number`                                                         | `30`                       | Width of the border (0-30, 0 = no border)  |
| `borderColor` | `string`                                                         | `"rgba(255, 255, 255, 1)"` | Color of the border (any CSS color format) |

## Color Harmony System

### Automatic Harmony Generation

The marble component automatically generates beautiful color harmonies from your brand colors using color theory principles:

#### Triadic Harmony (Default)

Creates a vibrant, balanced palette using colors 120° apart on the color wheel:

```tsx
<Marble color="#3b82f6" harmonyType="triadic" />
// Generates: Blue → Red-Orange → Yellow-Green
```

#### Analogous Harmony

Creates a harmonious, natural palette using adjacent colors:

```tsx
<Marble color="#ef4444" harmonyType="analogous" />
// Generates: Red → Red-Orange → Orange
```

#### Complementary Harmony

Creates high contrast using opposite colors on the color wheel:

```tsx
<Marble color="#10b981" harmonyType="complementary" />
// Generates: Green → Red-Purple → Light Green
```

#### Monochromatic Harmony

Creates a sophisticated palette using different shades of the same hue:

```tsx
<Marble color="#8b5cf6" harmonyType="monochromatic" />
// Generates: Purple → Light Purple → Dark Purple
```

### Multiple Brand Colors

You can provide multiple brand colors for more complex harmonies:

```tsx
// Uses provided colors directly
<Marble color={["#3b82f6", "#ef4444", "#10b981"]} />

// Generates harmony from first color if more than 3 provided
<Marble color={["#3b82f6", "#ef4444", "#10b981", "#f59e0b"]} />
```

### Color Validation & Fallbacks

The system includes robust color validation:

- **Invalid Colors**: Automatically replaced with generated fallbacks
- **Insufficient Colors**: Missing colors generated using harmony rules
- **Malformed Hex**: Corrected or replaced with valid alternatives
- **Graceful Degradation**: Falls back to variant system if all colors invalid

### Fallback Variants

When no `color` prop is provided, the system uses predefined variants:

#### Primary (Teal-dominant)

- Teal colors: `#00bec1`, `#4dd0e1`, `#80deea`
- Pink accents: `#fbc0c4`, `#f8bbd9`, `#f48fb1`
- Background: Light teal (`#e0f7fa`)

#### Secondary (Pink-dominant)

- Pink colors: `#fbc0c4`, `#f8bbd9`, `#f48fb1`
- Purple accents: `#ad9db5`, `#ce93d8`, `#ba68c8`
- Background: Light pink (`#fce4ec`)

#### Tertiary (Purple-dominant)

- Purple colors: `#ad9db5`, `#ce93d8`, `#ba68c8`
- Teal accents: `#00bec1`, `#4dd0e1`, `#80deea`
- Background: Light purple (`#f3e5f5`)

## Examples

### Brand-Consistent Avatars

Generate avatars that match your brand colors:

```tsx
import { Marble } from "@noodleseed/marbles";

const BrandAvatar = ({ user, brandColor }) => (
  <Marble
    seed={user.email}
    color={brandColor}
    harmonyType="triadic"
    size={64}
    className="border-2 border-white shadow-lg"
  />
);

// Usage with different brand colors
<BrandAvatar user={user} brandColor="#3b82f6" /> // Blue theme
<BrandAvatar user={user} brandColor="#ef4444" /> // Red theme
<BrandAvatar user={user} brandColor="#10b981" /> // Green theme
```

### Dynamic Category Icons

Use different harmony types for different categories:

```tsx
const CategoryIcon = ({ category }) => {
  const harmonyMap = {
    tech: "triadic",
    design: "analogous",
    business: "complementary",
    personal: "monochromatic",
  };

  return (
    <Marble
      seed={category.name}
      color={category.brandColor}
      harmonyType={harmonyMap[category.type]}
      size={48}
      animated={true}
    />
  );
};
```

### Multi-Brand Gallery

Create galleries with consistent harmony across different brands:

```tsx
const BrandGallery = ({ brands }) => (
  <div className="flex gap-4">
    {brands.map((brand) => (
      <Marble
        key={brand.id}
        seed={brand.name}
        color={brand.primaryColor}
        harmonyType="triadic"
        size={80}
        animated={true}
        className="hover:scale-110 transition-transform"
      />
    ))}
  </div>
);
```

### Rebranding Support

Perfect for companies going through rebranding:

```tsx
// Before rebrand
<Marble seed="company" color="#ff6b6b" harmonyType="triadic" />

// After rebrand - same seed, new colors
<Marble seed="company" color="#3b82f6" harmonyType="triadic" />
// Maintains same bubble pattern but with new brand colors!
```

## TypeScript

The package includes full TypeScript support:

```tsx
import { Marble, MarbleProps } from "@noodleseed/marbles";

const CustomMarble: React.FC<MarbleProps> = (props) => {
  return <Marble {...props} />;
};

// Type-safe harmony types
type HarmonyType = "triadic" | "analogous" | "complementary" | "monochromatic";
```

## Animation Details

When `animated={true}`:

- **Bubble Layers**: Gentle translation movement (±5/±4 units) over 3-8 seconds
- **Highlight Blob**: Position movement (±3/±2.5 units) over 5 seconds
- **Opacity Pulsing**: Highlight opacity pulses from 20% to full over 3 seconds
- **Staggered Timing**: Each element has randomized delays and durations
- **Smooth Easing**: Uses spline-based easing for natural movement

When `rotate={true}`:

- **Spinning Motion**: Entire marble rotates 360 degrees continuously over 4 seconds
- **Smooth Rotation**: Linear rotation animation with no easing for consistent speed
- **Independent Animation**: Rotation works independently and can be combined with `animated={true}`

## Advanced Features

### Varied Gradient Patterns

Each bubble uses one of 5 different gradient patterns for visual variety:

- **Center Focus**: Standard centered gradient
- **Upper Left**: Gradient focused on upper-left area
- **Lower Right**: Gradient focused on lower-right area
- **Off-Center**: Slightly offset gradient center
- **Wide Spread**: Larger gradient radius for softer effect

### Blend Modes

Control how bubble layers interact:

```tsx
<Marble
  color="#3b82f6"
  blendMode="overlay"     // High contrast
/>
<Marble
  color="#ef4444"
  blendMode="soft-light"  // Subtle blending
/>
<Marble
  color="#10b981"
  blendMode="multiply"    // Default, rich colors
/>
```

### Deterministic Generation

Same seed + same color always produces identical results:

```tsx
// These will always look identical
<Marble seed="user123" color="#3b82f6" />
<Marble seed="user123" color="#3b82f6" />

// Different seed = different pattern, same colors
<Marble seed="user456" color="#3b82f6" />
```

## How It Works

1. **Color Processing**: Validates and normalizes input colors
2. **Harmony Generation**: Creates color schemes using HSL color space mathematics
3. **String Hashing**: Converts seed strings to numeric hashes
4. **Seeded Random**: Uses deterministic randomness for consistent results
5. **Bubble Generation**: Creates 4-6 bubble layers with varied gradient patterns
6. **Highlight Generation**: Adds dynamic white highlight blob for depth
7. **SVG Rendering**: Renders as scalable SVG with radial gradients

## Performance

- **Memoized Generation**: Bubble and highlight data cached based on inputs
- **Efficient Color Processing**: Optimized HSL/Hex conversions
- **Small Bundle**: Under 15KB minified
- **Zero Runtime CSS**: All styles are inline
- **Deterministic Caching**: Same inputs always return cached results

## Browser Support

Works in all modern browsers that support:

- SVG rendering
- CSS transforms and animations
- ES2018+ JavaScript features

## Migration from v1.3.x

The new color system is backward compatible:

```tsx
// v1.3.x - still works
<Marble variant="primary" seed="user" />

// v1.4.x - new color system
<Marble color="#3b82f6" seed="user" />
```

## Use Cases

- **Brand-Consistent Avatars**: User avatars matching your brand colors
- **Dynamic Theming**: Marbles that adapt to theme changes
- **Multi-Brand Platforms**: Consistent visual language across different brands
- **Rebranding Support**: Easy color updates during brand transitions
- **Category Visualization**: Different harmony types for different content types
- **Loading States**: Animated marbles for loading indicators

## License

MIT © NoodleSeed

## Contributing

Issues and pull requests are welcome! Please visit our [GitHub repository](https://github.com/NoodleSeed-com/noodle-marbles).
