import { logger } from 'logger';
import { setItem } from 'network/local-storage';
import { publicFetch } from 'network/publicFetch';
import { IUser, UserAndTokens } from 'types';
import { BASE } from './auth-consts';

export const register = async (
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  try {
    const { user, accessToken, refreshToken } =
      await publicFetch<UserAndTokens>(`${BASE}/register`, 'POST', payload);

    setItem('accessToken', accessToken);
    setItem('refreshToken', refreshToken);
    setItem('currUser', user);

    return user;
  } catch (e) {
    logger.error(e);
    return null;
  }
};
