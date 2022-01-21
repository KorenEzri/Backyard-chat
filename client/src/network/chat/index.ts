import { IMessage } from './../../../../server/src/types/message';
import securedFetch from 'network/privateFetch';
import { IUser } from 'types';

export const getAllMessages = async (
  channel: string,
): Promise<Partial<IMessage[]> | null> => {
  if (!channel?.length) return null;

  const { messages } = await securedFetch('/chat/all-messages', 'POST', {
    channel,
  });

  return messages;
};

export const getParticipants = async (
  channel: string,
): Promise<Partial<IUser[]> | null> => {
  if (!channel?.length) return null;

  const { participants } = await securedFetch('/chat/participants', 'POST', {
    channel,
  });

  return participants;
};
