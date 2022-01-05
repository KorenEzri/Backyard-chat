/**
 *
 * Asynchronously loads the component for TheUserControls
 *
 */

import { lazyLoad } from 'boilerplate-utils/loadable';

export const TheUserControls = lazyLoad(
  () => import('./index'),
  module => module.TheUserControls,
);
