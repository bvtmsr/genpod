import { useEffect, useState } from 'react';
import Loading from 'src/components/common/loading/Loading';

import { Accordion } from '@mantine/core';

import MicroserviceNodeTask from './MicroserviceNode.task';
import { MicroserviceNodeStatusProps, Task } from './types';
import axiosMiddleware from 'src/api/axiosMiddleware';

/**
 * value key prefixed with id should be the endpoint
 * for example
 * {task.id}/initialising/summary - should stream the summary
 * {task.id}/initialising/logs - should stream the logs basically tailing the logs
 */
export default function MicroserviceNodeStatus(
  props: MicroserviceNodeStatusProps
) {
  const [tasks, setTasks] = useState<Task[] | null | undefined>(null);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosMiddleware.get(
          `/llm/${props.nodeId}/tasks`
        );
        return response.data as Task[];
      } catch (error) {
        console.error(error);
      }
    };
    if (!tasks) {
      fetchTasks().then(tasks => {
        setTasks(JSON.parse(tasks as unknown as string));
      });
    }
  }, []);
  return tasks ? (
    <Accordion mt="lg" variant="separated">
      {tasks.map(task => (
        <MicroserviceNodeTask key={task.id} nodeId={props.nodeId} task={task} />
      ))}
    </Accordion>
  ) : (
    <Loading loadingText="Loading tasks ..." />
  );
}
