import { Server } from "socket.io";
import { InitialSocket } from "../types";
import { verifyAccessToken } from "../auth/access-token";
import {
  disconnect,
  joinedChannel,
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
    io.emit("socketConnected", { user: socket.userId });

    socket.on("updateUser", async ({ payload }, onFinished) => {
      await updateUser(socket, payload, onFinished);
    });

    socket.on("disconnect", async () => {
      await disconnect(socket, io);
    });

    socket.on("leftChannel", async ({ channelId }) => {
      await leftChannel(socket, channelId);
    });

    socket.on("joinedChannel", async ({ channelId }) => {
      await joinedChannel(socket, channelId);
    });

    socket.on("message", async ({ message }, onFinished) => {
      await onMessage(socket, message, onFinished);
    });
  });
};

export default socketHandler;
