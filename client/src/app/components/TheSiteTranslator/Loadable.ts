/**
*
* Asynchronously loads the component for TheSiteTranslator
*
*/

import { lazyLoad } from 'utils/loadable';

export const TheSiteTranslator = lazyLoad(() => import('./index'), module => module.TheSiteTranslator);