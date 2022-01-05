/**
 *
 * Asynchronously loads the component for ChatParticipant
 *
 */

import { lazyLoad } from 'boilerplate-utils/loadable';

export const ChatParticipant = lazyLoad(
  () => import('./index'),
  module => module.ChatParticipant,
);
