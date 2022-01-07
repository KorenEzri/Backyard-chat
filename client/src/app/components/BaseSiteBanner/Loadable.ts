/**
*
* Asynchronously loads the component for BaseSiteBanner
*
*/

import { lazyLoad } from 'boilerplate-utils/loadable';

export const BaseSiteBanner = lazyLoad(() => import('./index'), module => module.BaseSiteBanner);