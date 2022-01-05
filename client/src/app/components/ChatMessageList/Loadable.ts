/**
 *
 * Asynchronously loads the component for ChatMessageList
 *
 */

import { lazyLoad } from 'boilerplate-utils/loadable';

export const ChatMessageList = lazyLoad(
  () => import('./index'),
  module => module.ChatMessageList,
);
