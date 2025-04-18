import { NodeTypes } from '../store/types.store';
import ClientNode from './client-node/ClientNode.node';
import DBNode from './db-node/DBNode.node';
import MicroserviceNode from './nodeservice/Node.node';
import GroupNode from './group-node/GroupNode.node';
export const nodeTypes = {
  [NodeTypes.MICROSERVICE]: MicroserviceNode,
  [NodeTypes.DB_NODE]: DBNode,
  [NodeTypes.CLIENT_NODE]: ClientNode,
  [NodeTypes.GROUP]: GroupNode
};
