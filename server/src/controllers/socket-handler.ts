import { Server } from "socket.io";
import { InitialSocket } from "../types";
import { verifyAccessToken } from "../auth/access-token";
import {
  createOrJoinChannel,
  disconnect,
  onChannelJoin,
  onChannelLeave,
  onMessage,
  updateUser,
} from "./socket-controllers";
import Logger from "../logger/logger";

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
    Logger.http("new client connected");
    socket.emit("socketConnected", socket.userId);

    updateUser(socket, { isActive: true, lastConnected: new Date() });

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
      await onChannelLeave(socket, channelId);
    });

    socket.on("joinedChannel", async ({ payload }) => {
      await onChannelJoin(socket, payload);
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
