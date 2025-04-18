import { NodeTypes } from 'src/canvas/store/types.store';
import { GroupNodeData } from './GroupNode.types';

export const getInitialGroupNodeFormData = (): GroupNodeData => {
  return {
    id: '',
    name: '',
    description: '',
    requirements: '',
    type: NodeTypes.MICROSERVICE,
    children: [],
    iconName: ''
  };
};
