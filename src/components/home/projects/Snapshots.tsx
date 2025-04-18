import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useProjectOperations } from 'src/api/useProjectOperations/useProjectOperations';
import { ProjectSnapshot } from 'src/store/types';
import { useProjectStore } from 'src/store/useProjectStore';
import { Table, ScrollArea, Checkbox, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function Snapshots() {
  const { getProjectSnapshots } = useProjectOperations();
  const { activeProject } = useProjectStore();
  const [snapshots, setSnapshots] = useState<ProjectSnapshot[] | null>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  useEffect(() => {
    (async function () {
      if (activeProject.length === 0) return;
      const res = await getProjectSnapshots(activeProject[0].id);
      if (res.data) {
        notifications.show({
          title: 'Snapshots fetched successfully',
          message: res.data.message,
          color: 'green'
        });
        setSnapshots(res.data.snapshots);
      } else {
        notifications.show({
          title: 'Snapshots fetch failed',
          message: res.error as string,
          color: 'red'
        });
      }
    })();
  }, [activeProject]);

  const rows = snapshots?.map(snapshot => (
    <Table.Tr
      key={snapshot.id}
      style={{
        backgroundColor: selectedRows.includes(snapshot.id)
          ? 'var(--mantine-color-blue-light)'
          : undefined
      }}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(snapshot.id)}
          onChange={event =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, snapshot.id]
                : selectedRows.filter(id => id !== snapshot.id)
            )
          }
        />
      </Table.Td>
      <Table.Td>{snapshot.version}</Table.Td>
      <Table.Td>
        <Link to={`/project/${snapshot.projectId}`}>{snapshot.projectId}</Link>
      </Table.Td>
      <Table.Td>{snapshot.userId}</Table.Td>
      <Table.Td>{new Date(snapshot.createdAt).toLocaleString()}</Table.Td>
      <Table.Td>
        <Button variant="subtle">Load Snapshot</Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>Version</Table.Th>
            <Table.Th>Project ID</Table.Th>
            <Table.Th>User ID</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
