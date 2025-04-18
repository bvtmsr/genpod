import { Drawer, rem, Tabs } from '@mantine/core';
import { IconCode, IconSatellite } from '@tabler/icons-react';
import { useState } from 'react';
import GroupNodeDrawerForm from './form/GroupNode.drawer.form';
// import MicroserviceNodeStatus from './status/GroupNode.status';

interface GroupNodeDrawerProps {
  opened: boolean;
  close: () => void;
  nodeId: string;
}
type Tab = 'requirements' | 'status';
export default function GroupNodeDrawer({
  opened,
  nodeId,
  close
}: GroupNodeDrawerProps) {
  const iconStyle = { width: rem(20), height: rem(20) };
  const [activeTab, setActiveTab] = useState<Tab>('requirements');

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };
  return (
    <Drawer
      closeOnClickOutside={false}
      closeOnEscape={false}
      opened={opened}
      onClose={close}
      title="Fill GroupNode Form Details"
      position="right"
      size="xl"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      <Tabs
        value={activeTab}
        onChange={v => handleTabChange(v as Tab)}
        keepMounted={false}
      >
        <Tabs.List>
          <Tabs.Tab
            value="requirements"
            leftSection={<IconCode style={iconStyle} />}
          >
            Requirements
          </Tabs.Tab>
          {/* <Tabs.Tab
            value="status"
            leftSection={<IconSatellite style={iconStyle} />}
          >
            Status
          </Tabs.Tab> */}
        </Tabs.List>

        <Tabs.Panel value="requirements">
          <GroupNodeDrawerForm
            nodeId={nodeId}
            onSubmit={() => {
              close();
            }}
            onGenerateButtonClick={() => {
              handleTabChange('status');
            }}
          />
        </Tabs.Panel>
        {/* <Tabs.Panel value="status">
          <MicroserviceNodeStatus nodeId={nodeId} />
        </Tabs.Panel> */}
      </Tabs>
    </Drawer>
  );
}
