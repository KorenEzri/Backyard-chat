import * as React from 'react';
import { Loading } from 'app/pages/Loading/Loadable';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { loginWithToken } from 'network';

export default function RoutesContainer() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [loadingAuth, setLoadingAuth] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const res = await loginWithToken();
      if (res !== null) {
        setIsSignedIn(true);
      }
      setLoadingAuth(false)
    })();
  }, []);

  if (loadingAuth && !isSignedIn) {
    return <Loading />;
  }

  return <div>{isSignedIn ? <PrivateRoutes /> : <PublicRoutes />}</div>;
}
