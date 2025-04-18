import React from 'react';
import { useSearchParams } from 'react-router-dom';
import User from 'src/components/user';
import Protected from 'src/hoc/protected';
import { Box, Text } from '@mantine/core';

import classes from './profile.module.css';
import LayoutWithSideBar from 'src/components/common/layout/LayoutWithSideBar';

interface ProfileProps {}
const Profile: React.FC<ProfileProps> = () => {
  const [searchParams] = useSearchParams();
  const defaultActiveTabName = searchParams.get('activeTab') || 'projects';
 
  
  return (
    <Protected>
      <LayoutWithSideBar>
        <Box className={classes.box}>
          <Text variant="text" size="xl" fw="bolder">
            {defaultActiveTabName.charAt(0).toUpperCase()+ defaultActiveTabName.slice(1)}
          </Text>

          <User.Projects />
          {/* <Tabs
            defaultValue={defaultActiveTabName}
            orientation="vertical"
            activateTabWithKeyboard
            classNames={{
              tab: classes.tab,
              root: classes.root,
              list: classes.list
            }}
          >
            <Tabs.List>
              <Tabs.Tab value="projects" leftSection={<IconFileSettings />}>
                Projects
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="projects">
              <User.Projects />
            </Tabs.Panel>
          </Tabs> */}
        </Box>
      </LayoutWithSideBar>
    </Protected>
  );
};
export default Profile;
