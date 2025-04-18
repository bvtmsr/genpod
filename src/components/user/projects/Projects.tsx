import {
  ActionIcon,
  Center,
  ScrollArea,
  SimpleGrid,
  Table,
  Text,
  Tooltip
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconNavigation, IconTrash } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectOperations } from 'src/api/useProjectOperations/useProjectOperations';
import { useSyncActions } from 'src/hooks/useSyncActions';
import { InAppNotifications } from 'src/notifications';
import { Project } from 'src/store/types';
import { useProjectStore } from 'src/store/useProjectStore';

interface TabularProjectData {
  id: string;
  name: string;
}

const convertProjectDataToTabularData = (projects: Project[]) => {
  return projects.map(project => {
    const { id, name } = project;
    return {
      id,
      name
    };
  });
};

export default function Projects() {
  const { getProjects, deleteProject } = useProjectOperations();
  
  const { setProjects, projects } = useProjectStore();

  const { syncProjects } = useSyncActions();
  const navigate = useNavigate();

  const handleOnLoadProjectClick = (projectId: string) => {
    return navigate(`/project/${projectId}`);
  };

  const openDeleteProjectConfirmModal = (projectId: string) => {
    modals.openConfirmModal({
      title: 'Delete your profile',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this project (id: {projectId})? This
          is permanent and cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete Project', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await deleteProject(projectId);
        InAppNotifications.project.deletedSuccessfully(projectId);
        await syncProjects();
        return;
      }
    });
  };

  useEffect(() => {
    (async function () {
      const data = await getProjects();
      if (!data) {
        setProjects([]);
      }
    })();
  }, []);

  const TableRow = (project: TabularProjectData) => {
    const handleLoadProjectClick = () => {
      handleOnLoadProjectClick(project.id);
    };

    const handleDeleteProjectClick = () => {
      openDeleteProjectConfirmModal(project.id);
    };

    return (
      <Table.Tr key={project.id}>
        <Table.Td>{project.id}</Table.Td>
        <Table.Td>{project.name}</Table.Td>
        <Table.Td>
          <SimpleGrid cols={2}>
            <Tooltip label="Load">
              <ActionIcon p={2} onClick={handleLoadProjectClick}>
                <IconNavigation />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete Project">
              <ActionIcon p={2} onClick={handleDeleteProjectClick} bg="red.7">
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          </SimpleGrid>
        </Table.Td>
      </Table.Tr>
    );
  };
  const rows = convertProjectDataToTabularData(projects).map(
    (project, index) => <TableRow {...project} key={project.id || index} />
  );

  return (
    <ScrollArea h="100%">
      <Table
        highlightOnHover
        withTableBorder
        withColumnBorders
        horizontalSpacing={20}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Project Name</Table.Th>
            <Table.Th>Repository URL</Table.Th>
            <Table.Th>Repository Visibility</Table.Th>
            <Table.Th>Version</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        {rows.length ? (
          <Table.Tbody>{rows}</Table.Tbody>
        ) : (
          <Table.Tbody>
            <Table.Tr>
              <Table.Td colSpan={6}>
                <Center w="100%" h="100%">
                  <Text ml="sm">No Projects</Text>
                </Center>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        )}
      </Table>
    </ScrollArea>
  );
}
