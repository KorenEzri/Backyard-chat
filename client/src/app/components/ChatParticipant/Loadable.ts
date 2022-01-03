/**
*
* Asynchronously loads the component for ChatParticipant
*
*/

import { lazyLoad } from 'utils/loadable';

export const ChatParticipant = lazyLoad(() => import('./index'), module => module.ChatParticipant);