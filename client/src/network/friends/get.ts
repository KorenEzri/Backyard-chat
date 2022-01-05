import { logger } from 'logger';
import { BASE } from 'network/auth/auth-consts';
import securedFetch from 'network/privateFetch';
import { IFriend } from 'types';

export const getFriendsList = async (
  friendsArr: string[],
): Promise<IFriend[]> => {
  if (!friendsArr || !Array.isArray(friendsArr) || !friendsArr.length)
    return [];
  try {
    const friends = await securedFetch<IFriend[]>(
      `${BASE}/search-from-arr`,
      'POST',
      {
        friendsArr,
      },
    );
    return friends;
  } catch (err) {
    logger.error(err);
    return [];
  }
};
