import { socketController } from 'network';
import { getItem, setItem } from 'network/local-storage';
import { IUser } from 'types';

export const createOrJoinChannel = (channelName: string) => {
  const payload = {
    socketId: socketController.socket.id,
    channelName,
  };

  socketController.socket.emit('createOrJoinChannel', {
    payload,
  });

  const currentUser: IUser = getItem('currUser');

  currentUser.activeChannelNames = currentUser.activeChannelNames
    ? [...currentUser.activeChannelNames, channelName]
    : [channelName];

  setItem('currUser', currentUser);
};

export const leaveChannel = (channelName: string) => {
  const payload = {
    channelName,
    socketId: socketController.socket.id,
  };

  socketController.socket.emit('leftChannel', { payload });

  setItem('currentChannel', '');

  const currentUser: IUser = getItem('currUser');

  currentUser.activeChannelNames = currentUser.activeChannelNames
    ? currentUser.activeChannelNames.splice(
        currentUser.activeChannelNames.indexOf(channelName),
        1,
      )
    : [];

  setItem('currUser', currentUser);
};

export const leaveAllChannels = () => {
  const currentUser: IUser = getItem('currUser');

  currentUser.activeChannelNames = [];

  setItem('currUser', currentUser);

  const payload = {
    socketId: socketController.socket.id,
  };

  socketController.socket.emit('leftAllChannels', { payload });
};
