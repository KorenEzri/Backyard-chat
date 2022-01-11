import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage } from 'app/pages/HomePage/Loadable';
import { useLocalStorage } from 'hooks/use-local-storage';
import { socketController } from 'network';
import { updateUserIsActive } from 'network/sockets/update-user';
import { createOrJoinChannel } from 'network/sockets/channel';
import { setItem } from 'network/local-storage';

export default function PrivateRoutes() {
  const [, setIsActive] = useLocalStorage('isActive', true);

  window.addEventListener('beforeunload', () => {
    socketController.disconnect();
  });

  React.useEffect(() => {
    socketController.connect();

    socketController.subscribe('socketConnected', user => {
      const socketId = (user as any).user;
      socketController.socket.id = socketId;
      updateUserIsActive(true);
      setIsActive(true);
      createOrJoinChannel('global');
    });

    socketController.subscribe('setActiveChannel', channel => {
      setItem('currentChannel', (channel as any).channelId);
      socketController.unsubscribe('setActiveChannel');
    });

    return () => {
      if (!socketController.socket) {
        return;
      }

      socketController.disconnect();
    };
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
}
