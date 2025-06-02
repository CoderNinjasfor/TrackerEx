import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import Layout from './layouts/dashboard';
import DashboardPage from './pages';
import Transactions from './pages/Transactions';
import EmployeesCrudPage from './pages/employees';
import About from './pages/About';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '',
            Component: DashboardPage,
          },
          {
            path: 'employees/:employeeId?/*',
            Component: EmployeesCrudPage,
          },
           {
            path: 'about',
            Component: About,
          },
            {
            path: 'transactions',
            Component: Transactions, 
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
      </QueryClientProvider>
  </React.StrictMode>,
);