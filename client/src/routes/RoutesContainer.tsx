import * as React from 'react';
import { Loading } from 'app/pages/Loading/Loadable';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { selectUser, useUserSlice } from 'app/redux/slices';

export default function RoutesContainer() {
  const dispatch = useDispatch();

  const { loadingAuth, isSignedIn } = useSelector(selectUser);

  const {
    actions: { loginWithTokenAction },
  } = useUserSlice();

  React.useEffect(() => {
    dispatch(loginWithTokenAction());
  }, [dispatch]);

//   if (loadingAuth && !isSignedIn) {
//     return <Loading />;
//   }

  return <div>{isSignedIn ? <PrivateRoutes /> : <PublicRoutes />}</div>;
}
