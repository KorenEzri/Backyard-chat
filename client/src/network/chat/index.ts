import { getItem, setItem } from 'network/local-storage';
import securedFetch from 'network/privateFetch';

export const getAllMessages = async () => {
  const channelId = getItem('currentChannel');

  if (!channelId.length) return;

  const { messages } = await securedFetch('/chat/all-messages', 'POST', {
    channelId,
  });

  return messages;
};
