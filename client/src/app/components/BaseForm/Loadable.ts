/**
*
* Asynchronously loads the component for BaseForm
*
*/

import { lazyLoad } from 'boilerplate-utils/loadable';

export const BaseForm = lazyLoad(() => import('./index'), module => module.BaseForm);