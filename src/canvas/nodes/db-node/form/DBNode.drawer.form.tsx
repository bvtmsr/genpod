import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { NumberInput, TextInput, Textarea } from 'react-hook-form-mantine'
import { useFlowsStore } from 'src/canvas/store/flowstore'
import { NodeTypes } from 'src/canvas/store/types.store'
import { NodeDrawerFormProps } from 'src/canvas/types'
import { schema } from '../../nodeservice/form/resolvers'
import { DBNodeFormData, DBNodeFormDataUI } from '../DBNode.types'

export default function DBNodeDrawerForm({
	nodeId,
	onSubmit,
}: NodeDrawerFormProps<DBNodeFormData>) {
	const { getNodeFormData, setNodeFormData } = useFlowsStore()
	const currentFormData = getNodeFormData(nodeId)

	const form = useForm<DBNodeFormDataUI>({
		defaultValues: structuredClone(currentFormData),
		resolver: zodResolver(schema),
		reValidateMode: 'onSubmit',
	})

	const transformToNodeFormData = (data: DBNodeFormDataUI): DBNodeFormData => ({
		id: 'form' + nodeId,
		type: NodeTypes.DB_NODE,
		name: data.name,
		description: data.description,
		port: data.port,
	})

	return (
		<>
			<form
				onSubmitCapture={(e) => {
					e.preventDefault()
				}}
				onSubmit={form.handleSubmit((data) => {
					setNodeFormData(transformToNodeFormData(form.getValues()), nodeId)
					onSubmit(transformToNodeFormData(data))
				})}
			>
				<TextInput
					control={form.control}
					withAsterisk
					label='Name'
					placeholder='Name'
					name='name'
				/>
				<Textarea
					name='description'
					rows={4}
					label='Description'
					placeholder='Description'
					control={form.control}
				/>
				<NumberInput
					control={form.control}
					name='port'
					label='Port'
					placeholder='Port'
				/>
				<Button type='submit' mt='lg'>
					Submit
				</Button>
			</form>
		</>
	)
}
