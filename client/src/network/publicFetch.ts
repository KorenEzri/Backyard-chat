import { apiHostWithVersion } from '../bin/index';
import { getAccessToken } from './auth';
import securedFetch from './privateFetch';
import { FetchOptions, Maybe, Method } from '../types';

export async function publicFetch<T>(
  path: string,
  method: Method = 'GET',
  body?: Maybe<Record<string, any>>,
): Promise<T> {
  const fetchOptions: RequestInit & Pick<FetchOptions, 'cache'> = {
    method,
    mode: 'cors',
    cache: 'no-cache',
  };

  if (body) fetchOptions.body = JSON.stringify(body);

  fetchOptions.headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
  });

  const response = await fetch(apiHostWithVersion + path, fetchOptions);

  const data = await response.json();

  if (response.status === 200) {
    return data;
  }
  throw data;
}

export const getAccessTokenAndRetry = async <T>(
  path: string,
  method: Method,
  body?: Record<string, any>,
): Promise<T> => {
  await getAccessToken();

  return await securedFetch(path, method, body);
};
