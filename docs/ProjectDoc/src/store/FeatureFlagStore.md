# Feature Flag Store Documentation

## Overview
The `useFeatureFlagStore.ts` implements a Zustand store for managing feature flags in the application. It handles the loading, updating, and management of feature flags and their variants.

## Implementation

### Store Creation
```typescript
export const useFeatureFlagStore = create<
  FeatureFlagStoreState & FeatureFlagStoreActions
>()(
  devtools((set, get) => ({
    areFeatureFlagsLoaded: false,
    featureFlags: {},
    // ... actions
  }))
);
```

## Store State
```typescript
{
  areFeatureFlagsLoaded: boolean;
  featureFlags: FeatureFlagConfig;
}
```

## Actions

### fetchAllFeatureFlags
```typescript
fetchAllFeatureFlags() {
  // Loads feature flags from configuration
  // Currently loads from SideNavConfig
  // Future: Will fetch from server
}
```

### setFeatureFlag
```typescript
setFeatureFlag: (featureFlag: FeatureFlagConfig) => {
  set({ featureFlags: featureFlag });
}
```

### updateFeatureFlag
```typescript
updateFeatureFlag: (id: FEATURE_FLAG, featureFlag: FeatureFlagConfig) => {
  set(state => ({
    featureFlags: {
      ...state.featureFlags,
      [id]: featureFlag[id]
    }
  }));
}
```

### getFeatureFlag
```typescript
getFeatureFlag: (id: FEATURE_FLAG) => {
  return get().featureFlags[id];
}
```

### removeFeatureFlag
```typescript
removeFeatureFlag: (id: FEATURE_FLAG) => {
  const flags = get().featureFlags;
  delete flags[id];
  set({ featureFlags: flags }, true);
}
```

## Usage

```typescript
import { useFeatureFlagStore } from './useFeatureFlagStore';

// Access store state
const { featureFlags, areFeatureFlagsLoaded } = useFeatureFlagStore();

// Fetch flags
useFeatureFlagStore.getState().fetchAllFeatureFlags();

// Get specific flag
const flag = useFeatureFlagStore.getState().getFeatureFlag('FEATURE_ID');

// Update flag
useFeatureFlagStore.getState().updateFeatureFlag('FEATURE_ID', newConfig);
```

## Features
1. Feature flag management
2. Variant support
3. Configuration validation
4. Dev tools integration
5. Dynamic updates

## Technical Details

### Configuration Structure
```typescript
{
  [featureId]: {
    features: {
      [featureName]: FeatureFlagsState
    },
    variants: {
      [variantName]: {
        type: 'IMAGE' | 'PAGE',
        url: string
      }
    }
  }
}
```

### Dependencies
- Zustand
- Zustand/devtools
- Feature flag configuration files

## Best Practices
1. Always validate configuration before setting
2. Use type-safe feature flag IDs
3. Handle loading states appropriately
4. Implement proper error handling
5. Keep feature flags synchronized

## Related Components
- Side navigation configuration
- Feature flag types
- Store initialization
- UI components using feature flags
