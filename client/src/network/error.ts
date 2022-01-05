import { BASE } from './auth/auth-consts';
import { publicFetch } from './publicFetch';

export const logErrorToService = async (error: Error, info: string) => {
  try {
    const prevUserString = await getItem('currUser');

    let prevUser;

    if (prevUserString) {
      prevUser = JSON.parse(prevUserString);
    }

    const payload = {
      platform: process.platform,
      error,
      info,
      user: prevUser ? prevUser._id : null,
    };

    const { created } = await publicFetch(`${BASE}/error`, 'POST', payload);

    return created;
  } catch {
    return false;
  }
};
