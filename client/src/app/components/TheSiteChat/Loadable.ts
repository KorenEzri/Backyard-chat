/**
*
* Asynchronously loads the component for TheSiteChat
*
*/

import { lazyLoad } from 'utils/loadable';

export const TheSiteChat = lazyLoad(() => import('./index'), module => module.TheSiteChat);