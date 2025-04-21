# HeaderDefault Component Documentation

## Overview
The `HeaderDefault` component is a React-based header component that implements the main navigation bar for the GenPod application. It provides essential navigation features, user controls, and theme management in a clean, modern interface.

## Features
- Application logo and branding
- Global search functionality
- User profile navigation
- Settings and logout options
- Theme toggle (dark/light mode)
- Notification access
- Responsive design

## Technical Implementation

### Dependencies
```typescript
import { ActionIcon, Autocomplete, Group, Menu, Tooltip } from '@mantine/core';
import { IconBell, IconLogout, IconMoon, IconSearch, IconSettings, IconSun, IconUser } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import GenPodLogo from 'src/assets/logos/GenpodLogo';
```

### State Management
```typescript
const { colorScheme, setColorScheme } = useMantineColorScheme({
  keepTransitions: true
});
const { logout } = useUserStore();
const navigate = useNavigate();
```

## Component Structure

### Layout
```tsx
<header className={classes.header}>
  <div className={classes.inner}>
    {/* Logo Section */}
    <Group>
      <Link to="/">
        <GenPodLogo />
      </Link>
    </Group>

    {/* Navigation and Controls */}
    <Group>
      {/* Search Bar */}
      {/* Navigation Links */}
      {/* Theme Toggle */}
    </Group>
  </div>
</header>
```

### Key Features

#### 1. Search Bar
```tsx
<Autocomplete
  className={classes.search}
  placeholder="Search"
  leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
/>
```

#### 2. Navigation Links
- Profile
- Settings
- Notifications
- Theme Toggle

#### 3. Settings Menu
```tsx
<Menu shadow="md" width={300}>
  <Menu.Target>
    <Tooltip label="Settings">
      <ActionIcon display="block" variant="transparent">
        <IconSettings />
      </ActionIcon>
    </Tooltip>
  </Menu.Target>
  <Menu.Dropdown>
    {/* Settings and Logout Options */}
  </Menu.Dropdown>
</Menu>
```

#### 4. Theme Toggle
```tsx
<Tooltip label="Toggle Theme">
  {colorScheme === 'dark' ? (
    <ActionIcon variant="gradient" bg="orange" onClick={() => setColorScheme('light')}>
      <IconSun />
    </ActionIcon>
  ) : (
    <ActionIcon bg="gray" variant="gradient" onClick={() => setColorScheme('dark')}>
      <IconMoon />
    </ActionIcon>
  )}
</Tooltip>
```

## Styling

### CSS Module Implementation
```css
.header {
  width: 100vw;
  background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
  border-bottom: rem(1px) solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4));
  padding: var(--mantine-spacing-md);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.inner {
  height: rem(56px);
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### Design Features
- Responsive layout
- Theme-aware colors
- Consistent spacing
- Smooth transitions
- Interactive hover states

## Functionality

### Navigation
- Home route (`/`)
- Profile route (`/profile`)
- Settings route (`/settings`)
- Notifications route (`/notifications`)
- Login route (`/login`) after logout

### Theme Management
- Dark/light mode toggle
- Persistent theme selection
- Smooth theme transitions

### User Authentication
- Logout functionality
- Session management
- Protected route navigation

## Usage Example
```tsx
import { HeaderDefault } from './HeaderDefault';

function Layout() {
  return (
    <div>
      <HeaderDefault />
      {/* Application Content */}
    </div>
  );
}
```

## Best Practices

### Accessibility
- Tooltip labels for icons
- Semantic HTML structure
- Keyboard navigation
- ARIA attributes

### Performance
- Optimized imports
- Efficient state updates
- Smooth transitions
- Responsive design

### User Experience
- Clear navigation
- Consistent styling
- Visual feedback
- Intuitive controls

## Error Handling
- Authentication state management
- Navigation guards
- Theme persistence
- Route protection

## Customization
1. **Theme**
   - Color scheme toggle
   - Custom gradients
   - Icon variations

2. **Layout**
   - Flexible spacing
   - Responsive design
   - Component alignment

3. **Interactions**
   - Hover effects
   - Click feedback
   - Transition animations

## Security Considerations
- Protected routes
- Secure logout
- Session management
- Navigation guards
