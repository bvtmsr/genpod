# Server Implementation Documentation

This document details the implementation of the Socket.IO server in `server.ts`.

## Overview

The server implements a WebSocket-based terminal emulation service using Socket.IO and node-pty. It allows clients to connect and interact with a terminal session in real-time.

## Key Components

### Server Setup
- Express application with CORS enabled
- HTTP server creation
- Socket.IO server initialization with CORS configuration
- Static file serving

### Terminal Emulation
- Uses `node-pty` for terminal process spawning
- Supports both Windows (cmd.exe) and Unix (bash) shells
- Configurable terminal settings:
  - Terminal type: xterm-color
  - Default dimensions: 80x30
  - Working directory: User's HOME
  - Environment variables: Inherited from process

### WebSocket Events

#### Server Events
- `connection`: Handles new client connections
- `output`: Emits terminal output to client
- `disconnect`: Cleans up terminal process on client disconnect

#### Client Events
- `input`: Receives terminal input from client
- `output`: Receives terminal output from server

### Error Handling
- Graceful server shutdown on SIGTERM
- Process cleanup on client disconnect
- Logging of connection events

## Configuration

### Environment Variables
- `PORT`: Server port (default: 3000)
- `SOCKET_PORT`: Alternative port configuration
- `HOME`: Working directory for terminal sessions

### CORS Configuration
- Origins: All origins allowed ('*')
- Methods: All methods supported
- Credentials: Not required

## Server Lifecycle

1. Server Initialization
   - Express app creation
   - CORS middleware setup
   - HTTP server creation
   - Socket.IO server setup

2. Connection Handling
   - Client connection establishment
   - Terminal process creation
   - Event listener setup
   - Data streaming setup

3. Server Shutdown
   - SIGTERM signal handling
   - Graceful connection termination
   - Resource cleanup

## Best Practices

- Environment variable configuration
- Cross-origin security handling
- Process cleanup and resource management
- Error logging and monitoring
