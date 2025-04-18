import { Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-hook-form-mantine';
import { useFlowsStore } from 'src/canvas/store/flowstore';
import { NodeTypes } from 'src/canvas/store/types.store';
import { NodeDrawerFormProps } from 'src/canvas/types';
import CodeEditor from 'src/components/common/code-editor';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Select, SelectProps, Text, Textarea } from '@mantine/core';

import {
  NodeData,
  NodeDataUI
} from '../Nodetypes.types';
import { schema } from './resolvers';
import icons from 'src/canvas/nodes/nodeservice/form/data';

export default function MicroServiceNodeDrawerForm(
  props: NodeDrawerFormProps<NodeData>
) {
  const { getNodeFormData, setNodeFormData } = useFlowsStore();
  const currentFormData = getNodeFormData(props.nodeId);
  
  const form = useForm<NodeDataUI>({
    defaultValues: structuredClone(currentFormData),
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    criteriaMode: 'all'
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedName = e.target.value.replace(/\s+/g, '_');
    form.setValue('name', updatedName, { shouldValidate: true });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {

    form.setValue('description', e.target.value, { shouldValidate: true });
  };

  const transformToNodeData = (
    data: NodeDataUI
  ): NodeData => {
    const formData: NodeData = {
      name: data.name,
      id: `form${props.nodeId}`,
      description: data.description,
      type: NodeTypes.MICROSERVICE,
      requirements: data.requirements,
      iconName: data.iconName
    };
    return formData;
  };
  const handleNodeDataChange = () => {
    const transformedData = transformToNodeData(form.getValues());
    setNodeFormData(transformedData, props.nodeId);
  };

  const handleOnGenerateButtonClick = () => {
    props.onGenerateButtonClick();
    handleNodeDataChange();
  };
  const handleSubmitCapture = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNodeDataChange();
    const transformedData = transformToNodeData(form.getValues());
    props.onSubmit(transformedData);
  };



  const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }) => (
    <Group>


      {option.value && <img src={`../nodeIcons/${option.value}.png`} width={20} height={20} style={{ marginRight: 10 }} />}

      <Text>{option.label}</Text>
      {checked && <Text style={{ color: 'orange' }}>✔</Text>}
    </Group>
  );

  return (
    <form onSubmit={handleSubmitCapture}>
      <TextInput
        control={form.control}
        label="Name"
        placeholder="Name"
        name="name"
        onChange={handleNameChange}
      />
      <Textarea
        rows={4}
        mt="md"
        value={form.watch('description')}
        label="Description"
        placeholder="Enter Description"
        maxLength={20}
        minLength={2}
        onChange={handleDescriptionChange}
      />
      <Controller
        name="iconName"
        control={form.control}
        render={({ field: { onChange, ...rest } }) => (
          <Select
            label="Icons"
            placeholder="Select Icon"
            data={icons}
            onChange={value => {
              
              form.setValue('iconName', value ?? '', { shouldValidate: true });

            }}
            renderOption={renderSelectOption}
            {...rest}
          />
        )}
      />

      <Text> Configuration File (Yaml)</Text>
      <Controller
        name="requirements"
        control={form.control}
        render={({ field }) => (
          <CodeEditor
            height="50vh"
            onChange={field.onChange}
            value={field.value ?? ''}
          />
        )}
      />
      <Button type="submit" mt="lg" mr="lg">
        Save
      </Button>
      <Button
        mt="lg"
        variant="gradient"
        onClick={handleOnGenerateButtonClick}
        disabled={form.watch('requirements')?.length === 0}
      >
        Generate
      </Button>
    </form>
  );
}
