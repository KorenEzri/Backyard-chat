/**
*
* Asynchronously loads the component for ChatMessageList
*
*/

import { lazyLoad } from 'utils/loadable';

export const ChatMessageList = lazyLoad(() => import('./index'), module => module.ChatMessageList);