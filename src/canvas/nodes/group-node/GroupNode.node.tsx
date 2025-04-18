import React, { useEffect } from 'react';
import { NodeResizer, NodeToolbar } from 'reactflow';
import { GroupNodeProps } from './GroupNode.types';
import { Badge, Flex, Grid, Text } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { useFlowsStore } from 'src/canvas/store/flowstore';
import classes from './styles.module.css';
import GroupNodeDrawer from './GroupNode.drawer';
import { useDisclosure } from '@mantine/hooks';
import { MdDelete } from 'react-icons/md';
import AddandOpenNestedCanvas from 'src/canvas/components/AddandOpenNestedCanvas';
import BacktoCanvas from 'src/canvas/components/BacktoCanvas';

const GroupNode: React.FC<GroupNodeProps> = ({ id, data: nodeData, selected }) => {
  const [opened, { open, close }] = useDisclosure(false);  // GroupNodeDrawer

  const { deleteNode, getNodeFormData, setActiveNode } = useFlowsStore();
  const currentFormData = getNodeFormData(id);

  const onDelete = () => {
    const children = nodeData.children;
    //delete child in group
    children?.forEach((child) => {
      deleteNode(child);
    });
    //delete group node
    deleteNode(id);
  };


  useEffect(() => {
    if (selected) setActiveNode(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);


  const displayImages = getNodeFormData(id)?.iconName ? (
    <img
      src={`../nodeIcons/${getNodeFormData(id)?.iconName}.png`}
      className=" w-10"
      alt={getNodeFormData(id)?.name}
    />
  ) : (
    <img
      src={`../nodeIcons/sample.png`}
      className=" w-10"
      alt={getNodeFormData(id)?.name}
    />
  );

  return (
    <>
      <NodeToolbar className={classes.nodeToolbar} >
       
        <MdDelete onClick={onDelete} className={classes.iconHoverEffect} cursor={"pointer"} title="Delete" />
        
      </NodeToolbar>
      <NodeResizer
        isVisible={selected}
        minWidth={300}
        minHeight={200}
      />
      <Flex
        direction="column"
        justify="flex-start"
        gap={0}
        h="min-content"
      >
        <Grid className={classes.node__header}>
          {/* getting error on nestedcanvas  */}

          {!currentFormData?.linkTo ? <Grid.Col span={1}>
            <BacktoCanvas />
          </Grid.Col> :""}

          <Grid.Col span={5}>
            <Text tt="uppercase" c="orange.5" fw="bold" ta="left">
              {currentFormData?.name || 'Group'}
            </Text>
          </Grid.Col>
          <Grid.Col span={3}>{displayImages}</Grid.Col>
          <Grid.Col span={2} c={'red'}>
           {!currentFormData?.linkTo ?  <IconEdit
              onClick={() => {
                open();
              }}
            /> :""}
          </Grid.Col>
          {!currentFormData?.linkTo ? <Grid.Col span={1} c={'white'} ta="right">
            
            <AddandOpenNestedCanvas />
          </Grid.Col> :""}

        </Grid>

        { !currentFormData?.linkTo ? <Grid className={classes.node__expander} gutter={0} justify="flex-end">
          <Grid.Col span={12} c={'white'} ta="right">
            <Badge
              variant="light"
              size="lg"
              c={'orange.5'}
              // leftSection={<IconFolderDown size={20} stroke={2} />}
              className={classes.iconBadge}
            >
              {nodeData.children?.length || 0}
            </Badge>
          </Grid.Col>
        </Grid>:""}


      </Flex>
      <GroupNodeDrawer opened={opened} close={close} nodeId={id} />
    </>
  );
};

export default GroupNode;
