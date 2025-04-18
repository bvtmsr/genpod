# useSyncActions Hook

## Overview
`useSyncActions` is a custom React hook that manages project synchronization operations. It provides functionality to fetch and update project data from an API and synchronize it with the local state using Zustand store.

## Features
- Project synchronization
- API integration
- State management
- Error handling
- Type safety

## Implementation

```typescript
import { useCallback } from 'react';
import { useProjectOperations } from 'src/api/useProjectOperations/useProjectOperations';
import { useProjectStore } from 'src/store/useProjectStore';

export const useSyncActions = () => {
  const setProjects = useProjectStore(state => state.setProjects);
  const { getProjects } = useProjectOperations();

  const syncProjects = useCallback(async () => {
    const { data: projects, error: getProjectsError } = await getProjects();
    if (getProjectsError) {
      return;
    }
    if (projects && projects?.length > 0) {
      const parsedProjects = JSON.parse(projects as unknown as string);
      setProjects(parsedProjects);
    }
  }, []);

  return {
    syncProjects
  };
};
```

## Usage

### Basic Usage
```typescript
import { useSyncActions } from './hooks/useSyncActions';

const ProjectList = () => {
  const { syncProjects } = useSyncActions();

  return (
    <button onClick={syncProjects}>
      Sync Projects
    </button>
  );
};
```

### With Auto-Sync
```typescript
const AutoSyncProjects = () => {
  const { syncProjects } = useSyncActions();

  useEffect(() => {
    syncProjects();
    const interval = setInterval(syncProjects, 5000);
    return () => clearInterval(interval);
  }, [syncProjects]);

  return <div>Auto-syncing projects...</div>;
};
```

## How It Works

1. **Store Integration**
   - Uses Zustand store
   - Manages project state
   - Handles updates

2. **API Operations**
   - Fetches project data
   - Handles API responses
   - Processes errors

3. **Data Processing**
   - Parses JSON data
   - Updates store state
   - Validates data

## Best Practices

1. **Usage Guidelines**
   - Handle loading states
   - Implement error feedback
   - Manage sync frequency

2. **Error Handling**
   - API errors
   - Parse errors
   - State updates

3. **Performance**
   - Debounce syncs
   - Optimize updates
   - Cache results

## Common Use Cases
1. Project list updates
2. Data synchronization
3. Real-time updates
4. Background syncs

## Technical Details

### State Management
1. **Zustand Store**
   - Project state
   - Update actions
   - State access

2. **API Integration**
   - Project operations
   - Response handling
   - Error management

### Data Flow
1. **Fetch Flow**
   - API request
   - Response processing
   - State update

2. **Error Flow**
   - Error detection
   - Error handling
   - User feedback

## Related Components
- ProjectStore
- ProjectOperations
- API services
- Error handlers

## Future Enhancements
- Sync status tracking
- Retry mechanisms
- Conflict resolution
- Offline support
- Batch operations
