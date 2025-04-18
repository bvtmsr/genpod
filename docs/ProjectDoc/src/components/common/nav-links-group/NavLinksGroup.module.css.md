# NavLinksGroup CSS Module Documentation

## Overview
The CSS module for the `NavLinksGroup` component provides theme-aware styling with support for both light and dark modes. It implements interactive states and proper spacing for navigation elements.

## Styles

### Control Button
```css
.control {
  font-weight: 500;
  display: block;
  width: 100%;
  padding: var(--mantine-spacing-xs) var(--mantine-spacing-md);
  color: var(--mantine-color-text);
  font-size: var(--mantine-font-size-sm);
}
```

#### Features
- Full width layout
- Consistent padding
- Theme-aware text color
- Proper font sizing
- Hover state handling

### Link Style
```css
.link {
  font-weight: 500;
  display: block;
  text-decoration: none;
  padding: var(--mantine-spacing-xs) var(--mantine-spacing-md);
  padding-left: var(--mantine-spacing-md);
  margin-left: var(--mantine-spacing-xl);
  font-size: var(--mantine-font-size-sm);
  color: light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-0));
  border-left: 1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4));
}
```

#### Features
- Block display
- Nested indentation
- Left border indicator
- Theme-aware colors
- Consistent typography

### Chevron Animation
```css
.chevron {
  transition: transform 200ms ease;
}
```

#### Features
- Smooth rotation
- Consistent timing
- Clean animation

## Theme Integration

### Light/Dark Mode
- Color variables
- Background states
- Border colors
- Text contrast

### Spacing
- Mantine spacing system
- Consistent padding
- Proper indentation
- Margin handling

## Interactive States

### Hover Effects
```css
@mixin hover {
  background-color: light-dark(
    var(--mantine-color-gray-0),
    var(--mantine-color-dark-7)
  );
  color: light-dark(
    var(--mantine-color-black),
    var(--mantine-color-dark-0)
  );
}
```

### Features
- Theme-aware backgrounds
- Color transitions
- Text contrast
- Visual feedback

## Best Practices

### Theme Awareness
1. **Color Usage**
   - Light/dark variants
   - Proper contrast
   - Consistent palette

2. **Spacing**
   - Variable-based units
   - Responsive values
   - Consistent scale

### Typography
- Font size variables
- Weight consistency
- Line height
- Text colors

### Transitions
- Smooth animations
- Consistent timing
- Hardware acceleration
- Performance optimization

## Usage Guidelines

### Implementation
```tsx
import classes from './NavLinksGroup.module.css';

// Control button
<button className={classes.control}>
  {/* Content */}
</button>

// Link element
<a className={classes.link}>
  {/* Content */}
</a>

// Chevron icon
<icon className={classes.chevron} />
```

### Customization
1. **Spacing**
   - Adjust padding/margin
   - Modify indentation
   - Scale for different sizes

2. **Colors**
   - Theme override
   - Custom palettes
   - Contrast adjustments

3. **Animations**
   - Timing modifications
   - Custom transitions
   - State changes

## Performance Considerations
- Efficient selectors
- Minimal nesting
- Optimized transitions
- Clean specificity

## Browser Support
- Modern browsers
- Fallback styles
- Prefix handling
- Layout consistency

## Related Styles
- Mantine theme
- Global variables
- Component styles
- Animation utilities
