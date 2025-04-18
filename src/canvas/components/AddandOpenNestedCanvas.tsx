import { IconArrowForwardUp } from "@tabler/icons-react";
import { useProjectOperations } from "src/api/useProjectOperations/useProjectOperations";
import { Project } from "src/store/types";

import { useFlowsStore } from 'src/canvas/store/flowstore';

import {  useNavigate, useParams } from 'react-router-dom';
import { useProjectStore } from "src/store/useProjectStore";
import { CustomNode, GroupNode, NodeTypes } from "../store/types.store";
import { getInitialNodesFormData } from "../nodes/utils";
import { getId } from "../utils";
import { useReactFlow } from "reactflow";



interface ProjectParams {
    projectId: string;
}


export default function AddandOpenNestedCanvas() {
    // const { syncProjects } = useSyncActions();

    const { screenToFlowPosition } = useReactFlow();

    const { getNodesAndEdges, setNodes, addFlow, setEdges } = useFlowsStore();
   

    const param = useParams() as unknown as ProjectParams;

        
        
    const selectNode: GroupNode | undefined = getNodesAndEdges().nodes.find(node => node.selected);
    
    const { postProject, getProject } = useProjectOperations();
   
    const navigate = useNavigate();
    const stateProjects = useProjectStore(state => state.projects);
    const setActiveProject = useProjectStore(state => state.setActiveProject);

    const setProjects = useProjectStore(state => state.setProjects);
   
    const switchCanvasCustomeHandler = (projectId: string) => {
        
        //  navigate to the project page
        navigate(`/project/${projectId}`);

        //  cath this code from Project  page
        addFlow('flow' + projectId);
         
        (async function () {
            const { data } = await getProject(projectId);
            if (!data) return;
            const { edges, nodes } = data.flow;
            setNodes(nodes);
            setEdges(edges);
            setActiveProject(projectId);
        })();
    }

    const handleOnNestedCanvas = async () => {
        // if (selectNode?.data?.linkTo) {
        //     switchCanvasCustomeHandler(selectNode?.data?.linkTo)
        //     return;
        // }
      
        const nodeType = 'group' as NodeTypes;
        const position = screenToFlowPosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
          });
        const nodeStyle =
        nodeType === 'group' ? { width: 700, height: 400, cursor: 'pointer' } : undefined;
        const newNode: CustomNode = {
            id: getId(),
            type: nodeType,
            data: { ...getInitialNodesFormData(nodeType), type: nodeType, name: `${selectNode?.data.name|| 'New_Node'}`, linkTo: param.projectId, iconName: `${selectNode?.data.iconName|| ''}` },
            position: position,
            style: nodeStyle
        };

        
        const projectData: Project = {
            id: '',
            name: `${selectNode?.data.name|| 'New_Canvas'}`,
            flow: {
                nodes: [newNode],
                edges: []
            },
            parentId: param.projectId || null
        }
        // post the project in db return project data with ID
        const {data} = await postProject(projectData);
        
        if(data){
           const {project} = JSON.parse(data);
           
        if (project) {

            const updatedNode = getNodesAndEdges().nodes.map(node => {
                
                if (node.selected) {

                    return {
                        ...node,
                        data: {
                            ...node.data,
                            linkTo: project.id
                        }
                        //linkTo: pData.project.id
                    }
                }
                return node;
            });
            
            setNodes(updatedNode);
           
            
            setProjects([...stateProjects, project]);
           
            
            switchCanvasCustomeHandler(project.id)
        } else {
            return;
        }
    }
    }
    return (
        <>
            <IconArrowForwardUp
                onClick={handleOnNestedCanvas}
                onMouseEnter={({ target }) => {
                    const element = target as HTMLElement; // Type assertion
                    element.style.cssText = 'transform: scale(1.6); color: var(--mantine-color-orange-5);';
                }}
                onMouseLeave={({ target }) => {
                    const element = target as HTMLElement; // Type assertion
                    element.style.cssText = 'color: #ffffff;';
                  
                }}
            />
        </>
    )
}

