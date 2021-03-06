import { logger } from 'logger';
import { multiRemove, setItem } from 'network/local-storage';
import securedFetch from 'network/privateFetch';
import { publicFetch } from 'network/publicFetch';
import { PassAndUsername, IUser, UserAndTokens, ISuccess } from 'types';
import { getRefreshOrThrow } from './';
import { BASE } from './auth-consts';

export const loginByPass = async (
  payload: PassAndUsername,
): Promise<IUser | null> => {
  try {
    const { user, accessToken, refreshToken } =
      await publicFetch<UserAndTokens>(`${BASE}/login`, 'POST', payload);

    setItem('accessToken', accessToken);
    setItem('refreshToken', refreshToken);
    setItem('currUser', user);

    return user;
  } catch (e) {
    logger.error(e);
    return null;
  }
};

export const loginWithToken = async (): Promise<IUser | null> => {
  try {
    const refreshToken = getRefreshOrThrow();

    const { accessToken, user } = await publicFetch<
      Pick<UserAndTokens, 'user' | 'accessToken'>
    >(`${BASE}/login-with-token`, 'POST', { refreshToken });

    setItem('accessToken', accessToken);

    return user;
  } catch ({ message }) {
    logger.error(message);
    return null;
  }
};

export const logout = async (): Promise<boolean> => {
  try {
    const { success } = await securedFetch<ISuccess>(`${BASE}/logout`, 'POST');

    if (success) {
      multiRemove(['accessToken', 'currProfile', 'refreshToken']);
    }

    return success;
  } catch (e) {
    logger.error(e);
    return false;
  }
};

export const checkUserName = async (username: string): Promise<boolean> => {
  try {
    const { ok } = await securedFetch<Record<'ok', boolean>>(
      `${BASE}/check-username`,
      'POST',
      { username },
    );
    return ok;
  } catch ({ message }) {
    logger.error(message);
    return false;
  }
};
