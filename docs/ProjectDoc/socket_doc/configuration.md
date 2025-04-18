# Configuration Guide

This document provides information about configuring the socket server.

## Environment Variables

The server uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```env
PORT=3000              # Primary server port
SOCKET_PORT=3000       # Socket.IO port (if different)
```

## TypeScript Configuration

The project uses TypeScript with the following key configurations in `tsconfig.json`:

### Compiler Options
- Target: Latest ECMAScript version
- Module: CommonJS
- Strict type checking enabled
- Source maps enabled for debugging

### Project Structure
- Source files in `src` directory
- Output directory configured for compiled files

## Dependencies

### Production Dependencies
- `socket.io`: WebSocket server
- `express`: Web framework
- `node-pty`: Terminal emulation
- `pino`: Logging framework
- `cors`: CORS support
- `dotenv`: Environment configuration

### Development Dependencies
- `typescript`: TypeScript compiler
- `@types/express`: Express type definitions
- `@types/node`: Node.js type definitions

## CORS Configuration

Cross-Origin Resource Sharing is configured to allow:
- All origins (`*`)
- All standard HTTP methods
- Headers for WebSocket support

## Security Considerations

1. **CORS Policy**
   - Consider restricting allowed origins in production
   - Implement appropriate security headers

2. **Environment Variables**
   - Use secure environment variable management
   - Don't commit `.env` files to version control

3. **Terminal Access**
   - Implement user authentication if needed
   - Restrict terminal capabilities as necessary

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file with required variables

3. Start development server:
   ```bash
   npm run dev
   ```
