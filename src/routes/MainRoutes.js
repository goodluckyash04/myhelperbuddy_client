import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const TransactionData = Loadable(lazy(() => import('views/transaction')));
const PreferenceComponent = Loadable(lazy(() => import('views/preference')));

const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'utils',
      children: [
        {
          path: 'transactions',
          element: <TransactionData />
        },
        {
          path: 'task',
          element: <UtilsColor />
        },
        {
          path: 'finance',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: '/preference',
      element: <PreferenceComponent />
    }
  ]
};

export default MainRoutes;
