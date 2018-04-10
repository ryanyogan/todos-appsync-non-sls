import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import UsersQuery from '../graphql/queries/users';
import User from '../components/app/User';
import Loading from '../components/common/Loading';

const DashboardPage = props => (
  <div>
    <h1>Hello Admin, Welcome</h1>
    <p className="sub-heading">
      These are all the users present in the application.
    </p>

    {props.data.listUsers.items &&
      props.data.listUsers.items.length > 0 && (
        <div className="component--users">
          {props.data.listUsers.items.map(user => (
            <User key={user.id} data={user} />
          ))}
        </div>
      )}

    {props.data.listUsers.items &&
      props.data.listUsers.items.length < 1 && (
        <div className="empty--data">No User(s) have been added yet...</div>
      )}

    {!props.data.listUsers.items && (
      <Loading style={{ marginTop: 50, marginBottom: 50 }} />
    )}

    <div style={{ marginTop: 30 }}>
      <Link to="/users/create" className="button size--large">
        Add New User
      </Link>
    </div>
  </div>
);

export default graphql(UsersQuery)(DashboardPage);
