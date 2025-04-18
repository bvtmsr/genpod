# Canvas Store Documentation

## Overview
The canvas store system manages the state of the flow editor, including nodes, edges, and their relationships.

## Store Structure

### Flow Store
Located in `flowstore.ts`
- Node management
- Edge management
- Flow state
- Operations

### Store Types
Located in `types.store.ts`
- Type definitions
- Interfaces
- Enums
- Constants

## Implementation

### Flow Store Interface
```typescript
interface FlowStore {
  nodes: Node[];
  edges: Edge[];
  activeFlow: string | null;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
}
```

### State Management
```typescript
const useFlowStore = create<FlowStore>((set, get) => ({
  nodes: [],
  edges: [],
  activeFlow: null,
  // Store methods...
}));
```

## Features

### Node Management
1. Node creation
2. Node updates
3. Node deletion
4. Node selection

### Edge Management
1. Edge creation
2. Edge updates
3. Edge deletion
4. Connection handling

### Flow Operations
1. Flow selection
2. State persistence
3. Undo/Redo
4. Validation

## Usage

### Basic Usage
```typescript
const {
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect
} = useFlowStore();
```

### Flow Operations
```typescript
const {
  setActiveFlow,
  clearFlow,
  resetFlow
} = useFlowStore();
```

## State Structure

### Nodes State
1. Node data
2. Position
3. Type
4. Connections

### Edges State
1. Edge data
2. Source/Target
3. Type
4. Properties

## Operations

### Node Operations
1. Add node
2. Update node
3. Delete node
4. Move node

### Edge Operations
1. Add edge
2. Update edge
3. Delete edge
4. Validate connection

## Best Practices

### State Management
1. Immutable updates
2. Type safety
3. Error handling
4. Performance

### Data Flow
1. Unidirectional flow
2. Action creators
3. Selectors
4. Middleware

## Testing

### Unit Tests
1. Store creation
2. State updates
3. Operations
4. Selectors

### Integration Tests
1. Component integration
2. Flow operations
3. State persistence
4. Error handling

## Performance

### Optimization
1. State updates
2. Memoization
3. Batch operations
4. Memory management

### Monitoring
1. State changes
2. Performance metrics
3. Error tracking
4. Debug tools

## Error Handling

### Strategies
1. Validation
2. Error states
3. Recovery
4. Logging

### Implementation
1. Error actions
2. State recovery
3. User feedback
4. Debug info

## Documentation

### Requirements
1. Store purpose
2. API reference
3. Examples
4. Type definitions

### Guidelines
1. Code comments
2. Type safety
3. Examples
4. Best practices

## Resources

### Dependencies
1. Zustand
2. TypeScript
3. React Flow
4. Testing tools

### References
1. Store API
2. Type definitions
3. Best practices
4. Examples
