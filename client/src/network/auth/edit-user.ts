import { logger } from 'logger';
import securedFetch from 'network/privateFetch';
import { IUser } from 'types';
import { BASE } from './auth-consts';

export const editUser = async (
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  try {
    const { user } = await securedFetch<Record<'user', IUser>>(
      `${BASE}/edit`,
      'PUT',
      payload,
    );

    return user;
  } catch (e) {
    logger.error(e);
    return null;
  }
};
