import { setItem } from './../local-storage';
import { socketController } from 'network';
import securedFetch from 'network/privateFetch';
import { IMessage } from 'types';

export const sendMessage = async (message: string, channelId: string) => {
  if (!channelId) {
    return;
  }

  if (channelId === 'global') {
    const { _id } = await securedFetch('/chat/channelId', 'POST', {
      channelName: channelId,
    });

    channelId = _id;
    setItem('activeChannel', channelId);
  }

  const payload: Partial<IMessage> = {
    to: channelId,
    from: socketController.socket.id,
    message,
    channelId: channelId,
  };

  socketController.socket.emit('message', { payload });
};
