# LiquidEther Component

A beautiful 3D liquid simulation component built with Three.js for React applications.

## Features

- **Interactive 3D Liquid Simulation**: Real-time fluid dynamics with mouse interaction
- **Customizable Colors**: Multiple color presets and custom color schemes
- **Physics Controls**: Adjustable viscosity, bounce, and auto-demo settings
- **Performance Optimized**: Hardware-accelerated WebGL rendering
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Usage

```jsx
import LiquidEther from './LiquidEther';

<div style={{ width: '100%', height: 600, position: 'relative' }}>
  <LiquidEther
    colors={['#5227FF', '#FF9FFC', '#B19EEF']}
    mouseForce={20}
    cursorSize={100}
    isViscous={false}
    viscous={30}
    iterationsViscous={32}
    iterationsPoisson={32}
    resolution={0.5}
    isBounce={false}
    autoDemo={true}
    autoSpeed={0.5}
    autoIntensity={2.2}
    takeoverDuration={0.25}
    autoResumeDelay={3000}
    autoRampDuration={0.6}
  />
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `colors` | `string[]` | `['#5227FF', '#FF9FFC', '#B19EEF']` | Array of hex colors for the liquid particles |
| `mouseForce` | `number` | `20` | Strength of mouse interaction force |
| `cursorSize` | `number` | `100` | Size of the cursor influence area |
| `isViscous` | `boolean` | `false` | Enable viscous fluid effects |
| `viscous` | `number` | `30` | Viscosity level (0-100) |
| `iterationsViscous` | `number` | `32` | Number of viscous iterations |
| `iterationsPoisson` | `number` | `32` | Number of Poisson iterations |
| `resolution` | `number` | `0.5` | Simulation resolution (0.1-1.0) |
| `isBounce` | `boolean` | `false` | Enable boundary bouncing |
| `autoDemo` | `boolean` | `true` | Enable automatic demo animation |
| `autoSpeed` | `number` | `0.5` | Speed of auto demo animation |
| `autoIntensity` | `number` | `2.2` | Intensity of auto demo movement |
| `takeoverDuration` | `number` | `0.25` | Duration for mouse takeover effect |
| `autoResumeDelay` | `number` | `3000` | Delay before auto demo resumes |
| `autoRampDuration` | `number` | `0.6` | Duration for auto demo ramp |

## Color Presets

The component includes several beautiful color presets:

- **Purple Dream**: `['#5227FF', '#FF9FFC', '#B19EEF']`
- **Ocean Waves**: `['#00C9FF', '#92FE9D', '#00D4FF']`
- **Sunset Glow**: `['#FF6B6B', '#FFE66D', '#FF8E53']`
- **Forest Magic**: `['#11998E', '#38EF7D', '#56AB2F']`
- **Cosmic Dust**: `['#667EEA', '#764BA2', '#F093FB']`

## Technical Details

### Rendering
- **Three.js WebGL Renderer**: Hardware-accelerated 3D graphics
- **60 FPS Animation Loop**: Smooth, responsive animations
- **Responsive Design**: Automatically adapts to container size
- **Hardware Acceleration**: Optimized for modern GPUs

### Physics
- **Real-time Mouse Interaction**: Particles respond to cursor movement
- **Fluid Dynamics Simulation**: Realistic liquid behavior
- **Viscous Effects**: Configurable fluid viscosity
- **Boundary Collision**: Particles can bounce off boundaries

### Performance
- **Mobile Optimized**: Efficient rendering for mobile devices
- **Adaptive Quality**: Automatically adjusts quality based on device
- **Memory Efficient**: Optimized memory usage
- **Battery Friendly**: Minimizes battery drain

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Dependencies

- React 16.8+
- Three.js 0.150+
- WebGL support

## Installation

```bash
npm install three
```

## License

MIT License - Feel free to use in your projects!
