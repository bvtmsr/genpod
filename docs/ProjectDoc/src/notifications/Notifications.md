# Notifications System Documentation

## Overview
The notifications system provides a centralized way to manage and display in-app notifications using Mantine's notification system. It is organized into different categories for better separation of concerns and maintainability.

## Structure

```typescript
// Index structure
export const InAppNotifications = {
  project: ProjectNotificationFunctions,
  code: CodeNotificationFunctions,
  app: AppNotificationFunctions
};
```

## Categories

### App Notifications
Basic application-level notifications for core functionality.

```typescript
export const AppNotificationFunctions = {
  failedToConnectToServer: () => {
    return notifications.show({
      title: 'Failed to Connect to Server',
      message: 'Failed to connect to the server.',
      color: 'red'
    });
  }
};
```

### Code Notifications
Notifications related to code generation and management.

```typescript
export const CodeNotificationFunctions = {
  failedToGenerate: (message?: string) => {
    return notifications.show({
      title: 'Failed to Generate Code',
      message: message || 'Failed to generate code for the project.',
      color: 'red'
    });
  },
  generatedSuccessfully: (projectId: string) => {
    return notifications.show({
      title: 'Code Generated',
      message: `Code for project with id: ${projectId} has been successfully generated.`,
      color: 'green'
    });
  }
};
```

### Project Notifications
Notifications for project-related operations.

```typescript
export const ProjectNotificationFunctions = {
  createdSuccessfully: (projectId: string) => { /* ... */ },
  deletedSuccessfully: (projectId: string) => { /* ... */ },
  updatedSuccessfully: (projectId: string) => { /* ... */ },
  uploadYamlFailed: (projectId: string, nodeId: string) => { /* ... */ },
  uploadedYamlSuccessfully: (projectId: string, nodeId: string) => { /* ... */ },
  failedToSync: (projectId: string) => { /* ... */ },
  syncedSuccessfully: (projectId: string) => { /* ... */ }
};
```

## Usage

### Basic Usage
```typescript
import { InAppNotifications } from 'src/notifications';

// Show server connection error
InAppNotifications.app.failedToConnectToServer();

// Show successful code generation
InAppNotifications.code.generatedSuccessfully('project-123');

// Show project creation success
InAppNotifications.project.createdSuccessfully('project-123');
```

### With Error Handling
```typescript
try {
  await generateCode();
  InAppNotifications.code.generatedSuccessfully(projectId);
} catch (error) {
  InAppNotifications.code.failedToGenerate(error.message);
}
```

## Notification Types

### Success Notifications
- Green color
- Positive messages
- Operation confirmations

### Error Notifications
- Red color
- Error messages
- Failure notifications

## Best Practices

1. **Usage Guidelines**
   - Use appropriate category
   - Keep messages clear
   - Include relevant IDs

2. **Message Format**
   - Consistent styling
   - Clear titles
   - Descriptive messages

3. **Error Handling**
   - Include error details
   - Provide guidance
   - Show recovery steps

## Integration

### With Components
```typescript
const ProjectComponent = () => {
  const handleCreate = async () => {
    try {
      const id = await createProject();
      InAppNotifications.project.createdSuccessfully(id);
    } catch {
      InAppNotifications.app.failedToConnectToServer();
    }
  };
};
```

### With API Calls
```typescript
const syncProject = async (id: string) => {
  try {
    await api.sync(id);
    InAppNotifications.project.syncedSuccessfully(id);
  } catch {
    InAppNotifications.project.failedToSync(id);
  }
};
```

## Future Enhancements
- Notification queuing
- Custom durations
- Action buttons
- Notification history
- Custom themes
- Priority levels
- Grouping support
