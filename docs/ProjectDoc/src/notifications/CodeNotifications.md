# Code Notifications Documentation

## Overview
`CodeNotificationFunctions` provides notifications related to code generation and management operations. It offers feedback for both successful and failed code generation attempts.

## Features
- Code generation status
- Error reporting
- Success confirmation
- Custom error messages

## Implementation

```typescript
import { notifications } from '@mantine/notifications';

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

## Usage

### Basic Usage
```typescript
import { InAppNotifications } from '../notifications';

// Show generation success
InAppNotifications.code.generatedSuccessfully('project-123');

// Show generation failure
InAppNotifications.code.failedToGenerate('Invalid template configuration');
```

### With Error Handling
```typescript
const generateProjectCode = async (projectId: string) => {
  try {
    await codeGenerator.generate(projectId);
    InAppNotifications.code.generatedSuccessfully(projectId);
  } catch (error) {
    InAppNotifications.code.failedToGenerate(error.message);
  }
};
```

## Notification Types

### Success Notifications
```typescript
// Successful generation
InAppNotifications.code.generatedSuccessfully(projectId);
```

### Error Notifications
```typescript
// Failed generation with custom message
InAppNotifications.code.failedToGenerate('Template validation failed');

// Failed generation with default message
InAppNotifications.code.failedToGenerate();
```

## Best Practices

1. **Usage Guidelines**
   - Include project IDs
   - Provide error context
   - Use clear messages

2. **Error Handling**
   - Catch specific errors
   - Show helpful messages
   - Guide next steps

3. **Message Format**
   - Be specific
   - Include IDs
   - Show context

## Common Use Cases
1. Code generation
2. Template processing
3. Build operations
4. Compilation status

## Technical Details

### Success Configuration
- Green color
- Project ID inclusion
- Clear success message

### Error Configuration
- Red color
- Custom error message
- Default fallback

## Related Components
- Code generator
- Template processor
- Build system
- Project manager

## Future Enhancements
- Progress notifications
- Warning messages
- Build status updates
- Template validations
- Generation metrics
