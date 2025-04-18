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
  Code,
  Group,
  rem,
  ScrollArea,
  Tooltip,
  useMantineColorScheme,
  Box,
  Collapse,
  Text,
  ThemeIcon,
  UnstyledButton
} from '@mantine/core';
import {
  IconLogout,
  IconMoon,
  IconSearch,
  IconSun,
  IconUser,
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconChevronRight,
  IconHttpConnect
} from '@tabler/icons-react';

import { NavBarLinksGroup } from '../nav-links-group/NavLinksGroup';
import { NavBarLinksGroupForComingSoon } from '../nav-links-group/NavLinksGroupForComingSoon';
import { SideNavData, footerLinks } from './data';
import classes from './SideNavbar.module.css';

interface SideNavbarProps {
  data: SideNavData;
}

export default function SideNavbar({ data }: SideNavbarProps) {
  const profileData  = footerLinks;
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

  // Profile links
  const profileLinks:JSX.Element[] = profileData.map(item => {
    return <NavBarLinksGroup {...item} key={item.label} />;
  });

  const navToggleIcon = isNavOpen ? (
    <IconArrowNarrowLeft
      className="color-white absolute -right-3 top-1/3 bg-orange-500 border rounded-full z-10 cursor-pointer rotate-0 md:top-1/3 lg:top-1/2"
      onClick={handleNavToggle}
    />
  ) : (
    <IconArrowNarrowRight
      className="color-white absolute -right-3 top-1/3  bg-orange-500 border rounded-full z-10 cursor-pointer md:top-1/3 lg:top-1/2"
      onClick={handleNavToggle}
    />
  );
  
  return (
    <nav
      className={`${classes.navbar} ${
        isNavOpen ? classes.open : classes.closed
      }`}
    >
      <div className={classes.navbarMain}>
        <ScrollArea className={classes.links}>
          <Group className={classes.header}>
            <Group justify="space-between">
              <GenPodLogo />
              <Tooltip label="Toggle Theme">
                {colorScheme === 'dark' ? (
                  <ActionIcon
                    variant="gradient"
                    bg="orange"
                    onClick={() => setColorScheme('light')}
                  >
                    <IconSun />
                  </ActionIcon>
                ) : (
                  <ActionIcon
                    bg="gray"
                    variant="gradient"
                    onClick={() => setColorScheme('dark')}
                  >
                    <IconMoon />
                  </ActionIcon>
                )}
              </Tooltip>
              <Code fw={700}>v1.0.0</Code>
            </Group>
            <Group>
              <Autocomplete
                className={classes.search}
                placeholder="Search"
                leftSection={
                  <IconSearch
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              />
            </Group>
          </Group>

          <div className={classes.linksInner}>{links}</div>
          <div className={classes.footer}>
          <div>{profileLinks}</div>
            <Link
              to="/login"
              className={classes.link}
              onClick={() => {
                clearLocalStorageToLogout();
                networkCallToLogout();
              }}
            >
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </Link>
          </div>
        </ScrollArea>
      </div>
      <div>{navToggleIcon}</div>
    </nav>
  );
}
