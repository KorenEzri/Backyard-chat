/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'boilerplate-utils/loadable';

export const HomePage = lazyLoad(
  () => import('./index'),
  module => module.HomePage,
);
