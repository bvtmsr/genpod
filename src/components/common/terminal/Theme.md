# Terminal Theme Documentation

## Overview
The terminal theme configuration provides a customizable and visually appealing interface inspired by the Dracula color scheme. It supports both standard and bright color variants for optimal readability.

## Theme Configuration

### Base Colors
```typescript
const baseTheme = {
  foreground: '#f8f8f2',  // Default text
  background: '#1e1f29',  // Terminal background
  cursor: '#bbbbbb'       // Cursor color
};
```

### ANSI Colors
```typescript
const ansiColors = {
  // Standard Colors
  black: '#000000',
  red: '#ff5555',
  green: '#50fa7b',
  yellow: '#f1fa8c',
  blue: '#bd93f9',
  magenta: '#ff79c6',
  cyan: '#8be9fd',
  white: '#bbbbbb',

  // Bright Variants
  brightBlack: '#555555',
  brightRed: '#ff5555',
  brightGreen: '#50fa7b',
  brightYellow: '#f1fa8c',
  brightBlue: '#bd93f9',
  brightMagenta: '#ff79c6',
  brightCyan: '#8be9fd',
  brightWhite: '#ffffff'
};
```

## Color Usage

### Text Elements
1. **Standard Text**
   - Primary content
   - Commands
   - Output

2. **Special Elements**
   - Links
   - Errors
   - Warnings
   - Success messages

### UI Elements
1. **Cursor**
   - Blinking state
   - Selection
   - Focus indicator

2. **Background**
   - Main background
   - Selection
   - Active line

## Implementation

### Theme Application
```typescript
const terminalConfig = {
  theme: {
    ...baseTheme,
    ...ansiColors
  }
};
```

### Custom Themes
```typescript
interface TerminalTheme {
  foreground: string;
  background: string;
  cursor: string;
  // ANSI colors
  [key: string]: string;
}

const customTheme: TerminalTheme = {
  // Theme configuration
};
```

## Best Practices

### Color Selection
1. **Contrast**
   - Text readability
   - Background contrast
   - Element distinction

2. **Consistency**
   - Color harmony
   - Visual hierarchy
   - Brand alignment

### Accessibility
1. **Readability**
   - Color contrast
   - Font clarity
   - Text size

2. **Color Blindness**
   - Alternative indicators
   - Pattern use
   - Clear distinctions

## Usage Guide

### Basic Theme
```typescript
const defaultTheme = {
  foreground: '#f8f8f2',
  background: '#1e1f29',
  cursor: '#bbbbbb',
  // ANSI colors...
};

<Terminal theme={defaultTheme} />
```

### Custom Theme
```typescript
const customTheme = {
  ...defaultTheme,
  // Override specific colors
  background: '#282a36',
  green: '#50fa7b'
};

<Terminal theme={customTheme} />
```

## Theme Switching

### Light/Dark Modes
```typescript
const lightTheme = {
  background: '#ffffff',
  foreground: '#000000',
  // Light mode colors...
};

const darkTheme = {
  background: '#1e1f29',
  foreground: '#f8f8f2',
  // Dark mode colors...
};
```

### Dynamic Switching
```typescript
const [theme, setTheme] = useState(darkTheme);

const toggleTheme = () => {
  setTheme(current => 
    current === darkTheme ? lightTheme : darkTheme
  );
};
```

## Related Components
- Terminal component
- Theme provider
- Color utilities
- Accessibility tools

## Future Enhancements
- Theme presets
- Custom color schemes
- Theme export/import
- Real-time preview
- Accessibility checker
