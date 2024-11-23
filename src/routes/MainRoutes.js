import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const Transaction = Loadable(lazy(() => import('views/transaction')));
const Finance = Loadable(lazy(() => import('views/finance')));
const FinancialDetails = Loadable(lazy(() => import('views/finance/FinancialData')));
const PreferenceComponent = Loadable(lazy(() => import('views/preference')));

const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

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
          element: <Transaction />
        },
        {
          path: 'finance',
          children: [
            {
              path: '',
              element: <Finance />
            },
            {
              path: 'details',
              element: <FinancialDetails />
            }
          ]
        },
        {
          path: 'task',
          element: <UtilsColor />
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
