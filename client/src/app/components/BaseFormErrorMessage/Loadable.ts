/**
*
* Asynchronously loads the component for BaseFormErrorMessage
*
*/

import { lazyLoad } from 'boilerplate-utils/loadable';

export const BaseFormErrorMessage = lazyLoad(() => import('./index'), module => module.BaseFormErrorMessage);