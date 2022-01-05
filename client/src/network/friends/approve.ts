import { logger } from 'logger';
import { BASE } from 'network/auth/auth-consts';
import securedFetch from 'network/privateFetch';
import {
  IApproveFriendRequestPayload,
  Maybe,
  IUser,
  IFriendRequest,
} from 'types';

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
