import { Accordion } from '@mantine/core';

import MicroserviceNodeTabs from './MicroserviceNode.tabs';
import { Task } from './types';

interface MicroserviceNodeTaskProps {
  nodeId: string;
  task: Task;
}
export default function MicroserviceNodeTask({
  nodeId,
  task
}: MicroserviceNodeTaskProps) {
  return (
    <Accordion.Item key={task.id} value={task.value}>
      <Accordion.Control>{task.name}</Accordion.Control>
      <Accordion.Panel>
        <MicroserviceNodeTabs
          nodeId={nodeId}
          tabs={task.tabs}
          taskId={task.id}
        />
      </Accordion.Panel>
    </Accordion.Item>
  );
}
