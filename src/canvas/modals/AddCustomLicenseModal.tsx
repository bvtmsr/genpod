import { ActionIcon, Box, Button, Group, Space } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconLicense, IconPlus, IconTrash } from '@tabler/icons-react';
import { uniqueId } from 'lodash';
import { useFieldArray, useForm } from 'react-hook-form';
import { FileInput, Select, TextInput } from 'react-hook-form-mantine';
import { useFlowsStore } from '../store/flowstore';
import { License } from '../store/types.store';

interface LicenseFormInput {
  licenses: License[];
}

const AddCustomLicenseForm = () => {
  const { activeFlow, updateLicenses, getActiveFlow } = useFlowsStore();

  const { control, handleSubmit, watch } = useForm<LicenseFormInput>({
    defaultValues: {
      licenses: getActiveFlow()?.licenses || []
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'licenses'
  });

  const onSubmit = (data: LicenseFormInput) => {
    
    if (!activeFlow) return;
    updateLicenses(activeFlow, data.licenses);
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <Group key={field.id} align="end">
            {/* <Select
              allowDeselect={false}
              label="Type"
              control={control}
              name={`licenses.${index}.type`}
              data={[
                { value: 'link', label: 'Link' }
                // These will be supported in future but not now
                // { value: 'file', label: 'File' },
                // { value: 'path', label: 'Path' }
              ]}
              disabled={!!watch(`licenses.${index}.value`)}
            /> */}
            <Select
              label="Type"
              control={control}
              name={`licenses.${index}.type`}
              data={[
                { value: 'link', label: 'Link' }
                // These will be supported in future but not now
                // { value: 'file', label: 'File' },
                // { value: 'path', label: 'Path' }
              ]}
            />
            {watch(`licenses.${index}.type` as const) === 'file' ? (
              <FileInput
                clearable
                placeholder="Select file"
                aria-placeholder="Select file"
                control={control}
                label="Value"
                flex={1}
                name={`licenses.${index}.value`}
              />
            ) : (
              <TextInput
                flex={1}
                control={control}
                label="Value"
                name={`licenses.${index}.value`}
              />
            )}
            <TextInput
              flex={1}
              control={control}
              label="Tag"
              name={`licenses.${index}.tag`}
            />
            <ActionIcon color="red" onClick={() => remove(index)}>
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        ))}
        <Button
          mt="md"
          variant="outline"
          onClick={() =>
            append({ type: 'path', value: '', tag: '', id: uniqueId() })
          }
          leftSection={<IconPlus />}
        >
          Add License
        </Button>
        <Space h="md" />
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default function AddCustomLicenseModal() {
  const handleOnAddCustomLicenseClick = () => {
    modals.open({
      id: 'add-custom-license-modal',
      title: 'Add Custom License',
      children: <AddCustomLicenseForm />,
      size: '75%'
    });
  };

  return (
    <Button
      bg="teal.9"
      ml="sm"
      leftSection={<IconLicense />}
      onClick={handleOnAddCustomLicenseClick}
    >
      Add Custom License
    </Button>
  );
}
