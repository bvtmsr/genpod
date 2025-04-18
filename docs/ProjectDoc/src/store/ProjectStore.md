# Project Store Documentation

## Overview
The `useProjectStore.ts` implements a Zustand store for managing project data in the application. It handles project state, persistence, and provides actions for project management.

## Implementation

### Store Creation
```typescript
export const useProjectStore = create<ProjectStoreState & ProjectStoreActions>()(
  devtools(
    persist(
      immer((set, get) => ({
        // state and actions
      })),
      {
        name: 'project-store',
        partialize: (state) => ({
          activeProject: state.activeProject,
          projects: state.projects
        })
      }
    )
  )
);
```

## Store State
```typescript
{
  activeProject: Project | null;
  projects: Project[];
}
```

## Actions

### setActiveProject
```typescript
setActiveProject: (projectId: string) => {
  if (!projectId) return set({ activeProject: null });
  const activeProject = get().projects.find(p => p.id == projectId);
  return set({ activeProject });
}
```

### setProjects
```typescript
setProjects: (projects: Project[]) => {
  set({ projects });
}
```

### refreshProjects
```typescript
refreshProjects: async () => {
  const { data } = await axiosMiddleware.get(`/projects`);
  const parsedData = JSON.parse(data as unknown as string);
  set({ projects: parsedData });
}
```

### removeProject
```typescript
removeProject: (project: Project) => {
  set(state => {
    const newProjects = state.projects.filter(p => p.id !== project.id);
    return { projects: newProjects };
  });
}
```

## Features
1. Project state management
2. Active project tracking
3. Local storage persistence
4. Immer integration for immutable updates
5. Dev tools support

## Usage

```typescript
import { useProjectStore } from './useProjectStore';

// Access store state
const { projects, activeProject } = useProjectStore();

// Set active project
useProjectStore.getState().setActiveProject('project-id');

// Refresh projects
await useProjectStore.getState().refreshProjects();

// Remove project
useProjectStore.getState().removeProject(projectToRemove);
```

## Technical Details

### Middleware Stack
1. Devtools - For debugging
2. Persist - For local storage
3. Immer - For immutable updates

### Storage Configuration
```typescript
{
  name: 'project-store',
  partialize: (state) => ({
    activeProject: state.activeProject,
    projects: state.projects
  })
}
```

### Dependencies
- Zustand
- Zustand/devtools
- Zustand/middleware/immer
- Axios middleware

## Best Practices
1. Use immer for state updates
2. Persist only necessary state
3. Handle async operations properly
4. Maintain proper project references
5. Clean up removed projects

## Related Components
- Project types
- Store initialization
- Axios middleware
- Project components
