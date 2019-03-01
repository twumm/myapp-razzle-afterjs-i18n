import React from 'react';
import { asyncComponent } from '@jaredpalmer/after';

import Home from './Home';
import About from './About';
import Detail from './Detail';

export default [
  // normal route
  {
    path: '/',
    exact: true,
    component: Home,
  },
  // codesplit route
  {
    path: '/about',
    exact: true,
    component: asyncComponent({
      loader: () => import('./About'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
  {
    path: '/detail/:id',
    component: Detail,
  },
];
