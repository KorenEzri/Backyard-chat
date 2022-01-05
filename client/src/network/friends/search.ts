import { logger } from 'logger';
import { BASE } from 'network/auth/auth-consts';
import securedFetch from 'network/privateFetch';
import { IFriend } from 'types';

export const searchFriends = async (
  friendUserName: string,
): Promise<IFriend[]> => {
  try {
    const friends = await securedFetch<IFriend[]>(`${BASE}/search`, 'POST', {
      friendUserName, //TODO change to get request
    });
    return friends;
  } catch (err) {
    logger.error(err);
    return [];
  }
};
