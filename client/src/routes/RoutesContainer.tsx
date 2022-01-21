import * as React from 'react';
import { Loading } from 'app/pages/Loading/Loadable';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { loginWithToken } from 'network';
import { IUser } from 'types';
import { useLocalStorage } from 'hooks/use-local-storage';
import styled from 'styled-components';
import { SiteHeader } from 'app/components/SiteHeader/Loadable';

export default function RoutesContainer() { 
  const [backyard, setBackyard] = React.useState(true);
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = useLocalStorage('user', {} as IUser);

  React.useEffect(() => {
    (async () => {
      const res = await loginWithToken();
      if (res !== null) {
        setIsSignedIn(true);
        setUser(res);
      }
      setLoading(false);
    })();
  }, []);

  if (loading && !isSignedIn) {
    return <Loading />;
  }

  return (
    <RoutesContainerDiv backyard={backyard}>
      <SiteHeader backyard={backyard} setBackyard={setBackyard} />
      {isSignedIn && user._id ? <PrivateRoutes /> : <PublicRoutes />}
    </RoutesContainerDiv>
  );
}

const RoutesContainerDiv = styled.div<{ backyard: boolean }>`
  body,
  html, * {
    font-family: ${({ backyard }) =>
      !backyard ? 'backyardregular' : 'roboto'} ;
    /* transition:  */
  }

`;
