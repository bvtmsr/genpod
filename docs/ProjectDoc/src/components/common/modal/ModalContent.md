# ModalContent Component Documentation

## Overview
The `ModalContent` component is a React functional component that provides a form interface for adding new nodes in the application. It implements a simple form with a text input for the node name and handles form submission.

## Component Definition

```typescript
interface ModalContentProps {
  onSubmit: (nodeName: string) => void;
}

const ModalContent: React.FC<ModalContentProps> = ({ onSubmit }) => {
  // Component implementation
};
```

## Features
- Node name input field
- Form submission handling
- Space to underscore conversion
- Required field validation
- Auto-focus support

## Technical Implementation

### Dependencies
```typescript
import { Box, Button, Group, TextInput } from '@mantine/core';
import React, { useState } from 'react';
```

### State Management
```typescript
const [nodeName, setNodeName] = useState<string>('');
```

## Component Structure

### Form Layout
```tsx
<Box>
  <form onSubmit={handleSubmit}>
    <TextInput
      withAsterisk
      required
      label="Node Name"
      placeholder="Enter Node Name"
      data-autofocus
      value={nodeName}
      onChange={handleChange}
    />
    <Group mt="md">
      <Button type="submit">Submit</Button>
    </Group>
  </form>
</Box>
```

## Functionality

### Input Handling
1. **Text Input**
   - Required field
   - Automatic focus
   - Space to underscore conversion
   - Real-time value updates

2. **Form Submission**
   - Prevent default form behavior
   - Call onSubmit with node name
   - Clean form handling

### Event Handlers
```typescript
// Form submission handler
onSubmit={e => {
  e.preventDefault();
  onSubmit(nodeName);
}}

// Input change handler
onChange={e => setNodeName(e.target.value.replace(/\s+/g, '_'))}
```

## Usage

### Basic Usage
```tsx
function ParentComponent() {
  const handleSubmit = (nodeName: string) => {
    console.log('New node name:', nodeName);
  };

  return <ModalContent onSubmit={handleSubmit} />;
}
```

### With Modal
```tsx
modals.open({
  title: 'Add New Node',
  children: (
    <ModalContent
      onSubmit={(nodeName) => {
        // Handle node creation
        modals.closeAll();
      }}
    />
  )
});
```

## Props

### onSubmit
- **Type**: `(nodeName: string) => void`
- **Required**: Yes
- **Description**: Callback function called when the form is submitted
- **Parameters**:
  - `nodeName`: The processed node name (spaces replaced with underscores)

## UI Components

### TextInput
- Required field (withAsterisk)
- Auto-focus enabled
- Label: "Node Name"
- Placeholder: "Enter Node Name"
- Space to underscore conversion

### Button
- Type: submit
- Label: "Submit"
- Positioned with margin-top

## Styling

### Layout
- Box container
- Form structure
- Group spacing
- Margin handling

### Mantine Components
- Box for container
- TextInput for name field
- Button for submission
- Group for layout

## Best Practices

### Form Handling
1. **Input Validation**
   - Required field validation
   - Character replacement
   - Clean form submission

2. **User Experience**
   - Auto-focus on input
   - Clear placeholder
   - Visual feedback

### Error Handling
- Form validation
- Input processing
- Submission handling

## Integration

### With AddNodeModal
```tsx
<ModalContent
  onSubmit={(nodeName: string) => {
    const node: CustomNode = {
      data: {
        ...getInitialNodeFormData(type),
        name: nodeName,
        type
      },
      // Additional node properties
    };
    addNode(node);
    modals.closeAll();
  }}
/>
```

### With Flow Store
```tsx
const { addNode } = useFlowsStore();

// Usage in submit handler
onSubmit={(nodeName) => {
  addNode({
    data: { name: nodeName },
    // Additional node data
  });
}}
```

## Testing

### Test Cases
1. **Input Handling**
   ```tsx
   test('handles input changes', () => {
     render(<ModalContent onSubmit={jest.fn()} />);
     const input = screen.getByPlaceholderText('Enter Node Name');
     fireEvent.change(input, { target: { value: 'test node' } });
     expect(input.value).toBe('test_node');
   });
   ```

2. **Form Submission**
   ```tsx
   test('submits form with node name', () => {
     const onSubmit = jest.fn();
     render(<ModalContent onSubmit={onSubmit} />);
     const form = screen.getByRole('form');
     fireEvent.submit(form);
     expect(onSubmit).toHaveBeenCalled();
   });
   ```

## Performance Considerations
- Minimal state updates
- Efficient event handling
- Optimized re-renders
- Clean form reset

## Related Components
- `AddNodeModal`
- Flow store components
- Node type components

## Future Enhancements
- Additional input validation
- Enhanced error handling
- Custom node properties
- Form field expansion
