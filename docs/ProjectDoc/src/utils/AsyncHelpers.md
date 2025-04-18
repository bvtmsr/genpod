# Async Helpers Documentation

## Overview
The `asyncHelpers.ts` module provides utility functions for handling asynchronous operations and timing in the application.

## Functions

### sleep
```typescript
function sleep(ms: number): Promise<void>
```
Creates a promise that resolves after a specified delay.

#### Parameters
- `ms`: Number of milliseconds to sleep

#### Usage
```typescript
// Wait for 1 second
await sleep(1000);
```

### runWithDelay
```typescript
function runWithDelay(fn: () => unknown, ms = 500): NodeJS.Timeout
```
Executes a function after a specified delay.

#### Parameters
- `fn`: Function to execute
- `ms`: Delay in milliseconds (default: 500)

#### Usage
```typescript
// Run function after 2 seconds
runWithDelay(() => {
  console.log('Delayed execution');
}, 2000);
```

## Features
1. Promise-based sleep function
2. Delayed function execution
3. Default delay timing
4. Type-safe implementation

## Best Practices
1. Use for rate limiting
2. Handle cleanup in components
3. Clear timeouts when necessary
4. Consider performance impact

## Common Use Cases
1. Debouncing user input
2. Delayed UI updates
3. Sequential animations
4. API rate limiting
5. Staggered operations

## Technical Details

### Sleep Implementation
- Uses Promise constructor
- Resolves after timeout
- No rejection handling needed

### RunWithDelay Implementation
- Uses setTimeout
- Returns timeout handle
- Supports function parameter
- Optional delay parameter

## Related Components
- API calls
- UI animations
- User input handling
- State updates
