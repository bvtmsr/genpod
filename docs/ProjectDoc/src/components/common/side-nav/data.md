# SideNavbar Data Configuration Documentation

## Overview
The `data.tsx` file contains the configuration for the navigation structure used in the `SideNavbar` component. It defines the navigation items, their icons, and routing information.

## Data Structure

### SideNavData Interface
```typescript
interface SideNavData {
  id: string;
  label: string;
  icon: (props: TablerIconsProps) => JSX.Element;
  initiallyOpened?: boolean;
  links?: { 
    label: string;
    link: string;
  }[];
}
```

## Navigation Items

### Architecture Diagrams
```typescript
{
  id: 'arch-diagrams',
  label: 'Arch Diagrams',
  icon: IconSitemap
}
```

### genPod
```typescript
{
  id: 'genpod',
  label: 'genPod',
  icon: IconCode,
  links: [
    {
      label: 'genPod',
      link: '/genpod'
    }
  ]
}
```

### Additional Sections
- genVal
- Networking
- Kubernetes (lac)
- CI (Tekton)
- CD (GitOps)
- SecOps
- And more...

## Icon Integration

### Icon Libraries
- Tabler Icons
- React Icons
- Custom icons

### Implementation
```typescript
import {
  IconAugmentedReality,
  IconBrandGit,
  IconCloudComputing,
  // ... other icons
} from '@tabler/icons-react';
import {
  FaChalkboardTeacher,
  FaNetworkWired,
  // ... other icons
} from 'react-icons/fa';
```

## Usage Guide

### Basic Implementation
```typescript
import { sideNavData } from './data';

const MyNavigation = () => (
  <SideNavbar data={sideNavData} />
);
```

### Custom Configuration
```typescript
const customNavData: SideNavData = [
  {
    id: 'custom-section',
    label: 'Custom Section',
    icon: CustomIcon,
    links: [
      {
        label: 'Custom Page',
        link: '/custom'
      }
    ]
  }
];
```

## Best Practices

### Data Organization
1. **Structure**
   - Clear IDs
   - Descriptive labels
   - Proper nesting
   - Consistent format

2. **Icons**
   - Appropriate size
   - Consistent style
   - Theme support
   - Performance

### Maintenance
- Regular updates
- Dead link checks
- Icon consistency
- Documentation sync

## Type Safety

### TypeScript Integration
- Strong typing
- Interface compliance
- Icon prop types
- Optional fields

### Error Prevention
- Required fields
- Type checking
- Prop validation
- Link validation

## Related Components
- SideNavbar
- NavBarLinksGroup
- Navigation system
- Routing configuration

## Future Enhancements
- Dynamic loading
- Nested categories
- Custom icons
- Route guards
- Analytics integration
