import { IconArrowBackUp } from "@tabler/icons-react";
import { useProjectOperations } from "src/api/useProjectOperations/useProjectOperations";

import { useFlowsStore } from 'src/canvas/store/flowstore';

import { useNavigate } from 'react-router-dom';
import { useProjectStore } from "src/store/useProjectStore";
import { GroupNode } from "../store/types.store";




export default function BacktoCanvas() {

    const { getNodesAndEdges, setNodes, addFlow, setEdges } = useFlowsStore();

    const selectNode: GroupNode | undefined = getNodesAndEdges().nodes.find(node => node.selected);

    const { getProject } = useProjectOperations();

    const navigate = useNavigate();

    const setActiveProject = useProjectStore(state => state.setActiveProject);


    const switchCanvasCustomeHandler = (projectId: string) => {

        //  navigate to the project page
        navigate(`/project/${projectId}`);

        //  cath this code from Project  page
        addFlow('flow' + projectId);

        setActiveProject(projectId);
        (async function () {
            const { data } = await getProject(projectId);
            if (!data) return;
            const { edges, nodes } = data.flow;
            setNodes(nodes);
            setEdges(edges);
        })();
    }

    const handleOnNestedCanvas = async () => {
        if (selectNode?.data?.linkTo) {
            switchCanvasCustomeHandler(selectNode?.data?.linkTo)
        }

    }
    // hover:transition-all duration-300 ease
    //text-white transform-none hover:scale-[1.6] hover:text-orange-500 hover:transition-transform hover:duration-[0.2s] hover:ease-in-out
    //text-white transform-none hover:scale-[1.6] hover:text-orange-500 hover:transition-all hover:duration-[0.2s] hover:ease
    return (
        <>
            <IconArrowBackUp 
                onClick={handleOnNestedCanvas}
                style={{ transition: 'all 0.2s ease' }}
                onMouseEnter={({ target }) => {
                    
                    const element = target as HTMLElement; // Type assertion
                    element.style.cssText = 'transform: scale(1.6); color: var(--mantine-color-orange-5);';
                }}
                onMouseLeave={({ target }) => {
                    const element = target as HTMLElement; // Type assertion
                    element.style.cssText = 'color: #ffffff;';
                    element.style.transform = 'none';
                }}
            />
        </>
    )
}

