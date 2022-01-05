/**
 *
 * Asynchronously loads the component for ChatInputBox
 *
 */

import { lazyLoad } from 'boilerplate-utils/loadable';

export const ChatInputBox = lazyLoad(
  () => import('./index'),
  module => module.ChatInputBox,
);
