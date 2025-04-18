# Protected Higher-Order Component

## Overview
`Protected` is a Higher-Order Component (HOC) that implements route protection based on user authentication status. It ensures that protected routes are only accessible to authenticated users, redirecting unauthorized access to the login page.

## Features
- Authentication check
- Automatic redirection
- Route protection
- Integration with Zustand store

## Implementation

```typescript
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from 'src/store/userStore';

const Protected = ({ children }: { children: ReactNode }) => {
  const { isUserLoggedIn } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate('/login');
    }
  }, [isUserLoggedIn, navigate]);

  if (!isUserLoggedIn()) {
    return null;
  }

  return children;
};
```

## Usage

### Basic Usage
```typescript
import Protected from './hoc/protected';

const PrivateRoute = () => {
  return (
    <Protected>
      <YourSecureComponent />
    </Protected>
  );
};
```

### With Router
```typescript
import Protected from './hoc/protected';
import { Route } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/secure" 
        element={
          <Protected>
            <SecurePage />
          </Protected>
        } 
      />
    </Routes>
  );
};
```

## How It Works

1. **Authentication Check**
   - Uses Zustand store for auth state
   - Checks user login status
   - Controls render flow

2. **Navigation Control**
   - Utilizes React Router
   - Handles unauthorized access
   - Manages redirections

3. **Render Protection**
   - Prevents unauthorized renders
   - Maintains security boundary
   - Handles child components

## Best Practices

1. **Implementation**
   - Use at route level
   - Keep authentication logic centralized
   - Handle edge cases

2. **Security**
   - Regular auth state updates
   - Proper logout handling
   - Session management

3. **User Experience**
   - Clear feedback
   - Smooth transitions
   - Error handling

## Related Components
- User store
- Authentication system
- Router configuration
- Login component

## Future Enhancements
- Role-based protection
- Custom redirect paths
- Loading states
- Error boundaries
- Authentication persistence
