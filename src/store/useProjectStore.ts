import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ProjectStoreActions, ProjectStoreState } from './types';
import axiosMiddleware from 'src/api/axiosMiddleware';
import { Project } from 'reactflow';

export const useProjectStore = create<
  ProjectStoreState & ProjectStoreActions
>()(
  devtools(
    persist(
      immer((set, get) => {
        return {
          activeProject: [],
          projects: [],
          setActiveProject: projectId => {
         
            
            if (!projectId) return set(state => {
              return { activeProject: [] };
            });
            const activePro = get().projects.find(p => p.id == projectId);
              
            return set(state => {
              //state.activeProject.map(p => console.log('000000', p.id));
              const newActiveProject =(state.activeProject) ? state.activeProject.find(p => p.id == projectId)
                ? state.activeProject
                : [...state.activeProject, activePro] : [activePro];
                
               
                
              return { activeProject: newActiveProject };
            });
          },
          addProject: (newProject:Project) => {
            set(state => {
              const newActiveProject = [...state.activeProject, newProject];
              return { activeProject: newActiveProject };
            });
          },
          getStoreProjects: () => {
            return get().projects;
          },
          getProjects: () => {
            return get().activeProject;
          },
          setProjects: projects => {
            set({ projects });
          },
          refreshProjects: async () => {
            const { data } = await axiosMiddleware.get(`/projects`);
            const parsedData = JSON.parse(data as unknown as string);
            set({ projects: parsedData });
          },
          removeProject: project => {
            set(state => {
              const newProjects = state.projects.filter(
                p => p.id !== project.id
              );
              return { projects: newProjects };
            });
          }
        };
      }),
      {
        name: 'project-store',
        partialize: (state: ProjectStoreState) => {
          return {
            activeProject: state.activeProject,
            projects: state.projects
          };
        }
      }
    ),
    {
      name: 'project-store'
    }
  )
);
