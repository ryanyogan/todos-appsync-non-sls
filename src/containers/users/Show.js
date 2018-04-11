import React from 'react';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import UserQuery from '../../graphql/queries/user';
import UsersQuery from '../../graphql/queries/users';
import DeleteUserMutation from '../../graphql/mutations/deleteUser';
import Loading from '../../components/common/Loading';
import List from '../../components/app/List';

const ShowUserPage = props => {
  if (!props.data.getUser) {
    return <Loading />;
  }

  const { getUser: user } = props.data;
  return (
    <div>
      <h1>{user.name}'s Todos</h1>
      <p className="sub-heading">
        These are all of the todos associated with this user.
      </p>
      <div style={{ marginTop: 20 }}>
        <Link
          to={`/users/${user.id}/edit`}
          className="button button--yelllow size--medium"
        >
          Update User Details
        </Link>
        <button
          className="button button--danger size--medium"
          style={{ marginLeft: 20 }}
          onClick={props.onDelete}
        >
          Delete this user
        </button>
      </div>

      {user.lists && (
        <div className="component--list">
          {user.lists.map(list => <List key={list.id} data={list} />)}
        </div>
      )}

      {!user.lists && (
        <div className="empty--data">
          No List(s) has been added by this User.
        </div>
      )}
    </div>
  );
};

export default compose(
  graphql(UserQuery, {
    options: props => ({ variables: { id: props.match.params.id } }),
  }),
  graphql(DeleteUserMutation, {
    props: props => ({
      onDelete: () => {
        props.mutate({
          variables: { id: props.ownProps.data.variables.id },
        });
        props.ownProps.history.push('/');
      },
    }),
    options: {
      refetchQueries: [{ query: UsersQuery }],
      update: (proxy, { data: { deleteUser: { id } } }) => {
        const query = UsersQuery;
        const data = proxy.readQuery({ query });
        data.listUsers.items = data.listUsers.items.filter(
          user => user.id !== id,
        );
        proxy.writeQuery({ query, data });
      },
    },
  }),
)(ShowUserPage);
