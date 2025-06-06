import * as React from 'react';
import './index.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Toaster } from 'react-hot-toast';
import type { Navigation } from '@toolpad/core/AppProvider';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  
  {
    segment: 'transactions',
    title: 'Transactions',
    icon: <ReceiptLongIcon />,
  },
];

const BRANDING = {
  title: "",
  logo: 'Leo',
};

export default function App() {
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
      <Toaster position="top-right" />
    </ReactRouterAppProvider>
  );
}
