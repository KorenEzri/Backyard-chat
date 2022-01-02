/**
*
* Asynchronously loads the component for SiteHeader
*
*/

import { lazyLoad } from 'utils/loadable';

export const SiteHeader = lazyLoad(() => import('./index'), module => module.SiteHeader);