import { socketController } from 'network';
import { IUser } from 'types';

export const updateUserIsActive = (isActive: boolean) => {
  const payload: Partial<IUser> = {
    isActive,
    socketId: socketController.socket.id,
  };

  socketController.socket.emit('updateUser', {
    payload,
  });
};
