import { NodeTypes } from 'src/canvas/store/types.store';

export type NodeDataUI = Omit<NodeData, 'id' | 'type'>;
export type NodeData = Partial<{
  id: string;
  name: string;
  description: string;
  // this is where the yaml content will go
  requirements: string;
  type: NodeTypes;
  iconName: string;
  linkTo: string;
}>;
