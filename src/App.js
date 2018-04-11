import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import config from './global/config';

import Layout from './components/layouts/Default';
import DashboardPage from './containers/Dashboard';

import ShowUserPage from './containers/users/Show';
import CreateUserPage from './containers/users/Create';
import UpdateUserPage from './containers/users/Update';

const client = new AWSAppSyncClient({
  url: config.graphqlEndpoint,
  region: config.region,
  auth: {
    type: config.authenticationType,
    apiKey: config.apiKey,
  },
  disableOffline: true,
});

const App = () => (
  <Router>
    <Layout>
      <Route exact path="/" component={DashboardPage} />
      <Switch>
        <Route path="/users/create" component={CreateUserPage} />
        <Route path="/users/:id/edit" component={UpdateUserPage} />
        <Route path="/users/:id" component={ShowUserPage} />
      </Switch>
    </Layout>
  </Router>
);

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

export default WithProvider;
