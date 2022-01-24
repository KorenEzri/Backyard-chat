import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage } from 'app/pages/HomePage/Loadable';
import { socketController } from 'network';
import { updateUserIsActive } from 'network/sockets/update-user';
import { createOrJoinChannel } from 'network/sockets/channel';
import { useLocalStorage } from 'hooks/use-local-storage';
import { IUser } from 'types';

export default function PrivateRoutes() {
  const [user, setUser] = useLocalStorage('user', {} as IUser)

  React.useEffect(() => {
      socketController.connect();

    socketController.subscribe('socketConnected', (userId: string) => {
      socketController.socket.id =  userId;
      createOrJoinChannel('global');
      updateUserIsActive(true);
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
