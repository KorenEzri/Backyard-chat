import { lazyLoad } from 'boilerplate-utils/loadable';

export const Login = lazyLoad(
  () => import('./index'),
  module => module.Login,
);
