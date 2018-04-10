import gql from 'graphql-tag';

export default gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      __typename
      id
      name
      email
      phone
      address
      lists {
        id
        name
        description
        items {
          id
          name
          description
          date
          status
        }
      }
    }
  }
`;
