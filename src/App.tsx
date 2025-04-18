import '@mantine/code-highlight/styles.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import 'reactflow/dist/style.css';
import './App.css';
import './styles/tailwindcss.css';

import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';

import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import { InAppNotifications } from './notifications';
import PageNotFound from './pages/404';
import ComingSoon from './pages/coming-soon/ComingSoon';
import Genval from './pages/genval/Genval';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Project from './pages/project/Project';
import Layout from './pages/testing/Layout';
import { useFeatureFlagStore } from './store/useFeatureFlagStore';
import { runEnvVariablesCheck } from './utils/checkEnvVariables';
import { pingCheckServer } from './utils/pingCheckServer';
import { initSocket } from './utils/socket';
import Status from './pages/project/Status';

function App() {
  const { fetchAllFeatureFlags, areFeatureFlagsLoaded } = useFeatureFlagStore();
  useEffect(() => {
    runEnvVariablesCheck();
    fetchAllFeatureFlags();
    initSocket();
    (async function () {
      const res = await pingCheckServer();
      if (!res) {
        InAppNotifications.app.failedToConnectToServer();
      }
    })();
  }, []);

  if (!areFeatureFlagsLoaded) return null;
  return (
    <BrowserRouter>
      <Notifications />
      <ReactFlowProvider>
        <ModalsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/genval" element={<Genval />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/test" element={<Layout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/project/:projectId" element={<Project />} />
            <Route path="/project/:projectId/status" element={<Status />} />
            <Route path="/projects" index element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ModalsProvider>
      </ReactFlowProvider>
    </BrowserRouter>
  );
}

export default App;
