# Store Types Documentation

## Overview
The `types.ts` file defines TypeScript interfaces and types used across different stores in the application. It provides type safety and documentation for the store's state and actions.

## Type Definitions

### User Store Types
```typescript
interface UserStore {
  personalDetails: PersonalDetails;
  setPersonalDetails: (personalDetails: PersonalDetails) => void;
  isUserLoggedIn: () => boolean;
  logout: () => void;
}

interface PersonalDetails {
  username: string;
  id: string;
}
```

### Project Store Types
```typescript
interface Project {
  id: string;
  name: string;
  flow: {
    nodes: CustomNode[];
    edges: CustomEdge[];
  };
  requirements?: string;
}

type ProjectStoreState = {
  projects: Project[];
  activeProject: Project | null;
};

type ProjectStoreActions = {
  setProjects: (projects: Project[]) => void;
  setActiveProject: (projectId: string) => void;
  removeProject: (project: Project) => void;
  refreshProjects: () => Promise<void>;
};
```

### Feature Flag Store Types
```typescript
type FeatureFlagVariant = {
  type: 'IMAGE' | 'PAGE';
  url: string;
};

type FeatureFlagsList = {
  variants: {
    [keyName: string]: FeatureFlagVariant;
  };
  features: {
    [keyName: string]: FeatureFlagsState;
  };
};

type FeatureFlagConfig = {
  [configName: string | FEATURE_FLAG]: FeatureFlagsList;
};

type FeatureFlagStoreState = {
  featureFlags: FeatureFlagConfig;
  areFeatureFlagsLoaded: boolean;
};

type FeatureFlagStoreActions = {
  setFeatureFlag: (featureFlag: FeatureFlagConfig) => void;
  updateFeatureFlag: (id: FEATURE_FLAG, featureFlag: FeatureFlagConfig) => void;
  getFeatureFlag: (id: FEATURE_FLAG) => FeatureFlagsList;
  removeFeatureFlag: (id: FEATURE_FLAG) => void;
  fetchAllFeatureFlags: () => void;
};
```

### Project Snapshot Type
```typescript
type ProjectSnapshot = {
  createdAt: string;
  id: string;
  projectId: number;
  userId: number;
  flow: {
    nodes: CustomNode[];
    edges: CustomEdge[];
  };
  name: string;
  updatedAt: string;
  version: string;
};
```

## Usage
These types are used throughout the application to ensure type safety and provide proper TypeScript intellisense:

```typescript
// Using in store creation
const useProjectStore = create<ProjectStoreState & ProjectStoreActions>()(...);

// Using in components
const { projects, activeProject } = useProjectStore();
```

## Best Practices
1. Keep types synchronized with actual implementations
2. Use strict typing for better type inference
3. Document complex types with JSDoc comments
4. Use union types for variant handling
5. Keep related types grouped together

## Related Components
- UserStore
- ProjectStore
- FeatureFlagStore
- Canvas Store
