import { useCallback } from 'react';
import { useProjectOperations } from 'src/api/useProjectOperations/useProjectOperations';
import { useProjectStore } from 'src/store/useProjectStore';

export const useSyncActions = () => {
  const setProjects = useProjectStore(state => state.setProjects);

  const { getProjects } = useProjectOperations();

  const syncProjects = useCallback(async () => {
    const { data: projects, error: getProjectsError } = await getProjects();
    if (getProjectsError) {
      return;
    }
    if (projects && projects?.length > 0) {
      const parsedProjects = JSON.parse(projects as unknown as string);
      setProjects(parsedProjects);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    syncProjects
  };
};
