/**
 *
 * Asynchronously loads the component for SiteHeader
 *
 */

import { lazyLoad } from 'boilerplate-utils/loadable';

export const SiteHeader = lazyLoad(
  () => import('./index'),
  module => module.SiteHeader,
);
