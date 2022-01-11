/**
*
* Asynchronously loads the component for Message
*
*/

import { lazyLoad } from 'boilerplate-utils/loadable';

export const Message = lazyLoad(() => import('./index'), module => module.Message);