import { NodeTypes } from 'src/canvas/store/types.store';
import { NodeData } from './Nodetypes.types';

export const getInitialNodeFormData = (): NodeData => {
  return {
    id: '',
    name: '',
    description: '',
    requirements: '',
    type: NodeTypes.MICROSERVICE,
    iconName: '',
    linkTo:'',
  };
};
