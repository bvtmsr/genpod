import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactFlow, {
  useReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  Panel
} from 'reactflow';
import { useProjectOperations } from 'src/api/useProjectOperations/useProjectOperations';
import AddNodeModal from 'src/components/common/modal/AddNodeModal';
import { InAppNotifications } from 'src/notifications';
import { Project } from 'src/store/types';
import { useProjectStore } from 'src/store/useProjectStore';

import { Box, Button, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCircleArrowUp,
  IconEyeCode,
  IconRobotFace
} from '@tabler/icons-react';

import CodeViewDrawer from './drawers/code-view/CodeViewDrawer';
import { edgeTypes } from './edges';
import { nodeTypes } from './nodes';
import { useFlowsStore } from './store/flowstore';
import { CustomNode, NodeTypes } from './store/types.store';
import { sortNodes, getId, getNodePositionInsideParent } from './utils';
import { ShapesWidget } from './widgets/ShapesWidget';
import { SelectedNodesToolbar } from './widgets/SelectedNodesToolbar';
import { getInitialNodesFormData } from './nodes/utils';

export default function Flow() {
  const [data, setData] = useState('');

  const {
    onNodesChange,
    onEdgesChange,
    onConnect,
    getNodesAndEdges,
    flows,
    activeFlow
  } = useFlowsStore();
  const navigate = useNavigate();
  const projectId = activeFlow?.slice(4);
  const { nodes, edges } = getNodesAndEdges();
  const [
    isCodeViewDrawerOpen,
    { close: closeCodeViewDrawer, open: openCodeViewDrawer }
  ] = useDisclosure(false);
  const [
    isGenerateCodeDrawerOpen,
    { close: closeGenerateCodeDrawer, open: openGenerateCodeDrawer }
  ] = useDisclosure(false);
  const projects = useProjectStore(state => state.projects);
  const { updateProject } = useProjectOperations();

  const handleViewCodeClick = () => {
    openCodeViewDrawer();
  };

  const getFlow = useCallback(() => {
    if (!flows || !activeFlow) return;
    return flows[activeFlow];
  }, [flows, activeFlow]);

  const handleSaveConfigClick = async () => {
    const currentFlow = getFlow();

    if (!currentFlow) {
      return;
    }

    const projectDetails = projects.find(project => project.id == projectId);

    if (!projectDetails || !activeFlow || !projectId) {
      console.error({
        projectDetails,
        activeFlow,
        projectId
      });
      return;
    }
    const formattedProject: Project = {
      flow: {
        nodes,
        edges
      },
      id: projectId,
      name: projectDetails.name,
      parentId: projectDetails.parentId
    };
    const { data, error } = await updateProject(projectId, formattedProject);
    if (error || !data) {
      InAppNotifications.project.failedToSync(projectId);
    } else {
      InAppNotifications.project.syncedSuccessfully(projectId);
    }
  };

  const handleGenerateClick = async () => {
    openGenerateCodeDrawer();
    try {
      const response = await fetch('http://localhost:3003/stream');
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let result = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value);
        setData(prevData => prevData + decoder.decode(value));
      }
    } catch (error) { }
  };
  const handleViewStatusClick = () => {
    navigate(`/project/${projectId}/status`);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  };


  const { screenToFlowPosition, getIntersectingNodes } = useReactFlow();

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();


    const type = event.dataTransfer.getData('application/reactflow');
     
   
    const position = screenToFlowPosition({
      x: event.clientX - 20,
      y: event.clientY - 20,
    });

    const nodeStyle =
      type === 'group' ? { width: 400, height: 200, cursor: 'pointer' } : undefined;
   
    

    const intersections = getIntersectingNodes({
      x: position.x,
      y: position.y,
      width: 40,
      height: 40,
    }).filter((n) => n.type === 'group');
    
    
    const groupNode = intersections[0];

    const nodeType = type as NodeTypes
    
    const newNode: CustomNode = {      
      id: getId(),
      type:nodeType,
      position,
      data: {...getInitialNodesFormData(nodeType),type: nodeType, name: 'New_Node'},
      style: nodeStyle,
    };


    if (groupNode) {
      // if we drop a node on a group node, we want to position the node inside the group
      newNode.position = getNodePositionInsideParent(
        {
          position,
          width: 40,
          height: 40,
        },
        groupNode
      ) ?? { x: 0, y: 0 };
      newNode.parentNode = groupNode?.id;
      newNode.expandParent = true;
      groupNode.data.children?.push(newNode.id);
    }

    // Get current nodes from the store
    const { nodes: currentNodes } = getNodesAndEdges() || { nodes: [] };

    // Create new sorted nodes array
    const sortedNodes = [...currentNodes, newNode].sort(sortNodes);

    // Update nodes in the store
    useFlowsStore.getState().setNodes(sortedNodes as CustomNode[]);
  };

  return (
    <>
      <Box w="100%" h="100%">
        <ReactFlow
          proOptions={{
            hideAttribution: true
          }}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodes={nodes}
          edges={edges}
          // onNodeDrag={onNodeDrag}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}

          defaultViewport={{ x: 100, y: 100, zoom: 0.5 }}
        >
          <Panel position="top-left" className='top-nav'>

            <AddNodeModal
              type={NodeTypes.MICROSERVICE}
              buttonText="Add Node"
              mx="sm"
              fz={'0.8rem'}
              fw={500}
              lh={'1.2rem'}
              ff={'Roboto, sans-serif'}
              p={'revert'}
              // h={'1.5rem'}
            />

            <Button
              bg="blue.4"
              ml="sm"
              fz={'0.8rem'}
              fw={500}
              lh={'1.2rem'}
              ff={'Roboto, sans-serif'}
              p={'revert'}
              leftSection={<IconEyeCode />}
              onClick={handleViewCodeClick}
            >
              View Generated Config
            </Button>


            <Button
              bg="blue.4"
              ml="sm"
              fz={'0.8rem'}
              fw={500}
              lh={'1.2rem'}
              ff={'Roboto, sans-serif'}
              p={'revert'}
              leftSection={<IconCircleArrowUp />}
              onClick={handleSaveConfigClick}
            >
              Save Config
            </Button>
            <Button
              ml="sm"
              fz={'0.8rem'}
              fw={500}
              lh={'1.2rem'}
              ff={'Roboto, sans-serif'}
              p={'revert'}
              leftSection={<IconRobotFace />}
              onClick={handleGenerateClick}
            >
              Generate Code
            </Button>
            <Button ml="sm" fz={'0.8rem'} fw={500} lh={'1.2rem'} ff={'Roboto, sans-serif'} p={'revert'} onClick={handleViewStatusClick}>
              View Project Status
            </Button>
          </Panel>
          <Panel position='top-right'>
            <ShapesWidget />
          </Panel>
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          <SelectedNodesToolbar />
        </ReactFlow>
      </Box>

      <Drawer
        size="xl"
        position="right"
        onClose={closeCodeViewDrawer}
        opened={isCodeViewDrawerOpen}
        closeOnEscape={false}
      >
        <CodeViewDrawer />
      </Drawer>
      <Drawer
        size="xl"
        position="right"
        onClose={() => {
          closeGenerateCodeDrawer();
          setData('');
        }}
        opened={isGenerateCodeDrawerOpen}
        closeOnEscape
        closeOnClickOutside
      >
        <Box p="lg" w="100%" h="100%">
          <pre>{data}</pre>
        </Box>
      </Drawer>
    </>
  );
}
