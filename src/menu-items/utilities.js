// assets

import {
  // IconCreditCard,
  IconList,
  IconWallet,
  IconListDetails,
  IconBuildingBank,
  IconFileInvoice,
  IconFileInfo,
  IconCashBanknote,
  IconCalendar
} from '@tabler/icons-react';

const date = new Date();
const currentMonth = date.toLocaleString('default', { month: 'short', year: '2-digit' });

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'transaction',
      title: 'TRANSACTION',
      type: 'collapse',
      icon: IconWallet,
      children: [
        {
          id: 'current_transaction',
          title: currentMonth?.toUpperCase(),
          type: 'item',
          url: '/utils/transactions?logs=current_month',
          icon: IconCalendar,
          breadcrumbs: true
        },
        {
          id: 'transaction',
          title: 'Transactions',
          type: 'item',
          url: '/utils/transactions',
          icon: IconFileInvoice,
          breadcrumbs: true
        },
        {
          id: 'deleted_transaction',
          title: 'Deleted Transaction',
          type: 'item',
          url: '/utils/transactions?logs=deleted',
          icon: IconFileInfo,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'task',
      title: 'TASK',
      type: 'collapse',
      icon: IconListDetails,

      children: [
        {
          id: 'task',
          title: 'My Task',
          type: 'item',
          url: '/utils/task',
          icon: IconList,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'finance',
      title: 'FINANCE',
      type: 'collapse',
      icon: IconCashBanknote,

      children: [
        {
          id: 'loan',
          title: 'Loan',
          type: 'item',
          url: '/utils/finance',
          icon: IconBuildingBank,
          breadcrumbs: true
        }
      ]
    }
  ]
};

export default utilities;
