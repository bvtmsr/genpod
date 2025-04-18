# HydrationZustand Higher-Order Component

## Overview
`HydrationZustand` is a Higher-Order Component (HOC) designed to handle hydration of Zustand state during server-side rendering (SSR) and client-side hydration phases. It ensures that components using Zustand state are only rendered after proper hydration has occurred.

## Features
- Prevents hydration mismatch errors
- Handles SSR scenarios
- Manages client-side hydration state
- Provides safe rendering of children

## Implementation

```typescript
import { useEffect, useState } from 'react';

const HydrationZustand = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (typeof window === 'undefined') {
    return null;
  }

  if (!isHydrated) {
    return null;
  }

  return children;
};
```

## Usage

### Basic Usage
```typescript
import HydrationZustand from './hoc/hydrationZustand';

const App = () => {
  return (
    <HydrationZustand>
      <YourComponent />
    </HydrationZustand>
  );
};
```

### With Zustand Store
```typescript
import HydrationZustand from './hoc/hydrationZustand';
import useStore from './store';

const Component = () => {
  const state = useStore();
  
  return (
    <HydrationZustand>
      <div>{state.value}</div>
    </HydrationZustand>
  );
};
```

## How It Works

1. **Initial State**
   - Component starts with `isHydrated` set to `false`
   - Prevents initial render during hydration

2. **Server-Side Check**
   - Checks if `window` is undefined (server-side)
   - Returns `null` if running on server

3. **Hydration Process**
   - Uses `useEffect` to trigger hydration
   - Sets `isHydrated` to `true` after initial mount

4. **Render Control**
   - Returns `null` until hydration is complete
   - Renders children only after successful hydration

## Best Practices

1. **Usage Scope**
   - Wrap components that use Zustand state
   - Place at the highest necessary level
   - Avoid unnecessary nesting

2. **Performance**
   - Use sparingly to avoid render delays
   - Consider component tree structure
   - Optimize child components

## Related Components
- Zustand stores
- React components using Zustand
- Server-side rendering setup

## Future Enhancements
- Hydration status tracking
- Error boundary integration
- Performance monitoring
- Debug mode support
