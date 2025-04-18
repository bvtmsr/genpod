import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { NumberInput, TextInput, Textarea } from 'react-hook-form-mantine';
import { NodeTypes } from 'src/canvas/store/types.store';
import { NodeDrawerFormProps } from 'src/canvas/types';
import { schema } from '../../nodeservice/form/resolvers';
import { ClientNodeFormData, ClientNodeFormDataUI } from '../ClientNode.types';
import { useFlowsStore } from 'src/canvas/store/flowstore';

export default function ClientNodeDrawerForm(
  props: NodeDrawerFormProps<ClientNodeFormData>
) {
  const { getNodeFormData, setNodeFormData } = useFlowsStore();
  const currentFormData = getNodeFormData(props.nodeId);

  const form = useForm<ClientNodeFormDataUI>({
    defaultValues: structuredClone(currentFormData),
    resolver: zodResolver(schema),
    reValidateMode: 'onBlur'
  });
  const transformToNodeFormData = (
    data: ClientNodeFormDataUI
  ): ClientNodeFormData => {
    const t: ClientNodeFormData = {
      name: data.name,
      description: data.description,
      age: data.age,
      type: NodeTypes.CLIENT_NODE,
      iconName:data.iconName
    };
    return t;
  };
  return (
    <form
      onSubmitCapture={e => {
        e.preventDefault();
      }}
      onSubmit={form.handleSubmit(() => {
        setNodeFormData(
          transformToNodeFormData(form.getValues()),
          props.nodeId
        );
        props.onSubmit(transformToNodeFormData(form.getValues()));
      }, console.error)}
    >
      <TextInput
        control={form.control}
        withAsterisk
        label="Name"
        placeholder="Name"
        name="name"
      />
      <Textarea
        name="description"
        rows={4}
        label="Description"
        placeholder="Description"
        control={form.control}
      />
      <NumberInput
        control={form.control}
        name="age"
        label="Enter the age"
        placeholder="Enter the age"
      />
      <Button type="submit" mt="lg">
        Submit
      </Button>
    </form>
  );
}
