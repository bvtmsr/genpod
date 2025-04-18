import { Container, Grid } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NodeStatusBox from 'src/canvas/nodes/nodeservice/status/NodeStatusBox';
import { useFlowsStore } from 'src/canvas/store/flowstore';
import Protected from 'src/hoc/protected';

export default function Status() {
  const params = useParams() as unknown as { projectId: string };
  const flows = useFlowsStore(state => state.flows);
  const navigate = useNavigate();
  const nodes = flows![`flow${params.projectId}`]?.nodes;
  useEffect(() => {
    if ((flows && Object.keys(flows).length === 0) || !nodes) {
      notifications.show({
        title: 'Error',
        message:
          'Flow Needs to be hydrated please return to project and try again',
        color: 'red',
        autoClose: 3000
      });
      setTimeout(() => {
        navigate(`/project/${params.projectId}`);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Protected>
      <div>
        <Container size="xl">
          <h1>Status</h1>
          <Link
            to={`/project/${params.projectId}`}
            style={{ display: 'block', marginBottom: '20px' }}
          >
            Go back to project
          </Link>
          <Grid>
            {nodes?.map(node => (
              <Grid.Col span={4} key={node.id}>
                <NodeStatusBox node={node} />
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </div>
    </Protected>
  );
}