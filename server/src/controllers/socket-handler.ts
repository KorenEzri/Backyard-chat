import { Server } from "socket.io";
import { InitialSocket } from "../types";
import { verifyAccessToken } from "../auth/access-token";
import {
  createOrJoinChannel,
  disconnect,
  joinedChannel,
  leftAllChannels,
  leftChannel,
  onMessage,
  updateUser,
} from "./socket-controllers";

const socketHandler = (io: Server) => {
  io.use(async (socket: InitialSocket, next) => {
    const isAuthenticated = verifyAccessToken(socket.handshake.auth?.token);

    if (!isAuthenticated) {
      return next(new Error("not authorized"));
    }

    const userId = isAuthenticated.userId;

    if (isAuthenticated && userId) {
      socket["userId"] = userId;

      return next();
    }

    next(new Error("not authorized"));
  });

  io.on("connection", async (socket: InitialSocket) => {
    socket.emit("socketConnected", { user: socket.userId });

    socket.on("updateUser", async ({ payload }, onFinished) => {
      await updateUser(socket, payload, onFinished);
    });

    socket.on("disconnect", async () => {
      await disconnect(socket, io);
    });

    socket.on("createOrJoinChannel", async ({ payload }, onFinished) => {
      await createOrJoinChannel(socket, payload, onFinished);
    });

    socket.on("leftChannel", async ({ channelId }) => {
      await leftChannel(socket, channelId);
    });

    socket.on("leftAllChannels", async ({ payload }, onFinished) => {
      await leftAllChannels(socket, payload);
    });

    socket.on("joinedChannel", async ({ payload }) => {
      await joinedChannel(socket, payload);
    });

    socket.on("message", async ({ payload }, onFinished) => {
      await onMessage(io, payload, onFinished);
    });

    socket.on("disconnect", async () => {
      await disconnect(socket, io);
    });
  });
};

export default socketHandler;
