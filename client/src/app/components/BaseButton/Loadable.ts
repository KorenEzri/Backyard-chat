/**
 *
 * Asynchronously loads the component for BaseButton
 *
 */

import { lazyLoad } from 'boilerplate-utils/loadable';

export const BaseButton = lazyLoad(
  () => import('./index'),
  module => module.BaseButton,
);
