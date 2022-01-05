/**
*
* Asynchronously loads the component for SomePrivatePage
*
*/

import { lazyLoad } from 'boilerplate-utils/loadable';

export const SomePrivatePage = lazyLoad(() => import('./index'), module => module.SomePrivatePage);