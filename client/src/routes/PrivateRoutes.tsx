import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage } from 'app/pages/HomePage/Loadable';
import { useLocalStorage } from 'hooks/use-local-storage';
import { socketController } from 'network';

export default function PrivateRoutes() {
  const [, setIsActive] = useLocalStorage('isActive', true);

  React.useEffect(() => {
    socketController.connect();

    window.addEventListener('onbeforeunload', () => {
      setIsActive(false);
      socketController.disconnect();
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
