/**
*
* Asynchronously loads the component for TheIcon
*
*/

import { lazyLoad } from 'utils/loadable';

export const TheIcon = lazyLoad(() => import('./index'), module => module.TheIcon);