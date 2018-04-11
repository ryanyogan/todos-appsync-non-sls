import gql from 'graphql-tag';

export default gql`
  mutation($id: ID!) {
    deleteUser(input: { id: $id }) {
      id
    }
  }
`;
