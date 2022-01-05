/**
 *
 * Asynchronously loads the component for TheSiteTranslator
 *
 */

import { lazyLoad } from 'boilerplate-utils/loadable';

export const TheSiteTranslator = lazyLoad(
  () => import('./index'),
  module => module.TheSiteTranslator,
);
