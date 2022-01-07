import { getItem, setItem } from 'network/local-storage';
import { publicFetch } from 'network/publicFetch';
import { Tokens } from 'types';
import { BASE } from './auth-consts';

export const getRefreshOrThrow = () => {
  const refreshToken = getItem('refreshToken');

  if (!refreshToken) {
    throw new Error('no refresh token found');
  }

  return refreshToken;
};

export const getAccessToken = async () => {
  try {
    const refreshToken = getRefreshOrThrow();

    const { accessToken } = await publicFetch<Pick<Tokens, 'accessToken'>>(
      `${BASE}/get-token`,
      'POST',
      {
        refreshToken,
      },
    );

    setItem('accessToken', accessToken);

    return accessToken;
  } catch {}
};
