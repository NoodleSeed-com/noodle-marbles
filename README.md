# Marbles

Beautiful animated marble/bubble gradient components for React. Create stunning, deterministic marble avatars with customizable colors and gentle animations.

## Features

- 🎨 **Deterministic Generation**: Same seed always produces identical marble
- 🔤 **Text-Based Seeds**: Use emails, usernames, or any string as seeds
- 🎭 **Multiple Variants**: Primary (teal), Secondary (pink), Tertiary (purple)
- ✨ **Optional Animations**: Gentle bubble movement and highlight pulsing
- 📦 **Zero Dependencies**: Only requires React (clsx is optional)
- 🎯 **TypeScript Support**: Full type safety with exported interfaces
- 🚀 **Performance Optimized**: Memoized generation functions
- 📱 **Responsive**: SVG-based for crisp scaling at any size

## Installation

```bash
npm install marbles
```

## Basic Usage

```tsx
import { Marble } from 'marbles'

// Basic usage
<Marble seed="user@example.com" />

// With custom size and variant
<Marble
  seed="john.doe"
  size={120}
  variant="secondary"
/>

// Animated marble
<Marble
  seed="animated-marble"
  size={150}
  variant="tertiary"
  animated={true}
/>

// Spinning marble
<Marble
  seed="spinning-marble"
  size={120}
  variant="primary"
  rotate={true}
/>

// Both animated and spinning
<Marble
  seed="full-animation"
  size={140}
  variant="secondary"
  animated={true}
  rotate={true}
/>

// Custom border styling
<Marble
  seed="custom-border"
  size={120}
  borderWidth={15}
  borderColor="#ff6b6b"
/>

// No border
<Marble
  seed="no-border"
  size={100}
  borderWidth={0}
/>
```

## Props

| Prop          | Type                                     | Default                    | Description                                |
| ------------- | ---------------------------------------- | -------------------------- | ------------------------------------------ |
| `size`        | `number`                                 | `100`                      | Size of the marble in pixels               |
| `seed`        | `string`                                 | `"default"`                | Seed string for deterministic generation   |
| `className`   | `string`                                 | `""`                       | Additional CSS classes to apply            |
| `variant`     | `"primary" \| "secondary" \| "tertiary"` | `"primary"`                | Color variant to use                       |
| `animated`    | `boolean`                                | `false`                    | Whether to enable gentle animations        |
| `rotate`      | `boolean`                                | `false`                    | Whether to enable spinning rotation        |
| `borderWidth` | `number`                                 | `30`                       | Width of the border (0-30, 0 = no border)  |
| `borderColor` | `string`                                 | `"rgba(255, 255, 255, 1)"` | Color of the border (any CSS color format) |

## Color Variants

### Primary (Teal-dominant)

- Teal colors: `#00bec1`, `#4dd0e1`, `#80deea`
- Pink accents: `#fbc0c4`, `#f8bbd9`, `#f48fb1`
- Background: Light teal (`#e0f7fa`)

### Secondary (Pink-dominant)

- Pink colors: `#fbc0c4`, `#f8bbd9`, `#f48fb1`
- Purple accents: `#ad9db5`, `#ce93d8`, `#ba68c8`
- Background: Light pink (`#fce4ec`)

### Tertiary (Purple-dominant)

- Purple colors: `#ad9db5`, `#ce93d8`, `#ba68c8`
- Teal accents: `#00bec1`, `#4dd0e1`, `#80deea`
- Background: Light purple (`#f3e5f5`)

## Examples

### User Avatars

Perfect for generating consistent user avatars:

```tsx
import { Marble } from "marbles";

const UserAvatar = ({ user }) => (
  <Marble
    seed={user.email}
    size={64}
    variant="primary"
    className="border-2 border-white shadow-lg"
  />
);
```

### Category Icons

Use different variants for different categories:

```tsx
const CategoryIcon = ({ category }) => (
  <Marble
    seed={category.name}
    size={48}
    variant={category.type === "tech" ? "primary" : "secondary"}
    animated={true}
  />
);
```

### Profile Gallery

Create a gallery of animated marbles:

```tsx
const ProfileGallery = ({ users }) => (
  <div className="flex gap-4">
    {users.map((user, index) => (
      <Marble
        key={user.id}
        seed={user.username}
        size={80}
        variant={["primary", "secondary", "tertiary"][index % 3]}
        animated={true}
        className="hover:scale-110 transition-transform"
      />
    ))}
  </div>
);
```

### Border Customization

Control the border appearance with `borderWidth` and `borderColor`:

```tsx
// Thin colored borders
<Marble seed="thin-blue" borderWidth={10} borderColor="#3b82f6" />
<Marble seed="thin-green" borderWidth={10} borderColor="#10b981" />

// Medium borders with transparency
<Marble seed="medium-red" borderWidth={20} borderColor="rgba(239, 68, 68, 0.8)" />

// Thick gold border
<Marble seed="thick-gold" borderWidth={25} borderColor="#f59e0b" />

// No border for clean look
<Marble seed="clean" borderWidth={0} />

// Gradient-like effect with semi-transparent colors
<Marble seed="gradient" borderWidth={15} borderColor="rgba(139, 92, 246, 0.6)" />
```

## TypeScript

The package includes full TypeScript support:

```tsx
import { Marble, MarbleProps } from "marbles";

const CustomMarble: React.FC<MarbleProps> = (props) => {
  return <Marble {...props} />;
};
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

## How It Works

1. **String Hashing**: Converts seed strings to numeric hashes using a simple hash function
2. **Seeded Random**: Uses a linear congruential generator for deterministic randomness
3. **Bubble Generation**: Creates 4-6 bubble layers with random positions, sizes, and colors
4. **Highlight Generation**: Adds a dynamic white highlight blob for depth
5. **SVG Rendering**: Renders everything as scalable SVG with radial gradients

## Performance

- **Memoized Generation**: Bubble and highlight data is memoized based on seed and variant
- **Efficient Rendering**: Uses SVG for optimal performance and scaling
- **Small Bundle**: Under 10KB minified
- **Zero Runtime CSS**: All styles are inline

## Browser Support

Works in all modern browsers that support:

- SVG rendering
- CSS transforms and animations
- ES2018+ JavaScript features

## Use Cases

- **User Avatars**: Consistent, beautiful avatars for user profiles
- **Category Icons**: Visual representations for categories, tags, or groups
- **Decorative Elements**: Add visual interest to cards, headers, or sidebars
- **Loading States**: Animated marbles for loading indicators
- **Brand Elements**: Consistent visual elements across your application

## License

MIT © NoodleSeed

## Contributing

Issues and pull requests are welcome! Please visit our [GitHub repository](https://github.com/NoodleSeed-com/marbles).
