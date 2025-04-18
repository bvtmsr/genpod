`src/components/common/side-nav/SideNavbar.tsx` file:

```tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserOperations } from 'src/api/useUserOperations';
import GenPodLogo from 'src/assets/logos/GenpodLogo';
import { FEATURE_FLAG } from 'src/feature-flag-configs/types';
import { FeatureFlagVariant } from 'src/store/types';
import { useFeatureFlagStore } from 'src/store/useFeatureFlagStore';
import useUserStore from 'src/store/userStore';

import {
  ActionIcon,
  Autocomplete,
  Burger,
  Code,
  Group,
  rem,
  ScrollArea,
  Tooltip,
  useMantineColorScheme
} from '@mantine/core';
import {
  IconLogout,
  IconMenu2,
  IconMoon,
  IconSearch,
  IconSun,
  IconUser,
  IconX,
  IconArrowNarrowLeft
} from '@tabler/icons-react';

import { NavBarLinksGroup } from '../nav-links-group/NavLinksGroup';
import { NavBarLinksGroupForComingSoon } from '../nav-links-group/NavLinksGroupForComingSoon';
import { SideNavData } from './data';
import classes from './SideNavbar.module.css';

export default function SideNavbar({ data }: SideNavbarProps) {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const { getFeatureFlag } = useFeatureFlagStore();
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true
  });
  const flagConfig = getFeatureFlag(FEATURE_FLAG.SIDE_NAV);
  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const { logout: clearLocalStorageToLogout } = useUserStore();
  const { logout: networkCallToLogout } = useUserOperations();

  const links = data.map(item => {
    if (flagConfig.features[item.id] === 'hidden') return null;
    if (flagConfig.features[item.id] === 'coming-soon') {
      const variant: FeatureFlagVariant =
        flagConfig.variants && flagConfig.variants[item.id];

      return (
        <NavBarLinksGroupForComingSoon
          {...item}
          key={item.label}
          links={item.links?.map(() => ({
            label: 'Coming Soon',
            link: variant.url
          }))}
          variant={variant}
        />
      );
    }
    return <NavBarLinksGroup {...item} key={item.label} />;
  });

  return (
    <nav
      className={`${classes.navbar} ${
        isNavOpen ? classes.open : classes.closed
      }`}
    >
      {/* ... */}
    </nav>
  );
}
```

This is a React functional component named `SideNavbar` that serves as the sidebar navigation component of the application. Here's what the code does:

1. It imports necessary components, hooks, and utilities from other files:
	* `useState` from `react` for managing state.
	* `Link` from `react-router-dom` for creating links.
	* `useUserOperations` from `src/api/useUserOperations` for accessing user operations.
	* `GenPodLogo` from `src/assets/logos/GenpodLogo` for displaying the logo.
	* `FEATURE_FLAG` from `src/feature-flag-configs/types` for accessing feature flags.
	* `FeatureFlagVariant` from `src/store/types` for accessing feature flag variants.
	* `useFeatureFlagStore` from `src/store/useFeatureFlagStore` for accessing feature flags.
	* `useUserStore` from `src/store/userStore` for accessing user data.
	* Various components from `@mantine/core` and `@tabler/icons-react` for rendering UI elements.
2. It defines the `SideNavbar` component as a functional component using the `export default function` syntax.
3. It uses the `useState` hook to manage the `isNavOpen` state, which determines whether the sidebar is open or closed.
4. It uses the `useFeatureFlagStore` hook to access the feature flags and variants.
5. It defines a `handleNavToggle` function that toggles the `isNavOpen` state.
6. It defines a `links` array that maps over the `data` prop and renders either a `NavBarLinksGroup` or a `NavBarLinksGroupForComingSoon` component for each item, depending on the feature flag configuration.
7. It returns a JSX element that renders the sidebar navigation component, including the logo, links, and toggle button.

In summary, this file defines the sidebar navigation component of the application, which displays a logo, links, and a toggle button, and manages the open/closed state of the sidebar using the `isNavOpen`