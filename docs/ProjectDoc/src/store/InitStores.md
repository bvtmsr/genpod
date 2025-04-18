# Store Initialization Documentation

## Overview
The `initStores.ts` file is responsible for initializing all Zustand stores in the application. It ensures that all stores are properly hydrated and ready for use when the application starts.

## Implementation
```typescript
import { useFlowsStore } from 'src/canvas/store/flowstore';
import { useProjectStore } from './useProjectStore';
import useUserStore from './userStore';
import { useFeatureFlagStore } from './useFeatureFlagStore';

export function initStores() {
  useUserStore.getState();
  useProjectStore.getState();
  useFlowsStore.getState();
  useFeatureFlagStore.getState();
}
```

## Stores Initialized
1. User Store (`useUserStore`)
   - Manages user authentication and personal details
   
2. Project Store (`useProjectStore`)
   - Handles project data and active project state
   
3. Flows Store (`useFlowsStore`)
   - Manages canvas flow state and operations
   
4. Feature Flag Store (`useFeatureFlagStore`)
   - Controls feature flags and variants

## Usage
```typescript
// Initialize all stores at application startup
import { initStores } from './store/initStores';

function App() {
  useEffect(() => {
    initStores();
  }, []);
  // ... rest of the app
}
```

## Best Practices
1. Call `initStores()` early in the application lifecycle
2. Initialize stores before any components try to access them
3. Handle any initialization errors appropriately

## Technical Details
- Uses Zustand's `getState()` to initialize each store
- No async operations in initialization
- Synchronous store setup

## Related Components
- UserStore
- ProjectStore
- FlowsStore
- FeatureFlagStore
