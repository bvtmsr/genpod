# Snapshots Component Documentation

## Overview
The `Snapshots` component is a React component that displays and manages project snapshots in a tabular format. It provides functionality to view, select, and load project snapshots with a user-friendly interface.

## Features
- Display project snapshots in a table
- Select multiple snapshots
- Load specific snapshots
- Real-time notifications
- Project navigation links
- Timestamp formatting

## Component Structure

### Dependencies
```typescript
- React (useEffect, useState)
- @mantine/core
- @mantine/notifications
- react-router-dom
```

### State Management
- Local state for snapshots using `useState`
- Local state for selected rows
- Project state through `useProjectStore`
- API operations via `useProjectOperations`

### Data Types
```typescript
interface ProjectSnapshot {
  id: string;
  version: string;
  projectId: string;
  userId: string;
  createdAt: string;
}
```

## Component Features

### Snapshot Fetching
1. **Initialization**
   - Automatically fetches snapshots on component mount
   - Handles active project context
   - Provides feedback through notifications

2. **Error Handling**
   - Success notifications
   - Error notifications
   - Null state handling

### Table Features
1. **Columns**
   - Selection checkbox
   - Version
   - Project ID (with link)
   - User ID
   - Creation timestamp
   - Actions

2. **Row Features**
   - Row selection
   - Background highlighting for selected rows
   - Load snapshot action
   - Project navigation link

## UI Components

### Table Structure
```tsx
<Table>
  <Table.Thead>
    <Table.Tr>
      <Table.Th />
      <Table.Th>Version</Table.Th>
      <Table.Th>Project ID</Table.Th>
      <Table.Th>User ID</Table.Th>
      <Table.Th>Created At</Table.Th>
      <Table.Th>Actions</Table.Th>
    </Table.Tr>
  </Table.Thead>
  <Table.Tbody>{rows}</Table.Tbody>
</Table>
```

### Row Component
```tsx
<Table.Tr>
  <Table.Td>
    <Checkbox
      checked={selectedRows.includes(snapshot.id)}
      onChange={handleCheckboxChange}
    />
  </Table.Td>
  <Table.Td>{snapshot.version}</Table.Td>
  <Table.Td>
    <Link to={`/project/${snapshot.projectId}`}>
      {snapshot.projectId}
    </Link>
  </Table.Td>
  {/* Other cells */}
</Table.Tr>
```

## State and Data Flow

### Data Fetching Flow
1. Component mounts
2. Checks for active project
3. Fetches snapshots if project exists
4. Updates state and shows notification

### Selection Management
1. User clicks checkbox
2. Updates selected rows state
3. Updates row styling
4. Maintains selection across renders

## Usage Example
```tsx
import Snapshots from './Snapshots';

function ProjectPage() {
  return (
    <div>
      <Snapshots />
    </div>
  );
}
```

## Props
The component doesn't accept any props as it uses internal state management and context.

## Styling
- Mantine UI components
- Dynamic row highlighting
- Scrollable table area
- Responsive design

## Notifications
1. **Success Notification**
   - Green color
   - Success message
   - Snapshot data confirmation

2. **Error Notification**
   - Red color
   - Error message
   - Error details

## Best Practices
1. **Data Handling**
   - Null checks
   - Loading states
   - Error boundaries

2. **User Experience**
   - Clear selection feedback
   - Easy navigation
   - Action confirmation
   - Timestamp formatting

3. **Performance**
   - Efficient state updates
   - Optimized rendering
   - Proper cleanup

## Error Handling
- API error handling
- Null snapshot handling
- Loading state management
- User feedback through notifications
