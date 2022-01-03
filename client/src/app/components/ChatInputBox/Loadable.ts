/**
*
* Asynchronously loads the component for ChatInputBox
*
*/

import { lazyLoad } from 'utils/loadable';

export const ChatInputBox = lazyLoad(() => import('./index'), module => module.ChatInputBox);