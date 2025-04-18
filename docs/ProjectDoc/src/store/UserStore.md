# User Store Documentation

## Overview
The `userStore.ts` implements a Zustand store for managing user authentication and personal details. It provides persistence and actions for user management.

## Implementation

### Store Creation
```typescript
const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set, get) => ({
        // state and actions
      }),
      {
        name: 'user-store',
        partialize: state => ({
          personalDetails: state.personalDetails
        })
      }
    )
  )
);
```

## Store State
```typescript
{
  personalDetails: {
    username: string;
    id: string;
  }
}
```

## Actions

### setPersonalDetails
```typescript
setPersonalDetails: (personalDetails: PersonalDetails) => {
  set(
    {
      personalDetails
    },
    false
  );
}
```

### isUserLoggedIn
```typescript
isUserLoggedIn: () => {
  if (get().personalDetails.username !== '') {
    return true;
  }
  return false;
}
```

### logout
```typescript
logout: () => {
  localStorage.removeItem('user-store');
  set(
    {
      personalDetails: {
        username: '',
        id: ''
      }
    },
    false
  );
}
```

## Features
1. User authentication state
2. Personal details management
3. Local storage persistence
4. Dev tools integration
5. Login state tracking

## Usage

```typescript
import useUserStore from './userStore';

// Access store state
const { personalDetails, isUserLoggedIn } = useUserStore();

// Set user details
useUserStore.getState().setPersonalDetails({
  username: 'john_doe',
  id: 'user123'
});

// Check login status
const isLoggedIn = useUserStore.getState().isUserLoggedIn();

// Logout user
useUserStore.getState().logout();
```

## Technical Details

### Middleware Stack
1. Devtools - For debugging
2. Persist - For local storage

### Storage Configuration
```typescript
{
  name: 'user-store',
  partialize: state => ({
    personalDetails: state.personalDetails
  })
}
```

### Dependencies
- Zustand
- Zustand/devtools
- Zustand/middleware/persist

## Best Practices
1. Clear user data on logout
2. Persist only necessary data
3. Validate login state
4. Secure personal details
5. Handle authentication errors

## Security Considerations
1. Clear sensitive data on logout
2. Minimal data storage
3. Secure storage handling
4. Session management
5. Authentication validation

## Related Components
- User types
- Store initialization
- Authentication components
- Protected routes
