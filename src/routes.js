import Home from './Home';
import About from './About';
import Detail from './Detail';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/detail/:id',
    component: Detail,
  },
];

export default routes;
