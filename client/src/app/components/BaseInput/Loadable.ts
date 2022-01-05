/**
*
* Asynchronously loads the component for BaseInput
*
*/

import { lazyLoad } from 'boilerplate-utils/loadable';

export const BaseInput = lazyLoad(() => import('./index'), module => module.BaseInput);