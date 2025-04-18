import { Box } from '@mantine/core';
import { LazyLog, ScrollFollow } from '@melloware/react-logviewer';
import { useRef } from 'react';
import { GLOBAL_CONSTANTS } from 'src/constants.global';

interface LogsPanelProps {
  nodeId: string;
  taskId: string;
}
export default function LogsPanel({ nodeId, taskId }: LogsPanelProps) {
  const url = `${GLOBAL_CONSTANTS.middlewareUrl}/llm/${nodeId}/${taskId}/logs`;
  const ref = useRef<LazyLog>(null);

  return (
    <div>
      <Box h="25vh" w="100%">
        <ScrollFollow
          render={({ follow, onScroll }) => (
            <>
              <LazyLog
                url={url}
                stream
                follow={follow}
                onScroll={onScroll}
                enableMultilineHighlight
                // enableGutters
                enableSearchNavigation
                enableSearch
                ref={ref}
                enableLineNumbers={false}
              />
            </>
          )}
        />
      </Box>
    </div>
  );
}
