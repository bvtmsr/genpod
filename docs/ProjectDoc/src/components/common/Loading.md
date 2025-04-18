

Here's an explanation of the `Loading` component in `src/components/common/loading/Loading.tsx`:

**Loading Component Explanation**
=====================================

The `Loading` component is a functional component that displays a loading indicator with an optional text message. It is designed to be used as a placeholder while data is being loaded or processed.

**Imports**
------------

The component imports the following dependencies:

* `Flex`, `Loader`, and `Text` from `@mantine/core`

**Component Functionality**
---------------------------

The component has the following functionality:

* Displays a loading indicator (a spinning wheel) using the `Loader` component from `@mantine/core`.
* Optionally displays a text message next to the loading indicator.
* Allows the user to customize the color of the loading indicator.
* Allows the user to customize the text message displayed next to the loading indicator.

**Component Structure**
-----------------------

The component consists of the following sections:

* A `Flex` container that wraps the loading indicator and text message.
* A `Loader` component that displays the loading indicator.
* A `Text` component that displays the text message.

**Props**
---------

The component accepts the following props:

* `color`: The color of the loading indicator. Defaults to `'orange'`.
* `loadingText`: The text message to display next to the loading indicator. Defaults to `'Loading ...'`.
* `showLoadingText`: A boolean indicating whether to display the text message. Defaults to `true`.

**Example Usage**
-----------------

Here's an example of how to use the `Loading` component:
```tsx
import Loading from 'src/components/common/loading/Loading';

function MyComponent() {
  return (
    <Loading color="blue" loadingText="Loading data..." />
  );
}
```
**Markdown File**
-----------------

Here's an example of how you can create a Markdown file to document this component:
```markdown
# Loading Component

## Overview

The `Loading` component displays a loading indicator with an optional text message.

## Functionality

* Displays a loading indicator (a spinning wheel)
* Optionally displays a text message next to the loading indicator
* Allows customization of the loading indicator color
* Allows customization of the text message

## Structure

* Flex container wrapping the loading indicator and text message
* Loader component displaying the loading indicator
* Text component displaying the text message

## Props

* `color`: Color of the loading indicator (defaults to `'orange'`)
* `loadingText`: Text message to display next to the loading indicator (defaults to `'Loading ...'`)
* `showLoadingText`: Boolean indicating whether to display the text message (defaults to `true`)

## Example Usage

```tsx
import Loading from 'src/components/common/loading/Loading';

function MyComponent() {
  return (
    <Loading color="blue" loadingText="Loading data..." />
  );
}
```