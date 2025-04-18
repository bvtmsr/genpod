import { Drawer, rem, Tabs } from '@mantine/core';
import { IconCode, IconSatellite } from '@tabler/icons-react';
import { useState } from 'react';
import MicroServiceNodeDrawerForm from './form/MicroserviceNode.drawer.form';
import MicroserviceNodeStatus from './status/MicroserviceNode.status';

interface NodeDrawerProps {
  opened: boolean;
  close: () => void;
  nodeId: string;
}
type Tab = 'requirements' | 'status';
export default function NodeDrawer({
  opened,
  nodeId,
  close
}: NodeDrawerProps) {
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
      title="Fill Node Form Details"
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
          <Tabs.Tab
            value="status"
            leftSection={<IconSatellite style={iconStyle} />}
          >
            Status
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="requirements">
          <MicroServiceNodeDrawerForm
            nodeId={nodeId}
            onSubmit={() => {
              close();
            }}
            onGenerateButtonClick={() => {
              handleTabChange('status');
            }}
          />
        </Tabs.Panel>
        <Tabs.Panel value="status">
          <MicroserviceNodeStatus nodeId={nodeId} />
        </Tabs.Panel>
      </Tabs>
    </Drawer>
  );
}
