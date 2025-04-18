# SideNavbar CSS Module Documentation

## Overview
The CSS module for the `SideNavbar` component provides theme-aware styling with support for both light and dark modes, responsive layouts, and smooth transitions for the collapsible sidebar.

## Styles

### Navbar Container
```css
.navbar {
  background-color: light-dark(var(--mantine-color-white), var(--mantine-color-dark-6));
  height: 100vh;
  padding: var(--mantine-spacing-md);
  transition: all 0.3s ease;
  position: relative;
}
```

#### Features
- Full-height layout
- Theme-aware background
- Consistent padding
- Smooth transitions
- Border separation

### Navigation States

#### Open State
```css
.open {
  width: rem(300px);
}
```

#### Closed State
```css
.closed {
  width: 0;
  min-width: 0;
  transform: translate(-100%);
}
```

### Layout Sections

#### Header
```css
.header {
  padding: var(--mantine-spacing-md);
  margin-bottom: calc(var(--mantine-spacing-md) * 1.5);
  border-bottom: rem(1px) solid light-dark(
    var(--mantine-color-gray-3),
    var(--mantine-color-dark-4)
  );
}
```

#### Links Container
```css
.links {
  flex: 1;
  margin-left: calc(var(--mantine-spacing-md) * -1);
  margin-right: calc(var(--mantine-spacing-md) * -1);
}
```

#### Footer
```css
.footer {
  padding-top: var(--mantine-spacing-md);
  margin-top: var(--mantine-spacing-md);
  border-top: rem(1px) solid light-dark(
    var(--mantine-color-gray-3),
    var(--mantine-color-dark-4)
  );
}
```

## Theme Integration

### Color System
- Light/dark mode support
- Consistent color palette
- Proper contrast
- Border colors

### Spacing
- Mantine spacing variables
- Consistent margins
- Proper padding
- Responsive gaps

## Interactive States

### Link Styles
```css
.link {
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: var(--mantine-font-size-sm);
  color: light-dark(
    var(--mantine-color-gray-7),
    var(--mantine-color-dark-1)
  );
  border-radius: var(--mantine-radius-sm);
  font-weight: 500;
}
```

### Hover States
```css
@mixin hover {
  background-color: light-dark(
    var(--mantine-color-gray-0),
    var(--mantine-color-dark-6)
  );
  color: light-dark(
    var(--mantine-color-black),
    var(--mantine-color-white)
  );
}
```

### Active States
```css
&[data-active] {
  background-color: var(--mantine-color-blue-light);
  color: var(--mantine-color-blue-light-color);
}
```

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
import classes from './SideNavbar.module.css';

// Container
<nav className={classes.navbar}>

// Links
<a className={classes.link}>

// Sections
<div className={classes.header}>
<div className={classes.footer}>
```

### Customization
1. **Spacing**
   - Adjust padding/margin
   - Modify width
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
