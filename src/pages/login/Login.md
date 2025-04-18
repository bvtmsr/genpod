# Login Component Documentation

## Overview
The Login component is a React component that provides user authentication functionality. It implements a form-based login system with username and password fields, using Mantine UI components and Zod for form validation.

## Features
- Form-based authentication
- Input validation
- Automatic redirection after successful login
- Protected route integration
- Persistent user session management

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
- Uses Zustand for global state management through `useUserStore`
- Manages form state using `react-hook-form`
- Implements validation schema using `zod`

### Form Validation Schema
```typescript
const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required')
});
```

### Default Values
```typescript
defaultValues: {
  username: 'admin',
  password: 'password'
}
```

## Authentication Flow

1. **Form Submission**
   - User enters credentials
   - Form validates input using Zod schema
   - Submits credentials to authentication service

2. **Authentication Process**
   - Calls `login` function from `useUserOperations`
   - On success, updates user details in store
   - Redirects to home page

3. **Session Management**
   - Stores user details in Zustand store
   - Persists session across page reloads
   - Provides logout functionality

## UI Components
- Container with centered layout
- Flex container with dark background
- Text input fields for username and password
- Submit button with orange theme color

## Protected Routes
The application implements protected routes using a `Protected` HOC that:
- Checks for user authentication
- Redirects to login page if not authenticated
- Maintains secure access to protected content

## Usage
```typescript
// Protected route example
<Protected>
  <Component />
</Protected>

// Login redirect
if (!isUserLoggedIn()) {
  navigate('/login');
}
```

## Styling
- Uses Mantine UI components
- Responsive layout
- Centered form design
- Consistent theme colors

## Security Features
- Password field masking
- Form validation
- Session management
- Protected route implementation
