import { Socket } from "socket.io";
import { Maybe } from ".";

interface SocketProperties {
  userId: string;
  firebaseToken: Maybe<string>;
}

export interface InitialSocket extends Partial<SocketProperties>, Socket {}
