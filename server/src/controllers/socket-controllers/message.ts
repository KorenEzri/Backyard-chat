import { InitialSocket } from "../../types";

export const onMessage = async (
  socket: InitialSocket,
  message: string,
  onFinished: any
) => {
  console.log("here, msg: ", message);
  socket.emit("news", { hello: "world" });
  if (onFinished) {
    onFinished();
  }
};
