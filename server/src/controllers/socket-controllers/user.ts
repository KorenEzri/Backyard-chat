import { Server } from "socket.io";
import { InitialSocket, IUser } from "../../types";
import Logger from "../../logger/logger";
import User from "../../mongo/schemas/user";

export const updateUser = async (
  socket: InitialSocket,
  payload: Partial<IUser>,
  onFinished: any
) => {
  try {
    await User.findOneAndUpdate({ _id: socket.userId, payload });

    if (onFinished) {
      onFinished();
    }
  } catch ({ message }) {
    Logger.error(`${message}, at ${__filename}:20`);
  }
};

export const disconnect = async (socket: InitialSocket, io: Server) => {
  try {
    const lastConnected = new Date();

    await User.findOneAndUpdate(
      { _id: socket.userId },
      { isActive: false, lastConnected }
    );

    io.emit("socketDisconnected", {
      user: socket.userId,
      lastConnected,
    });
  } catch ({ message }) {
    Logger.error(`${message}, at ${__filename}:38`);
  }
};
