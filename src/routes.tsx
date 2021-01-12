import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

// For import App, write './'.
import App from './App';
import {Layout} from './Layout';
import {SampleComponent} from './SampleComponent';

export const Path = {
  app: '/',
  sampleComponent: '/sample_component',
};

const routes = (
  <Layout>
    <Switch>
      <Route exact path={Path.app} component={App} />
      <Route exact path={Path.sampleComponent} component={SampleComponent} />
      <Redirect to={Path.app} />
    </Switch>
  </Layout>
);

export default routes;
