import { NodeTypes } from '../store/types.store'
import { getInitialDBNodeFormData } from './db-node/DBNode.utils'
import { getInitialGroupNodeFormData } from './group-node/GroupNode.utils'
import { getInitialNodeFormData } from './nodeservice/Node.utils'

export const getInitialNodesFormData = (type: NodeTypes) => {
	if (type === NodeTypes.MICROSERVICE) {
		return getInitialNodeFormData()
	} else if (type === NodeTypes.DB_NODE) {
		return getInitialDBNodeFormData()
	} else if(type === NodeTypes.GROUP) {
		return getInitialGroupNodeFormData()
	}
}
