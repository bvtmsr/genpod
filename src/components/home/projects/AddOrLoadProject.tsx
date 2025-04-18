import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextInput } from 'react-hook-form-mantine';
import { useNavigate } from 'react-router-dom';
import { useProjectOperations } from 'src/api/useProjectOperations/useProjectOperations';
import { useSyncActions } from 'src/hooks/useSyncActions';
import { useProjectStore } from 'src/store/useProjectStore';
import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Divider, Flex, Text } from '@mantine/core';

import classes from './AddOrLoadProject.module.css';
import { AddNewProjectForm } from './AddOrLoadProject.types';
import { Project } from 'src/store/types';

const resolver = z.object({
  name: z.string().min(1, 'Project Name is required')
});

export default function AddOrLoadProject() {
  const { postProject } = useProjectOperations();

  const setActiveProject = useProjectStore(state => state.setActiveProject);

  const projects = useProjectStore(state => state.projects);

  const navigate = useNavigate();
  const addNewForm = useForm<AddNewProjectForm>({
    defaultValues: {
      name: ''
    },
    resolver: zodResolver(resolver),
    mode: 'onChange'
  });
  const { syncProjects } = useSyncActions();

  useEffect(() => {
    syncProjects();
  }, []);

  const handleOnSubmit = addNewForm.handleSubmit(async data => {
    const project: Project = {
      id: '',
      name: data.name,
      flow: {
        nodes: [],
        edges: []
      },
      parentId: ''
    };
    const { error } = await postProject(project);
    if (error) {
      return;
    }
    // if post request is successfully completed, sync the projects
    await syncProjects();
  });

  const handleOnLoadedProjectClick = (projectId: string) => {
    setActiveProject(projectId);
    // navigate to the project page
    navigate(`/project/${projectId}`);
  };
  return (
    <Box className={classes.container}>
      <Text size="xl" fw="bolder">
        Add Or Load Project
      </Text>
      <Flex className={classes.formContainer}>
        <Box w="50%" p="md" bg="dark" className={classes.form}>
          <form onSubmit={handleOnSubmit}>
            <Flex rowGap="md" direction="column">
              <TextInput
                withAsterisk
                control={addNewForm.control}
                name="name"
                placeholder="Project Name"
                label="Project Name"
              />
              <Button type="submit">Add Project</Button>
            </Flex>
          </form>
        </Box>
        <Box w="50%" p="md" bg="dark" className={classes.form}>
          <Text size="lg" fw="bold">
            Load Project
          </Text>
          <Text size="sm">Click on the project to load</Text>
          <Divider my="sm" />
          <Flex direction="row" wrap="wrap" gap="lg">
            {projects.length > 0 &&
              projects.map((project, index) => (
                <Box key={index}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOnLoadedProjectClick(project.id)}
                  >
                    {project.name}
                  </Button>
                </Box>
              ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
