import Snackbar from 'react-native-snackbar';
import {
  IApproveFriendRequestPayload,
  IFriend,
  IFriendRequest,
  IUser,
  Maybe,
} from '../types';
import {logger} from '../utils';
import securedFetch from './privateFetch';
const BASE = '/friends';
import i18n from '../i18n';

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
    Snackbar.show({
      text: i18n.t('addFriendError'),
      duration: Snackbar.LENGTH_SHORT,
    });
    return null;
  }
};

export const approveFriendRequest = async ({
  friendUserId,
  friendRequestId,
}: IApproveFriendRequestPayload): Promise<Maybe<IUser>> => {
  try {
    return await securedFetch<IUser>(
      `${BASE}/approve-friend-request`,
      'PATCH',
      {
        friendUserId,
        friendRequestId,
      },
    );
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const declineFriend = async (
  friendRequestId: string,
): Promise<Maybe<IFriendRequest>> => {
  try {
    return await securedFetch<IFriendRequest>(
      `${BASE}/decline-friend-request`,
      'PATCH',
      {
        friendRequestId,
      },
    );
  } catch (err) {
    logger.error(err);
    return null;
  }
};
