import { NodeTypes } from 'src/canvas/store/types.store'

export interface ClientNodeFormData {
	name: string
	description: string
	type: NodeTypes.CLIENT_NODE
	age: number
	iconName: string
	linkTo: string
}

export type ClientNodeFormDataUI = Omit<ClientNodeFormData, 'type'>
