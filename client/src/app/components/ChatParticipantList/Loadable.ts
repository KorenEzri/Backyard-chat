/**
*
* Asynchronously loads the component for ChatParticipantList
*
*/

import { lazyLoad } from 'utils/loadable';

export const ChatParticipantList = lazyLoad(() => import('./index'), module => module.ChatParticipantList);