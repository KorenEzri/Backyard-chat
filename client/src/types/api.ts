import { Maybe } from '.';
import { IUser } from './user';
import * as SocketIOClient from 'socket.io-client';

export interface FetchOptions {
  method: string;
  mode: string;
  cache: string;
  body?: string;
  headers?: Headers;
}

declare class Stringified<T> extends String {
  private ___stringified: T;
}

declare global {
  interface JSON {
    stringify<T>(
      value: T,
      replacer?: (key: string, value: any) => any,
      space?: string | number,
    ): string & Stringified<T>;
    parse<T>(text: Stringified<T>, reviver?: (key: any, value: any) => any): T;
    parse(text: string, reviver?: (key: any, value: any) => any): any;
  }
}

export interface IAdded {
  added: boolean;
}

export interface PassAndEmail {
  password: string;
  email: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export type UserAndTokens = { user: IUser } & Tokens;

export interface ISocketController {
  connect: () => void;
  disconnect: () => void;
  socket: SocketIOClient.Socket | null;
  isReady: boolean;
  subscribe: (event: string, cb: () => any) => void;
  emit: (event: string, data: any, cb: () => any) => void;
}

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ISuccess {
  success: boolean;
}
