# AddOrLoadProject Component Documentation

## Overview
The `AddOrLoadProject` component is a React component that provides functionality for both creating new projects and loading existing ones. It features a split-view interface with project creation on one side and project loading on the other.

## Features
- Create new projects with validation
- Load existing projects
- Form validation using Zod
- Automatic project synchronization
- Navigation to project pages

## Component Structure

### Dependencies
```typescript
- React (useEffect)
- react-hook-form
- react-hook-form-mantine
- react-router-dom
- @hookform/resolvers/zod
- @mantine/core
- zod
```

### State Management
- Uses Zustand through `useProjectStore`
- Form state managed by `react-hook-form`
- Project synchronization via `useSyncActions`

### Form Validation Schema
```typescript
const resolver = z.object({
  name: z.string().min(1, 'Project Name is required')
});
```

## Component Features

### Project Creation
1. **Form Handling**
   - Project name input with validation
   - Submit button for creation
   - Error handling and feedback

2. **Data Flow**
   - Form submission handling
   - Project creation through API
   - Automatic synchronization after creation

### Project Loading
1. **Project List**
   - Display of existing projects
   - Click-to-load functionality
   - Dynamic project navigation

2. **Navigation**
   - Automatic navigation to project page
   - Project state management
   - URL-based routing

## UI Components

### Layout
- Split view design (50/50)
- Dark themed forms
- Responsive layout

### Form Section
```tsx
<Box w="50%" p="md" bg="dark">
  <form>
    <TextInput
      withAsterisk
      control={addNewForm.control}
      name="name"
      placeholder="Project Name"
      label="Project Name"
    />
    <Button type="submit">Add Project</Button>
  </form>
</Box>
```

### Project List Section
```tsx
<Box w="50%" p="md" bg="dark">
  <Text>Load Project</Text>
  <Flex direction="row" wrap="wrap" gap="lg">
    {projects.map(project => (
      <Button onClick={() => handleOnLoadedProjectClick(project.id)}>
        {project.name}
      </Button>
    ))}
  </Flex>
</Box>
```

## State and Data Flow

### Project Creation Flow
1. User enters project name
2. Form validates input
3. On submit:
   - Creates project object
   - Posts to API
   - Syncs project list
   - Handles errors

### Project Loading Flow
1. Component loads existing projects
2. User clicks project button
3. System:
   - Sets active project
   - Navigates to project page
   - Updates URL

## Usage Example
```tsx
import AddOrLoadProject from './AddOrLoadProject';

function HomePage() {
  return (
    <div>
      <AddOrLoadProject />
    </div>
  );
}
```

## Props
The component doesn't accept any props as it's self-contained with internal state management.

## Styling
- Uses CSS modules (`AddOrLoadProject.module.css`)
- Mantine UI components
- Responsive design
- Dark theme integration

## Error Handling
- Form validation errors
- API error handling
- Project creation error feedback
- Loading state management

## Best Practices
1. **Form Validation**
   - Required field validation
   - Real-time validation feedback
   - Error message display

2. **State Management**
   - Centralized project state
   - Form state isolation
   - Synchronization handling

3. **User Experience**
   - Clear interface division
   - Intuitive project loading
   - Responsive feedback
   - Error state handling
