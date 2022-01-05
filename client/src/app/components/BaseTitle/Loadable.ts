/**
*
* Asynchronously loads the component for BaseTitle
*
*/

import { lazyLoad } from 'boilerplate-utils/loadable';

export const BaseTitle = lazyLoad(() => import('./index'), module => module.BaseTitle);