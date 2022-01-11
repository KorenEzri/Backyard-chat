import { socketController } from 'network';
import { getItem } from 'network/local-storage';
import { IMessage } from 'types';

export const sendMessage = async (message: string) => {
  const currentChannelId = getItem('currentChannel');

  if (!currentChannelId) {
    return;
  }

  const payload: Partial<IMessage> = {
    to: currentChannelId,
    from: socketController.socket.id,
    message,
    channelId: currentChannelId,
  };

  socketController.socket.emit('message', { payload });
};
