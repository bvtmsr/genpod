# Project Notifications Documentation

## Overview
`ProjectNotificationFunctions` provides comprehensive notification coverage for all project-related operations, including creation, deletion, updates, and YAML file management.

## Features
- Project lifecycle notifications
- YAML file management
- Sync operations
- Success/failure feedback

## Implementation

```typescript
import { notifications } from '@mantine/notifications';

export const ProjectNotificationFunctions = {
  createdSuccessfully: (projectId: string) => {
    return notifications.show({
      title: 'Project Created',
      message: `Project with id: ${projectId} has been successfully created.`,
      color: 'green'
    });
  },
  deletedSuccessfully: (projectId: string) => {
    return notifications.show({
      title: 'Project Deleted',
      message: `Project with id: ${projectId} has been successfully deleted.`,
      color: 'green'
    });
  },
  updatedSuccessfully: (projectId: string) => {
    return notifications.show({
      title: 'Project Updated',
      message: `Project with id: ${projectId} has been successfully updated.`,
      color: 'green'
    });
  },
  uploadYamlFailed: (projectId: string, nodeId: string) => {
    return notifications.show({
      title: 'Failed to Upload Yaml',
      message: `Failed to upload yaml for project with id: ${projectId} and node with id: ${nodeId}.`,
      color: 'red'
    });
  },
  uploadedYamlSuccessfully: (projectId: string, nodeId: string) => {
    return notifications.show({
      title: 'Yaml Uploaded',
      message: `Yaml for project with id: ${projectId} and node with id: ${nodeId} has been successfully uploaded.`,
      color: 'green'
    });
  },
  failedToSync: (projectId: string) => {
    return notifications.show({
      title: 'Failed to Sync Project',
      message: `Failed to sync project with id: ${projectId}.`,
      color: 'red'
    });
  },
  syncedSuccessfully: (projectId: string) => {
    return notifications.show({
      title: 'Project Synced',
      message: `Project with id: ${projectId} has been successfully synced.`,
      color: 'green'
    });
  }
};
```

## Usage

### Basic Operations
```typescript
import { InAppNotifications } from '../notifications';

// Project creation
InAppNotifications.project.createdSuccessfully('project-123');

// Project deletion
InAppNotifications.project.deletedSuccessfully('project-123');

// Project update
InAppNotifications.project.updatedSuccessfully('project-123');
```

### YAML Operations
```typescript
// YAML upload success
InAppNotifications.project.uploadedYamlSuccessfully('project-123', 'node-456');

// YAML upload failure
InAppNotifications.project.uploadYamlFailed('project-123', 'node-456');
```

### Sync Operations
```typescript
// Sync success
InAppNotifications.project.syncedSuccessfully('project-123');

// Sync failure
InAppNotifications.project.failedToSync('project-123');
```

## Notification Categories

### Success Notifications
- Project creation
- Project deletion
- Project updates
- YAML uploads
- Project syncs

### Error Notifications
- YAML upload failures
- Sync failures

## Best Practices

1. **Usage Guidelines**
   - Include all IDs
   - Use appropriate timing
   - Handle all outcomes

2. **Error Handling**
   - Provide context
   - Show clear errors
   - Guide resolution

3. **Integration**
   - Project operations
   - File management
   - Sync processes

## Common Use Cases
1. Project management
2. YAML handling
3. Sync operations
4. Status updates

## Technical Details

### Success Configuration
- Green color
- Operation details
- ID inclusion

### Error Configuration
- Red color
- Failure context
- Recovery guidance

## Related Components
- Project manager
- YAML processor
- Sync service
- File handler

## Future Enhancements
- Progress tracking
- Batch operations
- Operation history
- Extended error details
- Custom notifications
