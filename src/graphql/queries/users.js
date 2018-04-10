import gql from 'graphql-tag';

export default gql`
  query listUsers {
    listUsers {
      items {
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
  }
`;
