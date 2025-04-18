# Socket Server Documentation

This document provides a comprehensive overview of the socket server implementation.

## Project Overview

The socket server is built using Node.js with Socket.IO, providing real-time bidirectional communication between clients and the server. It's implemented in TypeScript for type safety and better development experience.

## Project Structure

```
socket-server/
├── src/
│   ├── server.ts    # Main server implementation
│   └── logger.ts    # Logging configuration
├── package.json     # Project dependencies and scripts
└── tsconfig.json   # TypeScript configuration
```

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **WebSocket**: Socket.IO
- **Language**: TypeScript
- **Terminal Support**: node-pty
- **Logging**: Pino

## Key Dependencies

- `socket.io`: WebSocket server implementation
- `express`: Web server framework
- `node-pty`: Terminal emulation support
- `pino`: Logging library
- `cors`: Cross-Origin Resource Sharing support
- `dotenv`: Environment configuration

## Development

To run the development server:

```bash
npm run dev
```

This will start the server using ts-node for TypeScript execution.

## Documentation Structure

The documentation is organized into the following sections:
- [Server Implementation](./server.md)
- [Logger Configuration](./logger.md)
- [Configuration Guide](./configuration.md)
