import { getAccessToken } from './auth';
import * as SocketIOClient from 'socket.io-client';
import { ISocketController } from '../types';
import { autoBind } from 'autoBind';
import { apiHost } from './network-consts';
import { getItem } from './local-storage';

class SocketController implements ISocketController {
  isReady = false;
  socket = {} as SocketIOClient.Socket;

  constructor() {
    autoBind(this);
  }

  async initListeners() {
    if (this.isReady) {
      this.socket.on('connect_error', this.onConnectionError);
    }
  }

  subscribe<T>(event: string, cb: (arg0: T) => void) {
    if (!this.isReady) {
      setTimeout(() => this.subscribe(event, cb), 1000);
      return;
    }
    this.unsubscribe(event);
    this.socket.on(event, cb);
  }

  unsubscribe(event: string) {
    if (!this.isReady) return;
    if (Array.isArray(event)) event.forEach(e => this.socket.off(e));
    else this.socket.off(event);
  }

  emit(event: string, data = {}, cb: () => any) {
    if (!this.isReady) return;
    this.socket.emit(event, data, cb);
  }

  async connect(token?: string) {
    const accessToken = getItem('accessToken');

    this.socket = SocketIOClient.io(apiHost, {
      auth: {
        token: token ? token : accessToken,
      },
    });

    this.isReady = true;
    this.initListeners();
  }

  disconnect() {
    if (this.socket) {
      this.socket?.disconnect?.();
    }
    this.socket = {} as SocketIOClient.Socket;
    this.isReady = false;
  }

  async onConnectionError(err: Error): Promise<void> {
    if (err.message === 'not authorized') {
      const token = await getAccessToken();
      this.connect(token);
    } else {
      await new Promise(resolve =>
        setTimeout(async () => {
          await this.connect();
          resolve(null);
        }, 60 * 1000),
      );
    }
  }
}

export const socketController = new SocketController();
