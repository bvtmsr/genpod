import { Tabs, Text } from '@mantine/core';

import LogsPanel from './panels/LogsPanel';
import SummaryPanel from './panels/SummaryPanel';
import { Tab } from './types';

interface MicroserviceNodeTabsProps {
  tabs: Tab[] | undefined;
  nodeId: string;
  taskId: string;
}
export default function MicroserviceNodeTabs({
  tabs,
  nodeId,
  taskId
}: MicroserviceNodeTabsProps) {
  return (
    <>
      {tabs && tabs.length > 0 ? (
        <Tabs
          defaultValue={tabs[0].value}
          variant="outline"
          // keepMounted={false}
        >
          <Tabs.List>
            {tabs.map(tab => (
              <Tabs.Tab key={tab.value} value={tab.value}>
                {tab.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {tabs.map(tab => (
            <Tabs.Panel key={tab.value} value={tab.value}>
              {renderPanel(tab, nodeId, taskId)}
            </Tabs.Panel>
          ))}
        </Tabs>
      ) : (
        <Text>No tabs available</Text>
      )}
    </>
  );
}

const renderPanel = (tab: Tab, nodeId: string, taskId: string) => {
  if (tab.value === 'summary') {
    return <SummaryPanel nodeId={nodeId} taskId={taskId} />;
  } else if (tab.value === 'logs') {
    return <LogsPanel nodeId={nodeId} taskId={taskId} />;
  }
  return null;
};
