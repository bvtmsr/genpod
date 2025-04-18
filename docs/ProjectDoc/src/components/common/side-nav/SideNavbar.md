# SideNavbar Component Documentation

## Overview
The `SideNavbar` component is a responsive, collapsible navigation sidebar that provides the main navigation structure for the application. It features theme switching, user controls, and dynamic navigation items with support for feature flags.

## Features
- Collapsible sidebar navigation
- Theme toggle (light/dark mode)
- User profile and logout functionality
- Feature flag integration
- Coming soon states
- Responsive design
- Smooth animations

## Technical Implementation

### Dependencies
```typescript
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserOperations } from 'src/api/useUserOperations';
import { useFeatureFlagStore } from 'src/store/useFeatureFlagStore';
import useUserStore from 'src/store/userStore';
import { Mantine Components } from '@mantine/core';
import { Tabler Icons } from '@tabler/icons-react';
```

### Props Interface
```typescript
interface SideNavbarProps {
  data: SideNavData;
}
```

## Component Structure

### Main Elements
1. **Header Section**
   - Logo
   - Theme toggle
   - Search functionality

2. **Navigation Links**
   - Dynamic link generation
   - Feature flag support
   - Coming soon states

3. **Footer Section**
   - User controls
   - Logout functionality

## State Management

### Local State
```typescript
const [isNavOpen, setIsNavOpen] = useState(true);
```

### Global State
- Theme management
- Feature flags
- User authentication

## Feature Flag Integration

### Implementation
```typescript
const { getFeatureFlag } = useFeatureFlagStore();
const flagConfig = getFeatureFlag(FEATURE_FLAG.SIDE_NAV);
```

### States
- Active
- Hidden
- Coming Soon
- Feature variants

## Navigation Rendering

### Link Generation
```typescript
const links = data.map(item => {
  if (flagConfig.features[item.id] === 'hidden') return null;
  if (flagConfig.features[item.id] === 'coming-soon') {
    // Coming soon handling
    return <NavBarLinksGroupForComingSoon {...props} />;
  }
  return <NavBarLinksGroup {...item} />;
});
```

## Styling

### Layout
- Full-height sidebar
- Smooth transitions
- Responsive widths
- Theme-aware colors

### Interactions
- Hover states
- Active states
- Animation effects
- Toggle behavior

## Best Practices

### Performance
- Efficient rendering
- Optimized animations
- State management
- Feature flag handling

### Accessibility
- Keyboard navigation
- ARIA attributes
- Focus management
- Screen reader support

### Responsiveness
- Mobile-friendly
- Collapsible design
- Adaptive layout
- Touch support

## Usage Examples

### Basic Implementation
```tsx
import { SideNavbar } from './SideNavbar';
import { sideNavData } from './data';

function App() {
  return (
    <SideNavbar data={sideNavData} />
  );
}
```

### With Feature Flags
```tsx
const flaggedNavData = {
  ...sideNavData,
  features: {
    'feature-id': 'coming-soon'
  }
};

<SideNavbar data={flaggedNavData} />
```

## Testing Considerations

### Test Cases
1. **Rendering**
   - Initial state
   - Collapsed state
   - Feature flag states
   - Theme variations

2. **Interactions**
   - Toggle behavior
   - Link navigation
   - Theme switching
   - Logout flow

3. **Feature Flags**
   - Hidden features
   - Coming soon states
   - Variant handling

## Related Components
- NavBarLinksGroup
- NavBarLinksGroupForComingSoon
- GenPodLogo
- Layout components

## Future Enhancements
- Nested navigation levels
- Search improvements
- Custom themes
- Animation options
- Mobile optimizations
