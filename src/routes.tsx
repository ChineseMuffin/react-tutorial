import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

// For import App, write './'.
import App from './App';
import {RoutingSample} from './RoutingSample';

export const Path = {
  app: '/',
  routingSample: '/routing_sample',
};

const routes = (
  <Switch>
    <Route exact path={Path.app} component={App} />
    <Route exact path={Path.routingSample} component={RoutingSample} />
    <Redirect to={Path.app} />
  </Switch>
);

export default routes;
