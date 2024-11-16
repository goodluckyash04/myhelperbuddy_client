import React from 'react';
import { useLocation } from 'react-router';

import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';

const TransactionData = Loadable(lazy(() => import('views/transaction/trasactionDetails')));
const DeletedTransaction = Loadable(lazy(() => import('views/transaction/deletedTransaction')));
// const CurrentMonth = Loadable(lazy(() => import('views/transaction/currentMonth')));

export default function ManageTransaction() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const logs = query.get('logs') || '';
  switch (logs) {
    case 'deleted':
      return <DeletedTransaction />;
    case 'current_month':
      return <TransactionData current_month={true} />;
    default:
      return <TransactionData />;
  }
}
