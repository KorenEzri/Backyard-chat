/**
*
* Asynchronously loads the component for Loading
*
*/

import { lazyLoad } from 'boilerplate-utils/loadable';

export const Loading = lazyLoad(() => import('./index'), module => module.Loading);