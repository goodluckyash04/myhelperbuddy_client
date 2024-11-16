import React from 'react';

import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';

const Categories = Loadable(lazy(() => import('views/preference/transaction/Categories.js')));

export default function ManagePreference() {
  return <Categories />;
}
