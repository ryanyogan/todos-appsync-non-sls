import React from 'react';
import { graphql, compose } from 'react-apollo';

import UpdateUserMutation from '../../graphql/mutations/updateUser';
import UserQuery from '../../graphql/queries/user';
import UsersQuery from '../../graphql/queries/users';

import Form from './Form';
import Loading from '../../components/common/Loading';

const UpdateUserPage = props => {
  if (!props.user) {
    return <Loading message="Loading user details..." />;
  }

  const { id, name, email, phone, address } = props.user;

  return (
    <div>
      <h1>Update User: {name} </h1>
      <p className="sub-heading">
        Please make the changes below and click update user.
      </p>

      <Form
        user={{ id, name, email, phone, address }}
        submit={props.onSubmit}
      />
    </div>
  );
};

export default compose(
  graphql(UserQuery, {
    options: props => ({ variables: { id: props.match.params.id } }),
    props: props => ({
      user: props.data.getUser,
    }),
  }),
  graphql(UpdateUserMutation, {
    props: props => ({
      onSubmit: user =>
        props
          .mutate({
            variables: user,
            optimisticResponse: () => ({
              __typename: 'Mutation',
              updateUser: {
                __typename: 'User',
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                address: user.address || '',
                lists: user.items || [],
              },
            }),
          })
          .then(() => props.ownProps.history.push('/')),
    }),
    options: {
      refetchQueries: [{ query: UsersQuery }],
      update: (dataProxy, { data: { updateUser } }) => {
        const query = UsersQuery;
        const data = dataProxy.readQuery({ query });
        data.listUsers.items = data.listUsers.items.map(
          user =>
            user.id !== updateUser.id
              ? user
              : {
                  ...user,
                  ...updateUser,
                },
        );
        dataProxy.writeQuery({ query, data });
      },
    },
  }),
)(UpdateUserPage);
