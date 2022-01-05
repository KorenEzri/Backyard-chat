import { logger } from 'logger';
import { BASE } from 'network/auth/auth-consts';
import securedFetch from 'network/privateFetch';
import { Maybe, IFriendRequest } from 'types';

export const addFriend = async (
  friendUserId: string,
): Promise<Maybe<IFriendRequest>> => {
  try {
    return await securedFetch<IFriendRequest>(
      `${BASE}/new-friend-request`,
      'POST',
      {
        friendUserId,
      },
    );
  } catch (err) {
    logger.error(err);
    return null;
  }
};
