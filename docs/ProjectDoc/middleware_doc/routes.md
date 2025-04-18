# API Routes Documentation

This document details all the API routes available in the middleware service.

## Route Categories

The API routes are organized into three main categories:

### 1. Authentication Routes (`authRoutes.ts`)
Handles user authentication and session management.

### 2. LLM Routes (`llmRoutes.ts`)
Manages interactions with Language Learning Models.

### 3. Project Routes (`projectRoutes.ts`)
Handles project-related operations and management.

## Route Implementations

Each route category is implemented in its own TypeScript file under the `src/routes` directory:

- `authRoutes.ts`: Authentication endpoints
- `llmRoutes.ts`: LLM interaction endpoints
- `projectRoutes.ts`: Project management endpoints

## Route Structure

Each route file follows a consistent structure:
1. Route definition
2. Handler association
3. Input validation
4. Response schema definition

## Common Route Patterns

All routes follow these common patterns:
- RESTful design principles
- Consistent error handling
- Authentication middleware where required
- Input validation
- Standardized response format
