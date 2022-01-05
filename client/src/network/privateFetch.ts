import { apiHostWithVersion } from '../bin/index';
import { FetchOptions, Method } from '../types';
import { getItem } from '../utils';
import { getAccessTokenAndRetry } from './publicFetch';

export default async function securedFetch<T>(
  path: string,
  method: Method = 'GET',
  body?: Record<string, any>,
): Promise<T> {
  const accessToken = await getItem('accessToken');

  if (!accessToken) {
    throw new Error('No Session Active');
  }

  const fetchOptions: RequestInit & Pick<FetchOptions, 'cache'> = {
    method,
    mode: 'cors',
    cache: 'no-cache',
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  fetchOptions.headers = new Headers({
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json; charset=utf-8',
  });

  const response = await fetch(apiHostWithVersion + path, fetchOptions);

  const data = await response.json();

  switch (response.status) {
    case 200:
      return data;
    case 403:
      return await getAccessTokenAndRetry(path, method, body);
    default:
      throw data;
  }
}
