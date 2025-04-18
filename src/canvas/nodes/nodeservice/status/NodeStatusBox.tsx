import { Box, Drawer } from '@mantine/core';
import { CustomNode } from 'src/canvas/store/types.store';
import classes from './styles.module.css';
import { useDisclosure } from '@mantine/hooks';
import MicroserviceNodeStatus from './MicroserviceNode.status';
import { notifications } from '@mantine/notifications';
interface NodeStatusBoxProps {
  node: CustomNode | undefined;
}
export default function NodeStatusBox({ node }: NodeStatusBoxProps) {
  const [isDrawerOpen, { close: closeDrawer, open: openDrawer }] =
    useDisclosure(false);
  if (!node) {
    return null;
  }
  if (!node.id) {
    notifications.show({
      title: 'Error',
      message: 'Node ID is missing',
      color: 'red'
    });
    return null;
  }
  return (
    <>
      <Box className={classes.box} onClick={openDrawer}>
        {node?.data.name}
      </Box>
      <Drawer
        opened={isDrawerOpen}
        onClose={closeDrawer}
        size="xl"
        position="right"
        title={`Node Status - ${node?.data.name}`}
      >
        <MicroserviceNodeStatus nodeId={node?.id!} />
      </Drawer>
    </>
  );
}
