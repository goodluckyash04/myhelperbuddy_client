// assets
import { IconSettings } from '@tabler/icons-react';
// constant
const icons = { IconSettings };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const preferences = {
  id: 'preferences',
  title: 'Preference',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'My Preference',
      type: 'item',
      url: '/preference',
      icon: icons.IconSettings,
      breadcrumbs: false
    }
  ]
};

export default preferences;
