# Project Component Documentation

## Overview
The `Project` component is a React component that serves as the main project view page in the application. It provides a comprehensive interface for managing and viewing project-related content through different tabs.

## Features
- Project flow visualization
- Terminal integration
- Snapshots management
- Breadcrumb navigation
- Protected route access
- Side navigation

## Component Structure

### Dependencies
```typescript
- React (useEffect)
- react-router-dom (useParams)
- @mantine/core (UI components)
- @tabler/icons-react (Icons)
```

### Custom Hooks and Stores
- `useProjectOperations`: Handles project-related API operations
- `useFlowsStore`: Manages flow state
- `useProjectStore`: Manages project state

### Layout
The component uses a grid layout with two main sections:
1. Side Navigation (left)
2. Main Content Area (right)

### Tabs
The component includes three main tabs:
1. **Flow**: Displays the project flow visualization
2. **Terminal**: Shows the terminal interface
3. **Snapshots**: Displays project snapshots

## Component Lifecycle

### Initialization
On component mount:
1. Adds a new flow with the project ID
2. Sets the active project
3. Fetches project data and updates the flow state (nodes and edges)

### Navigation
- Implements breadcrumb navigation showing:
  - Home link
  - Current project name

## Props Interface
```typescript
interface ProjectParams {
  projectId: string;
}
```

## Usage
The Project component is typically accessed through routing with a project ID parameter:
```typescript
/project/:projectId
```

## Security
- Protected route implementation using the `Protected` HOC
- Requires authentication to access

## State Management
- Uses Zustand for state management
- Implements hydration support through `HydrationZustand` HOC

## Styling
- Uses Mantine UI components for consistent styling
- Responsive grid layout
- Custom height calculations for different panels
