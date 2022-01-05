import { logger } from 'logger';
import { publicFetch } from 'network/publicFetch';
import { IUser, UserAndTokens } from 'types';
import { BASE } from './auth-consts';

export const register = async (
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  try {
    const { user, accessToken, refreshToken } =
      await publicFetch<UserAndTokens>(`${BASE}/register`, 'POST', payload);

    await setItem('accessToken', accessToken);
    await setItem('refreshToken', refreshToken);
    await setItem('currUser', user);

    return user;
  } catch (e) {
    logger.error(e);
    return null;
  }
};
