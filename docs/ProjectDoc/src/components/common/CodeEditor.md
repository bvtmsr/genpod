# CodeEditor Component Documentation

## Overview
The `CodeEditor` component is a React-based code editor implementation using CodeMirror. It provides a feature-rich editing experience with syntax highlighting, autocompletion, and YAML language support.

## Features
- Syntax highlighting
- Autocompletion
- YAML language support
- Bracket matching
- Dark theme
- Customizable height
- Event handling

## Component Structure

### Dependencies
```typescript
- @codemirror/autocomplete
- @uiw/codemirror-extensions-langs
- @uiw/react-codemirror
```

### Props Interface
```typescript
interface CodeEditorProps extends ReactCodeMirrorProps {
  value: string;
  onChange?: (value: string, viewUpdate: ViewUpdate) => void;
  height?: string;
}
```

## Component Features

### Code Editor Setup
1. **Basic Configuration**
   - Dark theme
   - Full width layout
   - Customizable height (default: 88vh)
   - YAML language support

2. **Editor Extensions**
   - Basic setup with autocompletion
   - Bracket matching
   - Close brackets
   - Default keymap

### Autocompletion
1. **Custom Completions**
   ```typescript
   const myCompletions = (context: CompletionContext) => {
     const word = context.matchBefore(/\w*/);
     if (!word) return null;
     if (word.from == word.to && !context.explicit) return null;
     return {
       from: word.from,
       options: [
         { label: 'name', type: 'variable' },
         {
           label: 'version',
           type: 'variable',
           info: 'enter the kubernetes version'
         }
       ]
     };
   };
   ```

2. **Completion Features**
   - Word matching
   - Variable suggestions
   - Contextual information
   - Custom trigger conditions

## Usage Example
```tsx
import CodeEditor from './CodeEditor';

function MyComponent() {
  const [code, setCode] = useState('');

  const handleChange = (value: string) => {
    setCode(value);
  };

  return (
    <CodeEditor
      value={code}
      onChange={handleChange}
      height="500px"
    />
  );
}
```

## Props
1. **Required Props**
   - `value`: Current editor content

2. **Optional Props**
   - `onChange`: Change event handler
   - `height`: Editor height
   - All other CodeMirror props

## Editor Configuration

### Basic Setup
```typescript
basicSetup({
  autocompletion: true,
  bracketMatching: true,
  closeBrackets: true,
  defaultKeymap: true
})
```

### Language Support
```typescript
langs.yaml().data.of({
  autocomplete: myCompletions
})
```

### Autocompletion Setup
```typescript
autocompletion({
  override: [myCompletions]
})
```

## Styling
- Dark theme by default
- Full width layout
- Customizable height
- Responsive design

## Event Handling
1. **Change Events**
   - Triggered on content changes
   - Provides updated value
   - Includes view update information

2. **View Updates**
   - Cursor position
   - Selection changes
   - Viewport changes

## Best Practices
1. **Performance**
   - Efficient update handling
   - Optimized rendering
   - Proper cleanup

2. **User Experience**
   - Immediate feedback
   - Smooth editing
   - Helpful suggestions

3. **Integration**
   - Clean props interface
   - Flexible configuration
   - Easy customization

## Error Handling
- Null checks for completions
- Safe event handling
- Proper prop validation

## Customization
1. **Theme Options**
   - Dark theme default
   - Customizable through props

2. **Layout**
   - Adjustable height
   - Full width by default
   - Flexible container

3. **Extensions**
   - Custom completions
   - Language support
   - Editor features
