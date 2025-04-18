import { Grid} from '@mantine/core';
import { sideNavData } from '../side-nav/data';
import SideNavbar from '../side-nav/SideNavbar';
import Layout from './Layout';


interface LayoutProps {
  children?: React.ReactNode | React.ReactNode[] | null;
}

export default function LayoutWithSideBar({ children }: LayoutProps) {
  return (
    <Layout>
      <Grid
        style={{
          width: '100vw'
        }}
        gutter="xl"
      >
        <Grid.Col span="content" className="absolute z-1 md:relative md:z-auto">
          <SideNavbar data={sideNavData} />
        </Grid.Col>
        <Grid.Col span="auto">{children}</Grid.Col>
      </Grid>
    </Layout>
  );
}
