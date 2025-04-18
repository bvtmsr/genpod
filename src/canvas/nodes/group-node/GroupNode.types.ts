import { NodeProps } from 'reactflow';
import { NodeTypes } from 'src/canvas/store/types.store';
// export interface GroupNodeData {
//   id: string;
//   type: NodeTypes;
//   description?: string;
//   requirements?: string;
//   name: string;
//   title?: string;
//   children?: string[];
//   isExpanded?: boolean;
//   iconName: string;
// }
export type GroupNodeProps = NodeProps<GroupNodeData>;

export type GroupNodeFormDataUI = Omit<GroupNodeData, 'id' | 'type' | 'title'| 'children' | 'isExpanded' | 'linkTo'>;

export type GroupNodeData = Partial<{
  id: string;
  type: NodeTypes;
  description?: string;
  requirements?: string;
  name: string;
  title?: string;
  children: string[];
  isExpanded?: boolean;
  iconName: string;
  linkTo?: string;
}>;


