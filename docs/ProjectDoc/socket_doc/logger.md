# Logger Configuration Documentation

This document details the logging configuration implemented in `logger.ts`.

## Overview

The socket server uses Pino as its logging framework, configured with pretty-printing for better development experience.

## Configuration Details

### Logger Setup
```typescript
import pino from 'pino';
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  },
  name: 'socket-server'
});
```

### Components

1. **Transport Configuration**
   - Uses `pino-pretty` for formatted output
   - Colorization enabled for better readability

2. **Logger Identity**
   - Name: 'socket-server'
   - Helps identify log source in multi-service environments

## Usage

### Log Levels
The logger supports multiple log levels:
- `logger.info()`: Information messages
- `logger.warn()`: Warning messages
- `logger.error()`: Error messages
- `logger.debug()`: Debug information
- `logger.trace()`: Detailed debugging

### Example Usage
```typescript
logger.info('Server started');
logger.warn('Connection attempt failed');
logger.error('Critical error occurred');
```

## Features

- **Pretty Printing**: Human-readable log format
- **Color Coding**: Different colors for different log levels
- **Timestamp**: Automatic timestamp addition
- **Log Level Support**: Multiple severity levels
- **Performance**: High-performance logging

## Best Practices

1. **Log Level Selection**
   - Use appropriate log levels for different scenarios
   - Avoid excessive logging in production

2. **Error Logging**
   - Include stack traces for errors
   - Log contextual information

3. **Performance Considerations**
   - Use appropriate log levels
   - Avoid logging sensitive information
