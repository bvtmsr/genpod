import { ActionIcon, Box, Group, Tooltip } from '@mantine/core';
import { IconFolders } from '@tabler/icons-react';
import { useCallback } from 'react';
import { Node, useNodes, useReactFlow } from 'reactflow';
import { useFlowsStore } from '../store/flowstore';
import { CustomNode, NodeTypes } from '../store/types.store';
import { getId, sortNodes } from '../utils';
import { getInitialNodesFormData } from '../nodes/utils';


export function SelectedNodesToolbar() {
  //const { setNodes } = useReactFlow();
  const { getNodesAndEdges, setNodes } = useFlowsStore();


  const nodes = useNodes();
  const selectedNodes  = nodes.filter(
    (node) => node.selected && !node.parentNode
  );
 

  const createGroupFromSelection = useCallback(() => {
    if (selectedNodes.length < 2) return;

    // Calculate the bounding box of selected nodes
    const bounds = selectedNodes.reduce(
      (acc, node) => {
        const x = node.position.x;
        const y = node.position.y;
        const width = (node.width || 0) + 40;
        const height = (node.height || 0) + 40;

        return {
          minX: Math.min(acc.minX, x),
          minY: Math.min(acc.minY, y),
          maxX: Math.max(acc.maxX, x + width),
          maxY: Math.max(acc.maxY, y + height),
        };
      },
      { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
    );

    // Create group node
    const groupNode: CustomNode = {
      id: getId(),
      type: NodeTypes.GROUP,
      position: { x: bounds.minX - 20, y: bounds.minY - 20 },
      className: 'groupNode',
      data: {
        ...getInitialNodesFormData(NodeTypes.GROUP),
        name: 'New_Group_Node',
        isExpanded: true,
        children: selectedNodes.map(node => node.id)
      }
    };

    // Update selected nodes to be children of the group
    const updatedNodes = getNodesAndEdges().nodes.map(node => {
      if (selectedNodes.find(n => n.id === node.id)) {
        return {
          ...node,
          position: {
            x: node.position.x - bounds.minX + 20,
            y: node.position.y - bounds.minY + 20
          },
          parentNode: groupNode.id,
          expandParent: true,
          selected: false
        };
      }
      return { ...node, selected: false };
    });

     // Create new sorted nodes array
     const sortedNodes = [...updatedNodes, groupNode].sort(sortNodes);
 
     // Update nodes in the store
    // useFlowsStore.getState().
     setNodes(sortedNodes as CustomNode[]);

  }, [selectedNodes, setNodes, getNodesAndEdges]);

  if (selectedNodes.length < 2) return null;

  return (
    <Box
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 5,
        backgroundColor: 'var(--mantine-color-dark-6)',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid var(--mantine-primary-color-6)'
      }}
      
      c-pointer:true
    >
      <Group gap="xs">
        <Tooltip label="Create group from selection">
          <ActionIcon
            variant="light"
            color="blue"
            onClick={createGroupFromSelection}
            size="lg"
          >
            <IconFolders />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Box>
  );
}
