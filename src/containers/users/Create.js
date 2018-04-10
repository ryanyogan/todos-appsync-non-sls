import React from 'react';
import { graphql } from 'react-apollo';
import createUserMutation from '../../graphql/mutations/createUser';
import UsersQuery from '../../graphql/queries/users';
import Form from './Form';

const CreateUserPage = props => (
  <div>
    <h1>Add New User</h1>
    <p className="sub-heading">
      Please enter the details below to add a new user.
    </p>
    <Form submit={props.onSubmit} />
  </div>
);

export default graphql(createUserMutation, {
  props: props => ({
    onSubmit: user => {
      props
        .mutate({
          variables: user,
          optimisticResponse: () => ({
            createUser: {
              __typename: 'User',
              id: Math.random()
                .toString(36)
                .substring(7),
              lists: [],
              ...user,
            },
          }),
        })
        .then(() => props.ownProps.history.push('/'));
    },
  }),
  options: {
    refetchQueries: [{ query: UsersQuery }],
    update: (dataProxy, { data: { createUser } }) => {
      const query = UsersQuery;
      const data = dataProxy.readQuery({ query });
      data.listUsers.items.push(createUser);
      dataProxy.writeQuery({ query, data });
    },
  },
})(CreateUserPage);
