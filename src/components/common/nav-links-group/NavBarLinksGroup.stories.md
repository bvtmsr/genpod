# NavBarLinksGroup Stories Documentation

## Overview
The Storybook stories for the `NavBarLinksGroup` component showcase various usage scenarios and prop combinations. These stories serve as both documentation and testing environments for the component.

## Story Configuration

### Meta Configuration
```typescript
const meta: Meta = {
  title: 'Components/NavBarLinksGroup',
  component: NavBarLinksGroup,
  argTypes: {
    initiallyOpened: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof NavBarLinksGroup>
```

## Stories

### Default Story
```typescript
export const Default: StoryObj<typeof meta> = {
  args: {
    icon: IconHome2,
    label: 'Home',
    initiallyOpened: false,
    links: [
      { label: 'Dashboard', link: '/dashboard' },
      { label: 'Settings', link: '/settings' },
    ],
  },
}
```

#### Features
- Icon integration
- Multiple links
- Collapsible state
- Default configuration

### NoSubLinks Story
```typescript
export const NoSubLinks: StoryObj<typeof meta> = {
  args: {
    icon: IconHome2,
    label: 'Home',
  },
}
```

#### Features
- Simple navigation
- Icon-only variant
- No nested links
- Basic implementation

## Usage Guide

### Basic Implementation
```tsx
import { NavBarLinksGroup } from './NavLinksGroup';
import { IconHome2 } from '@tabler/icons-react';

const MyNavigation = () => (
  <NavBarLinksGroup
    icon={IconHome2}
    label="Home"
    links={[
      { label: 'Dashboard', link: '/dashboard' },
      { label: 'Settings', link: '/settings' },
    ]}
  />
);
```

### Props Configuration
1. **Required Props**
   - icon
   - label

2. **Optional Props**
   - initiallyOpened
   - links

## Testing Scenarios

### Interactive Testing
- Click behavior
- Link navigation
- Collapse animation
- Icon rendering

### Props Testing
- Required props
- Optional props
- Edge cases
- Error states

## Best Practices

### Story Organization
1. **Naming**
   - Clear story names
   - Descriptive titles
   - Logical grouping

2. **Documentation**
   - Prop descriptions
   - Usage examples
   - Implementation notes

### Component Testing
- Interaction testing
- Visual regression
- Accessibility checks
- Responsive design

## Development Guidelines

### Adding New Stories
1. **Story Creation**
   ```typescript
   export const NewVariant: StoryObj<typeof meta> = {
     args: {
       // Component props
     },
   }
   ```

2. **Documentation**
   - Story description
   - Props explanation
   - Usage notes

### Story Maintenance
- Regular updates
- Prop validation
- Documentation sync
- Test coverage

## Related Components
- Navigation components
- Icon components
- Link handlers
- Theme integration

## Future Enhancements
- Additional variants
- Complex scenarios
- Edge cases
- Interactive examples
