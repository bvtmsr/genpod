import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProjectOperations } from 'src/api/useProjectOperations/useProjectOperations';
import Flow from 'src/canvas/Flow';
import { useFlowsStore } from 'src/canvas/store/flowstore';
import Layout from 'src/components/common/layout/Layout';
import { sideNavData } from 'src/components/common/side-nav/data';
import SideNavbar from 'src/components/common/side-nav/SideNavbar';
import TerminalComponent from 'src/components/common/terminal/Terminal';
import Snapshots from 'src/components/home/projects/Snapshots';
import HydrationZustand from 'src/hoc/hydrationZustand';
import Protected from 'src/hoc/protected';
import { useProjectStore } from 'src/store/useProjectStore';

import { Anchor, Breadcrumbs, Flex, Grid, rem, Tabs } from '@mantine/core';
import { IconHttpConnect, IconList, IconPhoto } from '@tabler/icons-react';


interface ProjectParams {
  projectId: string;
}

/**
 * Renders the Project component.
 */
export default function Project() {
  const params = useParams() as unknown as ProjectParams;
  const { getProject } = useProjectOperations();
  const { addFlow, setNodes, setEdges } = useFlowsStore();
  const setActiveProject = useProjectStore(state => state.setActiveProject);
  const projects = useProjectStore(state => state.projects);
  const getActiveProject = useProjectStore(state => state.activeProject);



  useEffect(() => {
    addFlow('flow' + params.projectId);
    setActiveProject(params.projectId);
    (async function () {
      const { data } = await getProject(params.projectId);
      if (!data) return;
      const { edges, nodes } = data.flow;
      setNodes(nodes);
      setEdges(edges);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectDetails = projects.find(
    project => project.id == params.projectId
  );
  
  
  const items = [
    { title: 'Home', href: '/' },
    {
      title: projectDetails?.name,
      href: `/project/${projectDetails?.id}`,
      active: false
    }
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  const iconStyle = { width: rem(12), height: rem(12) };
  return (
    <Protected>
      <Layout>
        <Grid
          style={{
            width: '100vw'
          }}
          gutter="sm"
        >
          <Grid.Col span="content">
            <SideNavbar data={sideNavData} />
          </Grid.Col>
          <Grid.Col span="auto">
            <Flex justify="space-between" p="lg" align="center">
              <Breadcrumbs separator=">">{items}</Breadcrumbs>
              {/* <Button onClick={handleGenerateClick}>Generate</Button> */}
            </Flex>
            <HydrationZustand>
              <Tabs variant="outline" defaultValue="flow" keepMounted={false}>
                <Tabs.List>
                  <Tabs.Tab
                    value="flow"
                    leftSection={<IconHttpConnect style={iconStyle} />}
                  >
                    Flow
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="terminal"
                    leftSection={<IconPhoto style={iconStyle} />}
                  >
                    Terminal
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="snapshots"
                    leftSection={<IconList style={iconStyle} />}
                  >
                    Snapshots
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel
                  value="terminal"
                  style={{
                    height: 'calc(98vh - 120px)'
                  }}
                >
                  <TerminalComponent />
                </Tabs.Panel>
                <Tabs.Panel
                  value="flow"
                  style={{
                    height: 'calc(100vh - 120px)'
                  }}
                >
                  {/* canvas */}
                  <Flow />
                  {/* Canvas */}
                </Tabs.Panel>
                <Tabs.Panel
                  value="snapshots"
                  style={{
                    height: 'calc(100vh - 120px)'
                  }}
                >
                  <Snapshots />
                </Tabs.Panel>
              </Tabs>
            </HydrationZustand>
          </Grid.Col>
        </Grid>
      </Layout>
    </Protected>
  );
}
