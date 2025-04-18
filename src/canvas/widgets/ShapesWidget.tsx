import { Box, Paper, Text, ActionIcon, Collapse } from '@mantine/core';
import {
  IconServer,
  IconDatabase,
  IconDevices,
  IconFolders,
  IconChevronLeft,
  IconChevronRight
} from '@tabler/icons-react';
import { NodeTypes } from '../store/types.store';
import { useState } from 'react';

const shapes = [
  {
    type: NodeTypes.MICROSERVICE,
    label: 'Node',
    icon: IconServer,
    color: 'blue'
  },
  {
    type: NodeTypes.DB_NODE,
    label: 'Database',
    icon: IconDatabase,
    color: 'green'
  },
  {
    type: NodeTypes.CLIENT_NODE,
    label: 'Client',
    icon: IconDevices,
    color: 'purple'
  },
  {
    type: NodeTypes.GROUP,
    label: 'Group',
    icon: IconFolders,
    color: 'orange'
  }
];

export function ShapesWidget() {
  const [isOpen, setIsOpen] = useState(true);
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Paper 
      shadow="sm" 
      radius="md" 
      p="md" 
      withBorder
      style={{
        position: 'relative',
        zIndex: 5,
        backgroundColor: 'var(--mantine-color-body)',
        minWidth: isOpen ? '50px' : '40px',
        transition: 'min-width 0.2s ease'
      }}
    >
      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isOpen ? 'xs' : 0 }}>
        {isOpen && <Text size="sm">Shapes</Text>}
        <ActionIcon 
          variant="subtle" 
          onClick={() => setIsOpen(!isOpen)}
          ml={!isOpen ? 'auto' : 0}
        >
          {isOpen ? <IconChevronRight size={18} /> : <IconChevronLeft size={18} />}
        </ActionIcon>
      </Box>
      <Collapse in={isOpen}>
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {shapes.map((shape) => {
            const Icon = shape.icon;
            return (
              <Box
                key={shape.type}
                style={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  borderRadius: theme.radius.sm,
                  backgroundColor: theme.colors[shape.color][0],
                  cursor: 'grab',
                  '&:hover': {
                    backgroundColor: theme.colors[shape.color][1],
                  }
                })}
                draggable
                onDragStart={(e) => onDragStart(e, shape.type)}
              >
                <Icon size={20} color={`var(--mantine-color-${shape.color}-6)`} />
                <Text size="sm" c={`var(--mantine-color-${shape.color}-6)`}>{shape.label}</Text>
              </Box>
            );
          })}
        </Box>
      </Collapse>
    </Paper>
  );
}
