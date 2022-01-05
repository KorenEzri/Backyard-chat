import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login } from 'app/pages/Login/Loadable';
import { Register } from 'app/pages/Register/Loadable';
import { NotFoundPage } from 'app/components/NotFoundPage/Loadable';

export default function PublicRoutes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
